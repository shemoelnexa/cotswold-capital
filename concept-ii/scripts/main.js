// ============================================================
// Cotswold Capital — Concept V — main.js
// ============================================================

(() => {
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initLenis() {
    if (prefersReducedMotion || typeof Lenis === 'undefined') return;
    try {
      const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1.0, touchMultiplier: 1.5 });
      function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
      window.__lenis = lenis;
    } catch (e) { console.warn('Lenis failed; native scroll active.', e); }
  }

  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const update = () => { nav.dataset.scrolled = window.scrollY > 8 ? 'true' : 'false'; };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initReveals() {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!els.length) return;
    if (prefersReducedMotion) { els.forEach((e) => e.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    els.forEach((el) => io.observe(el));
  }

  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress__bar');
    if (!bar) return;
    let raf = null;
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const r = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${r})`;
    }
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { update(); raf = null; });
    }, { passive: true });
    update();
  }

  function initIntent() {
    document.querySelectorAll('.intent input[type="radio"]').forEach((r) => {
      r.addEventListener('change', () => {
        document.dispatchEvent(new CustomEvent('cc:intent', { detail: r.value }));
      });
    });
  }

  function initFilters() {
    const filters = document.querySelectorAll('.chip[data-filter]');
    const items = document.querySelectorAll('[data-sectors]');
    if (!filters.length || !items.length) return;
    filters.forEach((chip) => {
      chip.addEventListener('click', () => {
        filters.forEach((c) => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        const f = chip.dataset.filter;
        items.forEach((it) => {
          const tags = (it.dataset.sectors || '').split(',');
          it.style.display = f === 'all' || tags.includes(f) ? '' : 'none';
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initNav();
    initReveals();
    initScrollProgress();
    initIntent();
    initFilters();
  });
})();
