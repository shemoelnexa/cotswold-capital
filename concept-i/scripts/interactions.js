// ============================================================
// Cotswold Capital — interactions.js
// Refined micro-interactions:
//   – Custom cursor (dot + delayed ring) with state-aware swell
//   – Magnetic buttons (cursor attraction)
//   – Mouse-tracked 3D tilt on featured cards
//   – Service hover preview (image follows cursor)
//   – Scroll progress bar
//   – Hero word-by-word reveal trigger
// ============================================================

(() => {
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  // ============ Custom cursor =============================
  function initCursor() {
    if (isTouch || prefersReducedMotion) return;
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);
    document.body.dataset.cursor = 'custom';

    let mx = 0, my = 0;     // mouse target
    let rx = 0, ry = 0;     // ring follow

    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;
    }
    window.addEventListener('mousemove', onMove, { passive: true });

    function tick() {
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // State-aware hover — both crosshair and ring stay coordinated
    const interactiveSel = 'a, button, .intent, .chip, [data-cursor-state]';
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest(interactiveSel);
      if (!t) return;
      const state = t.dataset.cursorState || 'interactive';
      ring.dataset.state = state;
      dot.dataset.state = state;
    });
    document.addEventListener('mouseout', (e) => {
      const t = e.target.closest(interactiveSel);
      if (t) {
        ring.removeAttribute('data-state');
        dot.removeAttribute('data-state');
      }
    });
  }

  // ============ Magnetic buttons ===========================
  function initMagnetic() {
    if (isTouch || prefersReducedMotion) return;
    const els = document.querySelectorAll('.magnetic, .btn, .nav__cta');
    els.forEach((el) => {
      let raf = null;
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) * 0.22;
        const dy = (e.clientY - cy) * 0.22;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        });
      };
      const onLeave = () => {
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = '';
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    });
  }

  // ============ Card tilt ==================================
  function initTilt() {
    if (isTouch || prefersReducedMotion) return;
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach((card) => {
      const inner = card.querySelector('.feature__media-inner') || card;
      let raf = null;
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          inner.style.transform =
            `perspective(1200px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg)`;
        });
      });
      card.addEventListener('mouseleave', () => {
        if (raf) cancelAnimationFrame(raf);
        inner.style.transform = '';
      });
    });
  }

  // ============ Service hover preview ======================
  function initServicePreview() {
    if (isTouch || prefersReducedMotion) return;
    const services = document.querySelectorAll('.service[data-preview]');
    if (!services.length) return;

    const preview = document.createElement('div');
    preview.className = 'service-preview';
    preview.innerHTML = '<img alt="" />';
    document.body.appendChild(preview);
    const img = preview.querySelector('img');

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let running = false;

    function tick() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      preview.style.left = `${rx + 28}px`;
      preview.style.top = `${ry - 80}px`;
      if (running) requestAnimationFrame(tick);
    }

    services.forEach((s) => {
      s.addEventListener('mouseenter', () => {
        img.src = s.dataset.preview;
        preview.classList.add('is-visible');
        running = true;
        requestAnimationFrame(tick);
      });
      s.addEventListener('mouseleave', () => {
        preview.classList.remove('is-visible');
        running = false;
      });
    });

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });
  }

  // ============ Scroll progress bar ========================
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress__bar');
    if (!bar) return;
    let raf = null;
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${ratio})`;
    }
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        update();
        raf = null;
      });
    }, { passive: true });
    update();
  }

  // ============ Hero word reveal (toggle .is-ready) ========
  function initHeroReveal() {
    const heros = document.querySelectorAll('[data-hero]');
    if (!heros.length) return;
    if (prefersReducedMotion) {
      heros.forEach((h) => h.classList.add('is-ready'));
      return;
    }
    const reveal = () =>
      heros.forEach((h) =>
        requestAnimationFrame(() => h.classList.add('is-ready'))
      );
    setTimeout(() => {
      (document.fonts?.ready ?? Promise.resolve()).then(reveal);
    }, 80);
  }

  // ============ Services-IV persistent image swap =========
  // The 2-col services pattern where hovering an item swaps the
  // large image on the right.
  function initServicesIV() {
    const items = document.querySelectorAll('.services-iv__item[data-frame]');
    const frames = document.querySelectorAll('.services-iv__frame');
    if (!items.length || !frames.length) return;

    function activate(idx) {
      items.forEach((it, i) => it.setAttribute('aria-selected', i === idx ? 'true' : 'false'));
      frames.forEach((f, i) => f.classList.toggle('is-active', i === idx));
    }
    activate(0);

    items.forEach((item, i) => {
      item.addEventListener('mouseenter', () => activate(i));
      item.addEventListener('focus', () => activate(i));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMagnetic();
    initTilt();
    initServicePreview();
    initServicesIV();
    initScrollProgress();
    initHeroReveal();
  });
})();
