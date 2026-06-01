// ============================================================
// Cotswold Capital — Concept III
// Restraint by default. Only the nav scroll-state and basic
// reveal classes are toggled.
// ============================================================

(() => {
  // Nav scroll state — thin border appears after scroll past 8px
  const nav = document.querySelector('.nav');
  if (nav) {
    let ticking = false;
    const update = () => {
      nav.dataset.scrolled = window.scrollY > 8 ? 'true' : 'false';
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  // Year in the footer copyright
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
