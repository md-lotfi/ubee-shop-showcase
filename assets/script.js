(() => {
  "use strict";

  const pageLocale = document.documentElement.lang;
  const requestedLocale = new URLSearchParams(window.location.search).get("lang");
  const siteRoot = document.documentElement.dataset.siteRoot || "./";
  const localePaths = { en: "", fr: "fr/", ar: "ar/" };

  if (requestedLocale && Object.prototype.hasOwnProperty.call(localePaths, requestedLocale)) {
    const destination = new URL(siteRoot + localePaths[requestedLocale], window.location.href);
    destination.hash = window.location.hash;
    if (requestedLocale === pageLocale) {
      window.history.replaceState(null, "", destination.pathname + destination.hash);
    } else {
      window.location.replace(destination.href);
    }
  }

  document.querySelectorAll("[data-current-year]").forEach((year) => {
    year.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll(".mobile-links a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = link.closest(".mobile-menu");
      if (menu) menu.open = false;
    });
  });
})();
