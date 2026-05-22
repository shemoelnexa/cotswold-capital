// ============================================================
// Concept V — animations.js
// Number counters via GSAP.
// ============================================================

(() => {
  if (typeof gsap === 'undefined') return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  function syncLenis() {
    const lenis = window.__lenis;
    if (!lenis || typeof ScrollTrigger === 'undefined') return;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  function initCounters() {
    document.querySelectorAll('[data-count]').forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);

      if (prefersReducedMotion || typeof ScrollTrigger === 'undefined') {
        el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
        return;
      }
      const c = { v: 0 };
      gsap.to(c, {
        v: target,
        duration: 2.0,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        onUpdate: () => { el.textContent = `${prefix}${c.v.toFixed(decimals)}${suffix}`; },
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    syncLenis();
    initCounters();
    document.fonts?.ready?.then(() => {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });
  });
})();
