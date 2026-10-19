<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Repository Guidelines

## Project Structure

UBee Showcase is a static, multilingual product website hosted from the repository root. `index.html`, `fr/index.html`, and `ar/index.html` contain the English, French, and Arabic pages. Shared styles and progressive enhancements live in `assets/styles.css` and `assets/script.js`; product screenshots, logo artwork, and self-hosted fonts are in `assets/`. `CNAME`, `robots.txt`, `sitemap.xml`, `.nojekyll`, and `404.html` support GitHub Pages and the `ubee.raystate.com` domain.

## Preview and Validation

There is no package manager, compilation step, or server-side runtime. From the repository root, run `python3 -m http.server 8080` and open `http://localhost:8080/` to preview. Before publishing, run:

```sh
python3 tools/check_static.py
node --check assets/script.js
```

The static checker verifies localized pages, metadata, internal links, assets, sitemap, custom domain, and removal of the former framework build tree.

## Content, Style, and Accessibility

Keep all three locales aligned when changing copy, navigation, features, or screenshots. Use semantic HTML, descriptive image alternatives, one clear page heading, keyboard-visible focus, and responsive layouts. Preserve Arabic `lang="ar"` and `dir="rtl"`; keep phone numbers, email addresses, and product names legible in left-to-right spans where appropriate. Use relative local URLs so pages also work under a GitHub Pages repository prefix. Store public settings in `assets/site-config.js`; never add credentials or private customer information.

## Pull Requests and Publishing

Use concise imperative commit subjects, such as `Improve Arabic feature layout`. Pull requests should describe visible behavior changes, link related issues, report the validation commands run, and include screenshots for visual changes. Publish from `main` and the repository root in GitHub Pages settings; configure DNS and HTTPS for `ubee.raystate.com` with the domain owner. Do not rewrite published Git history.
