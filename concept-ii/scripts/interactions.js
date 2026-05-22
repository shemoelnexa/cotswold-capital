// ============================================================
// Concept V — interactions.js
// Custom cursor + magnetic buttons + hero cube mouse-react.
// ============================================================

(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  // Custom cursor
  function initCursor() {
    if (isTouch || prefersReducedMotion) return;
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);
    document.body.dataset.cursor = 'custom';

    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });

    (function tick() {
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(tick);
    })();

    const sel = 'a, button, .intent, [data-cursor-state]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(sel)) ring.dataset.state = 'interactive';
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(sel)) ring.removeAttribute('data-state');
    });
  }

  // Magnetic buttons
  function initMagnetic() {
    if (isTouch || prefersReducedMotion) return;
    document.querySelectorAll('.btn, .nav__cta').forEach((el) => {
      let raf = null;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.2;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.2;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        });
      });
      el.addEventListener('mouseleave', () => {
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = '';
      });
    });
  }

  // Hero cube: JS-driven slow spin + mouse-tilt blend.
  // (Combines them into a single transform — CSS animation can't coexist.)
  function initCube() {
    if (prefersReducedMotion) return;
    const stage = document.querySelector('.hero__visual');
    const cube = stage?.querySelector('.cube');
    if (!stage || !cube) return;

    document.documentElement.classList.add('cube-driven');

    let baseY = 38;                // continuous spin
    let mouseX = 0, mouseY = 0;    // target tilts
    let mx = 0, my = 0;            // smoothed mouse

    if (!isTouch) {
      stage.addEventListener('mousemove', (e) => {
        const r = stage.getBoundingClientRect();
        mouseX = ((e.clientX - r.left) / r.width - 0.5) * 18;
        mouseY = -((e.clientY - r.top) / r.height - 0.5) * 12;
      });
      stage.addEventListener('mouseleave', () => { mouseX = 0; mouseY = 0; });
    }

    let last = performance.now();
    function tick(now) {
      const dt = (now - last) / 1000;
      last = now;
      baseY = (baseY + dt * 18) % 360;     // ~20s per rotation
      mx += (mouseX - mx) * 0.06;
      my += (mouseY - my) * 0.06;
      const rx = -22 + my;
      const ry = baseY + mx;
      cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initMagnetic();
    initCube();
  });
})();
