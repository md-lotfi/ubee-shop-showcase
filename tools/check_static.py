#!/usr/bin/env python3
"""Validate the UBee static publish tree with Python's standard library."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import xml.etree.ElementTree as ET
from build_legal_pages import page as render_legal_page, render_body


ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://ubee.raystate.com/"
PAGES = {
    "index.html": ("en", ORIGIN),
    "fr/index.html": ("fr", ORIGIN + "fr/"),
    "ar/index.html": ("ar", ORIGIN + "ar/"),
}
for language in ("en", "fr", "ar"):
    for document in ("privacy-policy", "terms-of-use", "subscription-terms"):
        route = f"legal/{language}/{document}/index.html"
        PAGES[route] = (language, f"{ORIGIN}legal/{language}/{document}/")
ALTERNATE_LANGUAGES = {"en", "fr", "ar", "x-default"}


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.links = []
        self.canonical = []
        self.alternates = {}
        self.language = None
        self.direction = None
        self.h1_count = 0
        self.title_count = 0
        self.has_main = False
        self.has_nav = False
        self.has_footer = False
        self.errors = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "html":
            self.language = values.get("lang")
            self.direction = values.get("dir")
        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self.title_count += 1
        if tag == "main":
            self.has_main = True
        if tag == "nav":
            self.has_nav = True
        if tag == "footer":
            self.has_footer = True
        if "id" in values:
            if values["id"] in self.ids:
                self.errors.append("duplicate id " + values["id"])
            self.ids.add(values["id"])
        if tag == "img" and "alt" not in values:
            self.errors.append("image missing alt text")
        if tag == "link" and values.get("rel") == "canonical":
            self.canonical.append(values.get("href"))
        if tag == "link" and values.get("rel") == "alternate":
            self.alternates[values.get("hreflang")] = values.get("href")
        if tag == "link" and values.get("rel") == "stylesheet":
            self.links.append(values.get("href"))
        for attribute in ("href", "src"):
            if attribute in values and values[attribute]:
                self.links.append(values[attribute])


def internal_target(page_path, raw):
    url = urlsplit(raw)
    if url.scheme or url.netloc:
        return None, url
    if url.path.startswith("/"):
        return None, url
    path = (page_path.parent / unquote(url.path)).resolve() if url.path else page_path.resolve()
    if path.is_dir():
        path /= "index.html"
    return path, url


def check_page(relative, expected_language, expected_canonical, errors):
    path = ROOT / relative
    if not path.is_file():
        errors.append("missing page: " + relative)
        return None
    text = path.read_text(encoding="utf-8")
    if relative.startswith("legal/"):
        _, language, document, _ = Path(relative).parts
        source = ROOT / "legal-source" / language / f"{document}.md"
        if not source.is_file():
            errors.append(relative + ": missing legal Markdown source")
        else:
            title, body = render_body(source.read_text(encoding="utf-8"))
            if text != render_legal_page(language, document, title, body):
                errors.append(relative + ": stale HTML; run tools/build_legal_pages.py")
    page = Page()
    page.feed(text)
    page.close()
    errors.extend(relative + ": " + message for message in page.errors)

    expected_direction = "rtl" if expected_language == "ar" else "ltr"
    if (page.language, page.direction) != (expected_language, expected_direction):
        errors.append(relative + ": incorrect initial language or direction")
    if page.h1_count != 1 or page.title_count != 1:
        errors.append(relative + ": expected exactly one title and one h1")
    if not (page.has_main and page.has_nav and page.has_footer):
        errors.append(relative + ": missing a main, nav, or footer landmark")
    if page.canonical != [expected_canonical]:
        errors.append(relative + ": incorrect canonical URL")
    if set(page.alternates) != ALTERNATE_LANGUAGES:
        errors.append(relative + ": incomplete hreflang alternates")
    if any(marker in text for marker in ("__l5e", ".asset.json", "/src/")):
        errors.append(relative + ": contains a development-only asset pointer")

    required_links = () if relative.startswith("legal/") else (
        "https://play.google.com/store/apps/details?id=com.raystate.ubee&hl=en",
        "mailto:contact@raystate.com",
        "tel:+213551056686",
        "https://raystate.com",
    )
    for required in required_links:
        if required not in page.links:
            errors.append(relative + ": missing required contact or download link: " + required)

    for raw in page.links:
        target, url = internal_target(path, raw)
        if url.scheme or url.netloc:
            if raw.startswith("https://fonts.googleapis.com") or raw.startswith("https://fonts.gstatic.com"):
                errors.append(relative + ": external font request remains")
            continue
        if url.path.startswith("/"):
            errors.append(relative + ": root-relative URL breaks repository-prefix hosting: " + raw)
            continue
        if target is not None and (not target.is_file() or not target.is_relative_to(ROOT)):
            errors.append(relative + ": missing or unsafe local link: " + raw)
        if url.fragment and target is not None and target.suffix.lower() == ".html" and target.is_file():
            destination = Page()
            destination.feed(target.read_text(encoding="utf-8"))
            if unquote(url.fragment) not in destination.ids:
                errors.append(relative + ": missing fragment target: " + raw)
    return page


def main():
    errors = []
    pages = {}
    for relative, (language, canonical) in PAGES.items():
        page = check_page(relative, language, canonical, errors)
        if page:
            pages[relative] = page

    if (ROOT / "CNAME").read_text(encoding="utf-8").strip() != "ubee.raystate.com":
        errors.append("CNAME does not match ubee.raystate.com")
    if not (ROOT / ".nojekyll").is_file():
        errors.append("missing .nojekyll")
    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    if "Sitemap: " + ORIGIN + "sitemap.xml" not in robots:
        errors.append("robots.txt is missing the public sitemap URL")

    sitemap = ET.parse(ROOT / "sitemap.xml")
    namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
    locations = [node.text for node in sitemap.findall(".//" + namespace + "loc")]
    expected_locations = {canonical for _, canonical in PAGES.values()}
    if set(locations) != expected_locations or len(locations) != len(expected_locations):
        errors.append("sitemap locations do not match all showcase and legal pages")

    css_path = ROOT / "assets/styles.css"
    css = css_path.read_text(encoding="utf-8")
    for raw in re.findall(r"url\([\"']?([^\)\"']+)", css):
        target = (css_path.parent / unquote(urlsplit(raw).path)).resolve()
        if not target.is_file() or not target.is_relative_to(ROOT):
            errors.append("missing local CSS asset: " + raw)
    if any(host in css for host in ("fonts.googleapis.com", "fonts.gstatic.com")):
        errors.append("stylesheet contains external Google Fonts requests")

    for name in (
        "package.json", "bun.lock", "bunfig.toml", "vite.config.ts",
        "vitest.config.ts", "tsconfig.json", "src", "public",
    ):
        if (ROOT / name).exists():
            errors.append("framework/build artifact remains: " + name)

    if errors:
        raise SystemExit("\n".join(errors))
    print("PASS: localized HTML, metadata, internal links, assets, sitemap, custom domain, and static-only structure.")


if __name__ == "__main__":
    main()
