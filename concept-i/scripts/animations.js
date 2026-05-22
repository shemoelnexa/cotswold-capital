// ============================================================
// Cotswold Capital — animations.js (Concept III)
// GSAP + ScrollTrigger. Just two things:
//   – Number counters on opportunity figures
//   – Subtle hero photograph parallax
// No pins, no choreographed moments.
// ============================================================

(() => {
  if (typeof gsap === 'undefined') return;

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  function syncLenis() {
    const lenis = window.__lenis;
    if (!lenis || typeof ScrollTrigger === 'undefined') return;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Number counters
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);

      if (prefersReducedMotion || typeof ScrollTrigger === 'undefined') {
        el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
        return;
      }
      const counter = { v: 0 };
      gsap.to(counter, {
        v: target,
        duration: 1.8,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${counter.v.toFixed(decimals)}${suffix}`;
        },
      });
    });
  }

  // Hero photograph subtle parallax — gentle, scroll-tied.
  function initHeroParallax() {
    const img = document.querySelector('[data-hero-photo] img');
    if (!img || prefersReducedMotion || typeof ScrollTrigger === 'undefined') return;
    gsap.fromTo(
      img,
      { yPercent: -6, scale: 1.06 },
      {
        yPercent: 6,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      }
    );
  }

  document.addEventListener('DOMContentLoaded', () => {
    syncLenis();
    initCounters();
    initHeroParallax();
    document.fonts?.ready?.then(() => {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });
  });
})();
