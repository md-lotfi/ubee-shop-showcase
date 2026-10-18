# UBee Shop Showcase

Act as a senior product designer and frontend engineer. Build a polished, production-ready marketing website for UBee, Raystate’s offline-first POS and inventory app for independent shops and small businesses. This is a public product showcase website, not a recreation of the mobile app UI.

GOALS
- Explain UBee quickly and clearly, show genuine product visuals, and guide visitors to install the Android app or contact Raystate.
- Design for trust, clarity, accessibility, and conversion. Keep the experience fast, responsive, and easy to scan.

BRAND AND VISUAL DIRECTION
- Use the supplied UBee logo, app icon, banner, feature graphic, and official Google Play screenshots. Do not redraw or distort the bee mascot or app artwork.
- Build a refined visual system from UBee’s charcoal, warm amber/gold, cream, and restrained blue accents. Use generous whitespace, clear type hierarchy, subtle rounded cards, and restrained motion. Avoid a generic SaaS template, excessive gradients, dense honeycomb decoration, or an interface that looks like a dashboard.
- Show app screenshots in a clean gallery or device frames with useful captions. Preserve screenshot aspect ratios, keep UI text legible, and never invent UI or alter product screenshots.

PAGE CONTENT
1. Header: UBee logo, concise section navigation, language selector, and a prominent “Download on Google Play” CTA.
2. Hero: a clear headline for shop owners, one short supporting paragraph about managing sales and stock offline, primary Google Play CTA, secondary feature-jump CTA, and supplied product artwork.
3. Benefits: concise sections for quick checkout, inventory and low-stock visibility, customers and balances, invoices/receipts, and business reports. Mention barcode scanning and offline-first use only as supported product capabilities. Keep wording factual; do not promise tax compliance, payment processing, cloud backup, or absolute privacy guarantees.
4. Product gallery: use the supplied official listing screenshots to show the dashboard, navigation, and customer workflows. Add meaningful alt text; do not expose any new data or fabricate testimonials, ratings, usage counts, or performance metrics.
5. Download and contact section: repeat the Google Play CTA and give visitors a clear way to reach Raystate.
6. Footer: company details, app download link, contact links, and a link to the company website.

LOCALIZATION AND ACCESSIBILITY
- Provide complete English, French, and Arabic versions with a visible language selector. Do not mix languages within a selected locale.
- Arabic must use correct right-to-left layout, direction-aware spacing/icons, readable typography, and a layout that remains usable on narrow screens. English and French remain left-to-right.
- Meet WCAG 2.2 AA contrast targets; use semantic landmarks, descriptive link names and image alt text, visible keyboard focus, keyboard-operable navigation, reduced-motion support, and touch-friendly controls.
- Make layouts work from 320px mobile width through desktop. Avoid horizontal overflow; make navigation usable by keyboard and touch.

COMPANY AND LINKS
- Company: Raystate
- Email: contact@raystate.com (use mailto:contact@raystate.com)
- Phone: +213551056686 (use tel:+213551056686)
- Website: https://raystate.com
- Google Play download: https://play.google.com/store/apps/details?id=com.raystate.ubee&hl=en
- Point every download CTA to the exact Google Play URL above. Keep the website and email links functional. Do not add a contact form unless it can submit reliably without inventing a backend.

IMPLEMENTATION QUALITY
- Build real responsive page components and interactions; do not deliver a static screenshot or nonfunctional controls.
- Use the uploaded assets locally, with responsive sizing and appropriate loading behavior. Do not hotlink images from Google Play.
- Add a descriptive page title, meta description, canonical URL for https://raystate.com, Open Graph metadata, and favicon using supplied brand assets.
- Use the project’s existing framework and conventions. Keep components reusable, content organized by locale, and avoid unnecessary dependencies.
- Before finishing, verify all three language states, Arabic RTL, mobile and desktop layouts, keyboard navigation, image rendering, and every contact/download link.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7b6efa07-e187-43bf-8c1a-2d10ff74b9bb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
