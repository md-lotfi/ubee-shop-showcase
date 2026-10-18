export type Locale = "en" | "fr" | "ar";
export const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
];

export const PLAY_URL = "https://play.google.com/store/apps/details?id=com.raystate.ubee&hl=en";
export const EMAIL = "contact@raystate.com";
export const PHONE = "+213551056686";
export const SITE = "https://raystate.com";

type Item = { title: string; body: string };
export type Copy = {
  skip: string;
  nav: { features: string; gallery: string; contact: string };
  language: string;
  download: string;
  downloadAria: string;
  hero: { eyebrow: string; title: string; body: string; secondary: string; bannerAlt: string };
  features: { title: string; intro: string; items: Item[]; capabilities: string; caps: string[] };
  gallery: { title: string; intro: string; shots: { alt: string; caption: string }[] };
  contact: { title: string; body: string; email: string; phone: string; website: string };
  footer: { tagline: string; made: string; rights: string };
};

const en: Copy = {
  skip: "Skip to main content",
  nav: { features: "Features", gallery: "Screenshots", contact: "Contact" },
  language: "Language",
  download: "Get it on Google Play",
  downloadAria: "Get UBee on Google Play (opens in a new tab)",
  hero: {
    eyebrow: "POS & inventory for independent shops",
    title: "Run your shop’s sales and stock from one phone.",
    body: "UBee helps small businesses ring up sales, track stock, follow customer balances and print receipts — and it keeps working offline.",
    secondary: "See what it does",
    bannerAlt: "UBee POS Mobile App banner with the UBee bee mascot holding a card terminal",
  },
  features: {
    title: "Everything a small shop needs at the counter",
    intro: "Five everyday jobs, handled in one app.",
    items: [
      { title: "Quick checkout", body: "Add products to a sale and check out in a few taps from the Point of Sale screen." },
      { title: "Inventory & low stock", body: "Manage your products and stock levels, and see at a glance what is out of stock." },
      { title: "Customers & balances", body: "Keep a customer list, track how much each customer owes, and record debt settlements." },
      { title: "Invoices & receipts", body: "View billing history and print receipts for your sales." },
      { title: "Business reports", body: "Log daily expenses and review revenue and profit reports." },
    ],
    capabilities: "Also supported",
    caps: ["Barcode scanning", "Offline-first: works without an internet connection"],
  },
  gallery: {
    title: "A look inside UBee",
    intro: "Official screenshots from the Google Play listing.",
    shots: [
      { alt: "UBee home dashboard showing today’s sales, total customers, out-of-stock count and quick access tiles", caption: "Dashboard — today’s sales, customers and stock alerts" },
      { alt: "UBee quick access grid with Point of Sale, Inventory, Customers, Billing, Expenses, Financials and Settings", caption: "Quick access to every part of the shop" },
      { alt: "UBee side navigation menu listing Dashboard, Point of Sale, Inventory, Customers, Expenses, Billing, Financials and Settings", caption: "Simple side navigation" },
      { alt: "UBee customers list showing a customer with an outstanding balance and an Add Customer button", caption: "Customer list with balances" },
      { alt: "UBee customer detail sheet with debt balance, call, settle debt, edit and delete actions, and invoice history", caption: "Customer details, debt and invoices" },
    ],
  },
  contact: {
    title: "Ready to try UBee?",
    body: "Install UBee from Google Play, or get in touch with the Raystate team with any questions.",
    email: "Email Raystate",
    phone: "Call Raystate",
    website: "Visit raystate.com",
  },
  footer: { tagline: "UBee is a POS and inventory app by Raystate.", made: "Company", rights: "All rights reserved." },
};

const fr: Copy = {
  skip: "Aller au contenu principal",
  nav: { features: "Fonctionnalités", gallery: "Captures", contact: "Contact" },
  language: "Langue",
  download: "Disponible sur Google Play",
  downloadAria: "Télécharger UBee sur Google Play (nouvel onglet)",
  hero: {
    eyebrow: "Caisse et stock pour commerces indépendants",
    title: "Gérez les ventes et le stock de votre boutique depuis un seul téléphone.",
    body: "UBee aide les petites entreprises à encaisser, suivre le stock, gérer les soldes clients et imprimer des reçus — même hors connexion.",
    secondary: "Découvrir les fonctionnalités",
    bannerAlt: "Bannière UBee POS Mobile App avec l’abeille UBee tenant un terminal de paiement",
  },
  features: {
    title: "Tout ce qu’il faut à un petit commerce au comptoir",
    intro: "Cinq tâches quotidiennes, réunies dans une seule application.",
    items: [
      { title: "Encaissement rapide", body: "Ajoutez des produits à une vente et encaissez en quelques gestes depuis l’écran Point de vente." },
      { title: "Stock et ruptures", body: "Gérez vos produits et niveaux de stock, et repérez d’un coup d’œil les articles en rupture." },
      { title: "Clients et soldes", body: "Tenez une liste de clients, suivez ce que chacun doit et enregistrez les règlements." },
      { title: "Factures et reçus", body: "Consultez l’historique de facturation et imprimez les reçus de vos ventes." },
      { title: "Rapports d’activité", body: "Notez vos dépenses quotidiennes et consultez les rapports de chiffre d’affaires et de bénéfice." },
    ],
    capabilities: "Également pris en charge",
    caps: ["Lecture de codes-barres", "Hors ligne d’abord : fonctionne sans connexion Internet"],
  },
  gallery: {
    title: "Un aperçu de UBee",
    intro: "Captures d’écran officielles de la fiche Google Play.",
    shots: [
      { alt: "Tableau de bord UBee affichant les ventes du jour, le nombre de clients, les ruptures de stock et les accès rapides", caption: "Tableau de bord — ventes, clients et alertes de stock" },
      { alt: "Grille d’accès rapide UBee : Point de vente, Inventaire, Clients, Facturation, Dépenses, Finances et Paramètres", caption: "Accès rapide à toute la boutique" },
      { alt: "Menu latéral UBee : Tableau de bord, Point de vente, Inventaire, Clients, Dépenses, Facturation, Finances et Paramètres", caption: "Navigation latérale simple" },
      { alt: "Liste des clients UBee avec un client ayant un solde dû et un bouton Ajouter un client", caption: "Liste des clients et soldes" },
      { alt: "Fiche client UBee avec solde de dette, actions appeler, régler, modifier, supprimer et historique des factures", caption: "Détails client, dette et factures" },
    ],
  },
  contact: {
    title: "Prêt à essayer UBee ?",
    body: "Installez UBee depuis Google Play, ou contactez l’équipe Raystate pour toute question.",
    email: "Écrire à Raystate",
    phone: "Appeler Raystate",
    website: "Visiter raystate.com",
  },
  footer: { tagline: "UBee est une application de caisse et de stock conçue par Raystate.", made: "Société", rights: "Tous droits réservés." },
};

