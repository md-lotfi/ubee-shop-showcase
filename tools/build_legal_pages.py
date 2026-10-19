#!/usr/bin/env python3
"""Render the hand-reviewed legal Markdown sources as framework-free pages."""

from html import escape
from pathlib import Path
import argparse
import re


ROOT = Path(__file__).resolve().parents[1]
LANGUAGES = {
    "en": {"name": "English", "home": "Back to UBee", "updated": "Last updated: 19 October 2026", "nav": ["Privacy Policy", "Terms of Use", "Subscription Terms"]},
    "fr": {"name": "Français", "home": "Retour à UBee", "updated": "Dernière mise à jour : 19 octobre 2026", "nav": ["Confidentialité", "Conditions d’utilisation", "Abonnement Premium"]},
    "ar": {"name": "العربية", "home": "العودة إلى UBee", "updated": "آخر تحديث: 19 أكتوبر 2026", "nav": ["سياسة الخصوصية", "شروط الاستخدام", "اشتراك Premium"]},
}
DOCUMENTS = ["privacy-policy", "terms-of-use", "subscription-terms"]


def inline(markdown):
    escaped = escape(markdown)
    escaped = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', escaped)
    return re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", escaped)


def render_body(source):
    lines = source.splitlines()
    title = lines[0].removeprefix("# ").strip()
    body = []
    paragraph = []
    list_items = []

    def flush_paragraph():
        if paragraph:
            body.append("<p>" + inline(" ".join(paragraph)) + "</p>")
            paragraph.clear()

    def flush_list():
        if list_items:
            body.append("<ul>" + "".join("<li>" + inline(item) + "</li>" for item in list_items) + "</ul>")
            list_items.clear()

    for line in lines[1:]:
        if line.startswith("## "):
            flush_paragraph()
            flush_list()
            body.append("<h2>" + escape(line[3:].strip()) + "</h2>")
        elif line.startswith("- "):
            flush_paragraph()
            list_items.append(line[2:].strip())
        elif not line.strip():
            flush_paragraph()
            flush_list()
        else:
            paragraph.append(line.strip())
            if line.endswith("  "):
                flush_paragraph()
    flush_paragraph()
    flush_list()
    return title, "\n".join(body)


def page(language, document, title, body):
    config = LANGUAGES[language]
    home = "../../../" + (f"{language}/" if language != "en" else "")
    canonical = f"https://ubee.raystate.com/legal/{language}/{document}/"
    alternates = "\n".join(
        f'  <link rel="alternate" hreflang="{code}" href="https://ubee.raystate.com/legal/{code}/{document}/">'
        for code in LANGUAGES
    )
    alternates += f'\n  <link rel="alternate" hreflang="x-default" href="https://ubee.raystate.com/legal/en/{document}/">'
    links = "\n".join(
        f'<a href="../{slug}/"' + (' aria-current="page"' if slug == document else '') + f'>{label}</a>'
        for slug, label in zip(DOCUMENTS, config["nav"])
    )
    direction = "rtl" if language == "ar" else "ltr"
    return f'''<!doctype html>
<html lang="{language}" dir="{direction}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f7f8f5">
  <meta name="description" content="{escape(title)} — UBee by Raystate.">
  <title>{escape(title)} | UBee by Raystate</title>
  <link rel="canonical" href="{canonical}">
{alternates}
  <link rel="stylesheet" href="../../../assets/styles.css">
  <link rel="icon" href="../../../assets/ubee-app-icon.png" type="image/png">
</head>
<body>
  <main class="legal-page">
    <div class="legal-wrap">
      <a class="legal-eyebrow" href="{home}">UBee · Raystate</a>
      <h1>{escape(title)}</h1>
      <p class="legal-updated">{config['updated']}</p>
      <nav class="legal-nav" aria-label="{escape(title)}">{links}</nav>
      <article class="legal-content">{body}</article>
      <p class="legal-locale"><a href="../../en/{document}/" hreflang="en" lang="en">EN</a> · <a href="../../fr/{document}/" hreflang="fr" lang="fr">FR</a> · <a href="../../ar/{document}/" hreflang="ar" lang="ar">AR</a></p>
      <p><a href="{home}">{config['home']}</a></p>
      <footer class="legal-updated">© 2026 Raystate</footer>
    </div>
  </main>
</body>
</html>
'''


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Fail if generated HTML differs from its source")
    args = parser.parse_args()
    stale = []
    for language, config in LANGUAGES.items():
        for document, label in zip(DOCUMENTS, config["nav"]):
            source = ROOT / "legal-source" / language / f"{document}.md"
            title, body = render_body(source.read_text(encoding="utf-8"))
            target = ROOT / "legal" / language / document / "index.html"
            rendered = page(language, document, title, body)
            if args.check:
                if not target.is_file() or target.read_text(encoding="utf-8") != rendered:
                    stale.append(str(target.relative_to(ROOT)))
            else:
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(rendered, encoding="utf-8")
                print(f"Generated {target.relative_to(ROOT)}")
    if stale:
        raise SystemExit("Regenerate stale legal pages: " + ", ".join(stale))
    if args.check:
        print("PASS: all nine legal pages match their Markdown sources.")


if __name__ == "__main__":
    main()
