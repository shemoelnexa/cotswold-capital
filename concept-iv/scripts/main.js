/* Cotswold Capital — Concept IV
   Minimal progressive enhancement: current year + menu affordance. */
(function () {
  "use strict";

  // Stamp the current year in the footer.
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Menu button — placeholder affordance (no panel in this single-page concept).
  var menu = document.querySelector(".nav__menu");
  if (menu) {
    menu.addEventListener("click", function () {
      var open = menu.getAttribute("aria-expanded") === "true";
      menu.setAttribute("aria-expanded", String(!open));
    });
  }
})();
