# Cotswold Capital — Web Design Concept (III)

Concept III: **"Cotswold, photographed."** Apple iPhone-page pattern applied to a boutique investment bank. All-sans typography, vertical stack, one large photograph per section, restrained motion.

## Repository

```
.
├── client-breif.txt        Original brief
├── MEMORY.md, memory/      Project memory
├── PRODUCT.md, DESIGN.md   Design source of truth
├── README.md, .gitignore
└── web/
    ├── index.html           Home
    ├── opportunities.html   Live mandates
    ├── about.html           Network model
    ├── styles/              tokens.css · base.css · site.css
    ├── scripts/             main.js (Lenis + reveals) · animations.js (counters + parallax)
    └── assets/logo/         Rose-gold mark SVG
```

## Run it

```bash
cd web
python3 -m http.server 5173
```

Open <http://127.0.0.1:5173/>.

## Stack

Vanilla HTML / CSS / JS. GSAP + ScrollTrigger + Lenis via CDN. Inter via Google Fonts. Photography from Unsplash (architectural and institutional themes).
