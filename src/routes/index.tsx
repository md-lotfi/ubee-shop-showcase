import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, Globe, Mail, Menu, Phone, X, ExternalLink, ShoppingCart, Boxes, Users, ReceiptText, BarChart3, ScanBarcode, WifiOff } from "lucide-react";
import { COPY, LOCALES, PLAY_URL, EMAIL, PHONE, SITE, isLocale, type Locale } from "@/lib/i18n";
import logo from "@/assets/ubee-logo.png.asset.json";
import banner from "@/assets/ubee-pos-banner.png.asset.json";
import s1 from "@/assets/ubee-play-01.jpg.asset.json";
import s3 from "@/assets/ubee-play-03.jpg.asset.json";
import s4 from "@/assets/ubee-play-04.jpg.asset.json";
import s5 from "@/assets/ubee-play-05.jpg.asset.json";
import s6 from "@/assets/ubee-play-06.jpg.asset.json";

const TITLE = "UBee — Offline-first POS & inventory app for small shops | Raystate";
const DESC = "UBee by Raystate helps independent shops ring up sales, track stock, follow customer balances, print receipts and view reports — even offline. Get it on Google Play.";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): { lang?: Locale } => (isLocale(s.lang) ? { lang: s.lang } : {}),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE },
      { property: "og:site_name", content: "UBee by Raystate" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: SITE }],
  }),
  component: Index,
});

const SHOTS = [s1, s3, s4, s5, s6];
const ICONS = [ShoppingCart, Boxes, Users, ReceiptText, BarChart3];
const CAP_ICONS = [ScanBarcode, WifiOff];

