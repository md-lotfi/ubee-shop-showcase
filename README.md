# UBee Showcase

The public UBee product showcase is a static website for GitHub Pages. It uses plain HTML, CSS, and JavaScript; it has no package manager, build step, server, analytics, or runtime API.

The public site is **https://ubee.raystate.com/**. English is at /, French at /fr/, and Arabic at /ar/. Each page contains its own localized content and metadata, so it remains readable and indexable without JavaScript.

## Preview and checks

Run from the repository root. Start the preview server in one terminal:

~~~sh
python3 -m http.server 8080
~~~

Then run checks in another terminal:

~~~sh
python3 tools/check_static.py
node --check assets/script.js
~~~

Open http://localhost:8080/. To check GitHub Pages project-path behavior, serve or copy the tree under /ubee-shop-showcase/; internal links and assets use relative paths.

## Structure

- index.html, fr/index.html, and ar/index.html contain the complete localized pages.
- assets/styles.css and assets/script.js provide shared presentation and small progressive enhancements.
- assets/ contains local product artwork, Play Store screenshots, favicon, self-hosted fonts, and their Open Font Licenses.
- Contact and download links are present in the localized HTML, so they work without JavaScript. Canonicals and alternate-language metadata are also written into the HTML for crawlers.
- CNAME, robots.txt, sitemap.xml, .nojekyll, and 404.html support static hosting.
- tools/check_static.py validates the publish tree using only the Python standard library.

Keep the visual system aligned across all three pages. Update translations, headings, feature descriptions, screenshots, and metadata together. Avoid root-relative local paths so the pages continue to work under a repository prefix. Do not add private keys, secrets, analytics, invented customer claims, or unverified product promises.

## Publish with GitHub Pages

Push normally to the existing main branch; do not rewrite published history. In the repository’s Pages settings, publish from main and the repository root, then configure the custom domain ubee.raystate.com. The checked-in CNAME records that hostname. Configure DNS and HTTPS with the hosting account owner. Verify the live English, French, and Arabic pages, download/contact links, and sitemap after GitHub Pages finishes publishing.
