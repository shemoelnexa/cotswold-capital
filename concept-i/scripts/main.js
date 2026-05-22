// ============================================================
// Cotswold Capital — main.js (Concept III)
// Lenis + nav scroll state + IntersectionObserver reveals + intent + filters.
// ============================================================

(() => {
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Lenis (fail-safe) ----------------------------------
  let lenis = null;
  function initLenis() {
    if (prefersReducedMotion || typeof Lenis === 'undefined') return;
    try {
      lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      window.__lenis = lenis;
    } catch (err) {
      console.warn('Lenis init failed — native scroll active.', err);
    }
  }

  // ---- Nav scrolled state ---------------------------------
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const onScroll = () => {
      nav.dataset.scrolled = window.scrollY > 8 ? 'true' : 'false';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---- Reveals --------------------------------------------
  function initReveals() {
    const els = document.querySelectorAll('.reveal, .reveal-stagger, .clip-reveal, .curtain, .section--dark');
    if (!els.length) return;
    if (prefersReducedMotion) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 }
    );
    els.forEach((el) => io.observe(el));
  }

  // ---- Intent toggle --------------------------------------
  function initIntent() {
    const intents = document.querySelectorAll('.intent input[type="radio"]');
    intents.forEach((r) => {
      r.addEventListener('change', () => {
        document.dispatchEvent(
          new CustomEvent('cc:intent', { detail: r.value })
        );
      });
    });
  }

  // ---- Opportunities filters ------------------------------
  function initFilters() {
    const filters = document.querySelectorAll('.chip[data-filter]');
    const rows = document.querySelectorAll('.opps-row');
    if (!filters.length || !rows.length) return;

    filters.forEach((chip) => {
      chip.addEventListener('click', () => {
        filters.forEach((c) => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        const f = chip.dataset.filter;
        rows.forEach((row) => {
          const tags = (row.dataset.sectors || '').split(',');
          row.style.display = f === 'all' || tags.includes(f) ? '' : 'none';
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initNav();
    initReveals();
    initIntent();
    initFilters();
  });
})();