function PlayButton({ label, aria, className = "" }: { label: string; aria: string; className?: string }) {
  return (
    <a
      href={PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0">
        <path fill="currentColor" d="M3.6 2.2a1 1 0 0 0-.4.8v18a1 1 0 0 0 .4.8l10-9.8zM15 13.4l2.6 2.6-11.4 6.5zm0-2.8L6.2 1.5 17.6 8zm4 .2 2.4 1.4a.9.9 0 0 1 0 1.6L19 15.2 16.2 12.4z" />
      </svg>
      <span>{label}</span>
    </a>
  );
}

function Index() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const lang: Locale = search.lang ?? "en";
  const t = COPY[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const navLinks = [
    { href: "#features", label: t.nav.features },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#contact", label: t.nav.contact },
  ];

  const LangSelect = ({ id }: { id: string }) => (
    <div className="flex items-center gap-1.5">
      <Globe aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
      <label htmlFor={id} className="sr-only">{t.language}</label>
      <select
        id={id}
        value={lang}
        onChange={(e) => navigate({ search: { lang: e.target.value as Locale }, replace: true, resetScroll: false })}
        className="min-h-11 rounded-full border border-border bg-card px-3 text-sm font-medium text-foreground"
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code} lang={l.code}>{l.label}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div dir={dir} lang={lang} className={lang === "ar" ? "text-[1.03rem]" : ""}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-2">
        {t.skip}
      </a>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <a href="#main" className="flex min-w-0 shrink-0 items-center gap-2" aria-label="UBee — Raystate">
            <img src={logo.url} alt="" width={36} height={40} className="h-10 w-auto" />
            <span className="font-display text-xl font-bold" dir="ltr">UBee</span>
          </a>
          <nav aria-label={t.nav.features} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <LangSelect id="lang-desktop" />
            <PlayButton label={t.download} aria={t.downloadAria} />
          </div>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
        {open && (
          <div id="mobile-menu" className="border-t border-border px-4 pb-5 pt-3 md:hidden">
            <nav aria-label={t.nav.features}>
              <ul className="grid gap-1">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-medium hover:bg-secondary">{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <LangSelect id="lang-mobile" />
              <PlayButton label={t.download} aria={t.downloadAria} />
            </div>
          </div>
        )}
      </header>

      <main id="main">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_1fr]">
          <div className="min-w-0">
            <p className="inline-flex rounded-full bg-secondary px-3 py-1 text-sm font-medium text-muted-foreground">{t.hero.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">{t.hero.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.hero.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PlayButton label={t.download} aria={t.downloadAria} className="px-6 py-3 text-base" />
              <a href="#features" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-semibold transition hover:bg-secondary">
                {t.hero.secondary}
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
          <div className="relative min-w-0">
            <div aria-hidden="true" className="absolute inset-6 -z-10 rounded-[3rem] bg-honey/30 blur-3xl" />
            <div className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-6">
              <img src={banner.url} alt={t.hero.bannerAlt} width={1198} height={444} className="h-auto w-full" fetchPriority="high" />
              <div className="mt-4 flex items-end justify-center gap-3 sm:gap-5">
                <img src={s1.url} alt={t.gallery.shots[0].alt} width={485} height={1080} className="w-[38%] max-w-44 rounded-2xl border border-border shadow-md" />
                <img src={s5.url} alt={t.gallery.shots[3].alt} width={864} height={1920} className="w-[38%] max-w-44 translate-y-3 rounded-2xl border border-border shadow-md" />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" aria-labelledby="features-title" className="scroll-mt-20 border-y border-border bg-card py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="features-title" className="max-w-2xl text-3xl font-bold sm:text-4xl">{t.features.title}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{t.features.intro}</p>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.features.items.map((f, i) => {
                const Icon = ICONS[i];
                return (
                  <li key={f.title} className="rounded-2xl border border-border bg-background p-6">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{f.body}</p>
                  </li>
                );
              })}
              <li className="rounded-2xl bg-ink p-6 text-ink-foreground">
                <h3 className="text-xl font-semibold">{t.features.capabilities}</h3>
                <ul className="mt-4 grid gap-3">
                  {t.features.caps.map((c, i) => {
                    const Icon = CAP_ICONS[i];
                    return (
                      <li key={c} className="flex items-start gap-3 text-ink-muted">
                        <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-honey" />
                        <span>{c}</span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="gallery-title" className="text-3xl font-bold sm:text-4xl">{t.gallery.title}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{t.gallery.intro}</p>
            <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
              {t.gallery.shots.map((s, i) => (
                <li key={i}>
                  <figure>
                    <div className="overflow-hidden rounded-2xl border-4 border-ink bg-ink shadow-md">
                      <img src={SHOTS[i].url} alt={s.alt} loading="lazy" decoding="async" width={485} height={1080} className="aspect-[485/1080] h-auto w-full object-cover object-top" />
                    </div>
                    <figcaption className="mt-3 text-sm font-medium leading-snug">{s.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 px-4 pb-20 sm:px-6">
          <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-3xl bg-ink p-8 text-ink-foreground sm:p-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 id="contact-title" className="text-3xl font-bold sm:text-4xl">{t.contact.title}</h2>
              <p className="mt-3 max-w-lg text-lg text-ink-muted">{t.contact.body}</p>
              <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" aria-label={t.downloadAria}
                className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:-translate-y-0.5">
                {t.download}
              </a>
            </div>
            <ul className="grid gap-3">
              {[
                { href: `mailto:${EMAIL}`, icon: Mail, label: t.contact.email, value: EMAIL },
                { href: `tel:${PHONE}`, icon: Phone, label: t.contact.phone, value: PHONE },
                { href: SITE, icon: ExternalLink, label: t.contact.website, value: "raystate.com", ext: true },
              ].map((c) => (
                <li key={c.href}>
                  <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex min-h-14 items-center gap-4 rounded-2xl border border-ink-foreground/15 px-5 py-3 transition hover:bg-ink-foreground/10">
                    <c.icon aria-hidden="true" className="size-5 shrink-0 text-honey" />
                    <span className="min-w-0">
                      <span className="block font-semibold">{c.label}</span>
                      <span className="block truncate text-sm text-ink-muted" dir="ltr">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-[2fr_1fr_1fr]">
          <div className="flex items-start gap-3">
            <img src={logo.url} alt="" loading="lazy" width={36} height={40} className="h-10 w-auto" />
            <p className="text-muted-foreground">{t.footer.tagline}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">{t.footer.made}</h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <li><a className="hover:text-foreground" href={SITE} target="_blank" rel="noopener noreferrer">Raystate — raystate.com</a></li>
              <li><a className="hover:text-foreground" href={`mailto:${EMAIL}`} dir="ltr">{EMAIL}</a></li>
              <li><a className="hover:text-foreground" href={`tel:${PHONE}`} dir="ltr">{PHONE}</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold">UBee</h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <li><a className="hover:text-foreground" href={PLAY_URL} target="_blank" rel="noopener noreferrer" aria-label={t.downloadAria}>{t.download}</a></li>
            </ul>
          </div>
        </div>
        <p className="border-t border-border px-4 py-5 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Raystate. {t.footer.rights}
        </p>
      </footer>
    </div>
  );
}
