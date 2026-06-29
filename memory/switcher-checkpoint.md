---
name: switcher-checkpoint
description: Root concept switcher (index.html) now shows only Concept I and Concept IV — Concept II & III hidden, IV renumbered to "Concept II". On main.
metadata:
  type: project
---

## What changed (checkpoint as of 2026-06-04)
The root concept switcher (`index.html`) was trimmed from four concepts to two:

- **Concept I** — "Cotswold, in motion." → `./concept-i/index.html` (unchanged)
- **Concept II** (card label) — "Editorial impact, in full bleed." → `./concept-iv/index.html`
  (this is the **former Concept IV**; only the displayed number/copy changed, the link still
  points at the `concept-iv/` folder). See [[concept-iv-checkpoint]].

The **Concept II** (`concept-ii/`) and **Concept III** (`concept-iii/`) cards were **removed
from the switcher only**. Heading changed "Four directions" → "Two directions".

## Important
- The `concept-ii/` and `concept-iii/` **folders are untouched** — they are only hidden from
  the index, not deleted. They remain reachable by direct URL.
- The renamed card still has class `card--iv` and href `./concept-iv/index.html`; do not
  assume "Concept II" in the UI maps to the `concept-ii/` folder.

**Why:** records that UI concept numbers no longer match folder names, so a later session
doesn't "fix" the mismatch by repointing the link or deleting the hidden folders.
**How to apply:** treat folder paths as the source of truth; the switcher labels are a
curated subset. Local dev: `npm run dev` (browser-sync, port 8080). Pushed to `main`,
commit `bff6fbf`.