const ar: Copy = {
  skip: "انتقل إلى المحتوى الرئيسي",
  nav: { features: "المزايا", gallery: "لقطات الشاشة", contact: "تواصل معنا" },
  language: "اللغة",
  download: "احصل عليه من Google Play",
  downloadAria: "حمّل UBee من Google Play (يفتح في علامة تبويب جديدة)",
  hero: {
    eyebrow: "نقطة بيع ومخزون للمتاجر المستقلة",
    title: "أدِر مبيعات متجرك ومخزونه من هاتف واحد.",
    body: "يساعد UBee المشاريع الصغيرة على تسجيل المبيعات، وتتبّع المخزون، ومتابعة أرصدة العملاء، وطباعة الإيصالات — ويواصل العمل دون اتصال بالإنترنت.",
    secondary: "اكتشف ما يقدّمه",
    bannerAlt: "لافتة تطبيق UBee لنقاط البيع مع شخصية النحلة تحمل جهاز دفع",
  },
  features: {
    title: "كل ما يحتاجه المتجر الصغير عند الصندوق",
    intro: "خمس مهام يومية في تطبيق واحد.",
    items: [
      { title: "دفع سريع", body: "أضف المنتجات إلى عملية البيع وأتمّ الدفع ببضع لمسات من شاشة نقطة البيع." },
      { title: "المخزون والنفاد", body: "أدِر منتجاتك ومستويات المخزون، واعرف بنظرة واحدة ما نفد منها." },
      { title: "العملاء والأرصدة", body: "احتفظ بقائمة العملاء، وتابع ما يدين به كل عميل، وسجّل تسديد الديون." },
      { title: "الفواتير والإيصالات", body: "اطّلع على سجل الفواتير واطبع إيصالات مبيعاتك." },
      { title: "تقارير النشاط", body: "سجّل المصاريف اليومية وراجع تقارير الإيرادات والأرباح." },
    ],
    capabilities: "مدعوم أيضًا",
    caps: ["مسح الباركود", "يعمل دون اتصال: لا يحتاج إلى الإنترنت"],
  },
  gallery: {
    title: "نظرة داخل UBee",
    intro: "لقطات شاشة رسمية من صفحة التطبيق على Google Play.",
    shots: [
      { alt: "لوحة تحكم UBee تعرض مبيعات اليوم وعدد العملاء والمنتجات النافدة وأزرار الوصول السريع", caption: "لوحة التحكم — المبيعات والعملاء وتنبيهات المخزون" },
      { alt: "شبكة الوصول السريع في UBee: نقطة البيع، المخزون، العملاء، الفوترة، المصاريف، المالية والإعدادات", caption: "وصول سريع إلى كل أقسام المتجر" },
      { alt: "القائمة الجانبية في UBee: لوحة التحكم، نقطة البيع، المخزون، العملاء، المصاريف، الفوترة، المالية والإعدادات", caption: "تنقّل جانبي بسيط" },
      { alt: "قائمة عملاء UBee تعرض عميلًا عليه رصيد مستحق وزر إضافة عميل", caption: "قائمة العملاء وأرصدتهم" },
      { alt: "تفاصيل عميل في UBee مع رصيد الدين وأزرار الاتصال والتسديد والتعديل والحذف وسجل الفواتير", caption: "تفاصيل العميل والديون والفواتير" },
    ],
  },
  contact: {
    title: "هل أنت مستعد لتجربة UBee؟",
    body: "ثبّت UBee من Google Play، أو تواصل مع فريق Raystate لأي استفسار.",
    email: "راسل Raystate",
    phone: "اتصل بـ Raystate",
    website: "زُر raystate.com",
  },
  footer: { tagline: "UBee تطبيق لنقاط البيع وإدارة المخزون من تطوير Raystate.", made: "الشركة", rights: "جميع الحقوق محفوظة." },
};

export const COPY: Record<Locale, Copy> = { en, fr, ar };
export const isLocale = (v: unknown): v is Locale => v === "en" || v === "fr" || v === "ar";
