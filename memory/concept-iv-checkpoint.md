---
name: concept-iv-checkpoint
description: Concept IV ("Editorial impact, in full bleed") — bold full-bleed home page adapted from the base Figma theme to the Cotswold brand. Built, on main, copy + logos still placeholder.
metadata:
  type: project
---

## What it is
A fourth design direction at `concept-iv/` (self-contained: `index.html`,
`styles/{tokens,base,site}.css`, `scripts/main.js`, `assets/logo/`). A faithful
section-by-section translation of the reference Figma frame (1920×7116), with the
**layout/geometry preserved** and the **brand applied** (logo, palette, typography,
content, images all Cotswold's). Linked from the root concept switcher, which is now a
**2×2 card layout** of the four concepts.

## Key decisions (checkpoint as of 2026-06-02)
- **Type:** the exact Figma faces — **Founders Grotesk / Founders Grotesk Condensed**
  (Klim, commercial) — are named first in the CSS stack so licensed/installed envs
  (e.g. HubSpot) render the real thing; free fallbacks **Oswald** (condensed display) +
  **Space Grotesk** (body) are loaded so the preview looks right. See [[typography]].
- **Hero:** headline "Quiet Conviction" (placeholder, pulled from the brand essence) with
  `mix-blend-mode: difference` over a **minimal finance** image; nav logo/Enquire/Menu are
  white; soft scrim keeps it readable. The blend needs no stacking context on
  `.hero__content` or it won't blend with the image.
- **Work grid:** business/finance imagery only (no charts/trading). "View Opportunity" is
  white text+icon, **no shape**, **hover-only**, and `z-index:2` so it sits above the hover
  scrim.
- **Naming:** "Human Magic" (the base theme's name) removed from all HTML/CSS/JS. Still
  present in `client-breif.txt` (verbatim brief) and [[tech-stack]] memory as historical
  /internal record only.

## Open items before launch
- **Hero copy** is placeholder — Mark writes all final copy. See [[content-ownership]].
- **Logo wall** uses real blue-chip marks (Apple, Visa, HSBC, …) via the Simple Icons CDN
  purely as **illustrative placeholders**. Must be swapped for Cotswold's actual approved
  client/partner/regulator marks before launch (misrepresentation risk for a regulated firm).

**Why:** captures the non-obvious choices (font-licensing fallback strategy, the
difference-blend stacking-context gotcha, and the two things that are deliberately
placeholder) so a later session doesn't "fix" them wrongly or ship the placeholders.
**How to apply:** when resuming Concept IV, treat copy + logo wall as unfinished; keep the
real Figma font names first in the stack. Pushed to `main` (latest commit `a325f94`).
See [[brand-direction]] and [[site-map]].
