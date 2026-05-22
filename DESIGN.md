# Cotswold Capital — DESIGN

> Tokens, type, components, motion. Concept III.

## Color (OKLCH, restrained)

| Token | OKLCH | Use |
|---|---|---|
| `--surface` | `oklch(0.99 0.005 60)` | Page background — warm off-white |
| `--surface-2` | `oklch(0.96 0.008 50)` | Quiet section background |
| `--ink` | `oklch(0.18 0.012 60)` | Primary text |
| `--ink-2` | `oklch(0.42 0.010 60)` | Secondary text |
| `--ink-3` | `oklch(0.62 0.008 60)` | Tertiary / meta |
| `--rule` | `oklch(0.92 0.008 60)` | Hairlines |
| `--rule-strong` | `oklch(0.82 0.010 50)` | Stronger dividers |
| `--rose` | `oklch(0.66 0.075 35)` | Logo mark only |
| `--blue` | `oklch(0.36 0.075 245)` | Links + status pills only |

Rose gold **never** colors typography or large surfaces — only the mark. Blue is reserved for inline links and tiny status indicators.

## Typography

Single sans voice. **Inter** variable font (Google Fonts).

| Token | Use | Size |
|---|---|---|
| `--t-display` | Hero headline | clamp(3rem, 6.5vw, 6rem) |
| `--t-h1` | Section openers | clamp(2.25rem, 4vw, 3.5rem) |
| `--t-h2` | Sub-section | clamp(1.375rem, 1.6vw, 1.75rem) |
| `--t-body` | Body | 1.0625rem |
| `--t-meta` | Eyebrows | 0.8125rem |

Weights: 300 (display), 400 (body), 500 (eyebrow/meta), 600 (emphasis).
Tracking: tight on display (-0.022em), normal on body.

No italic emphasis. No serif. Single tone of voice.

## Space (4px base)

`--s-1..s-12` from 4px to 256px. Section padding rhythm varies.

## Motion

- `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`
- `--ease-soft: cubic-bezier(0.4, 0, 0.2, 1)`
- UI under 300ms (160ms button, 220ms hover, 280ms section transitions)
- Image fade-up: 800ms
- Number counters: 1800ms power4.out
- Hero photo parallax: scrub-tied to scroll

**No animation that draws attention to itself.** Motion is invisible discipline.

## Components

- **Hero** — eyebrow, large sans headline, brief subhead, ONE big architectural photograph below.
- **Section** — vertical stack. Header (eyebrow + title + optional sub) above content. One supporting photograph where useful, sized large.
- **Service row** — number + name + description + arrow. Text-led, no card.
- **Featured opportunity** — alternating image + meta block. Calm, not cinematic.
- **City card** — small photograph + city name + role + address. Three in a grid for geographic section.
- **Network preview** — image on one side, copy on the other.
- **Contact** — radio toggle for two intents + simple form.
- **Footer** — institutional, dense, restrained.

## Components — disallowed

No marquees, no horizontal pin, no dark contrast bands, no italic-serif emphasis, no 3D objects, no clip-path reveal drama, no sticky-statement crossfade, no cinematic split panels, no massive wordmark moments.
