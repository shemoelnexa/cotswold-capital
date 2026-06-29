---
name: concept-i-approved-v2-copy
description: Concept I is the approved concept; full 6-page v2 copy applied; brand renamed to "Cotswolds Capital"
metadata:
  type: project
---

Client approved **Concept I** (in `concept-i/`) as the final concept (confirmed 2026-06-29). The other concepts (ii–iv) are not the deliverable. See [[switcher-checkpoint]].

On 2026-06-29 the v2 website copy (`CotswoldsCapital_Website_Copy_v2`) was applied across Concept I as a full **6-page site**: Home (`index.html`), About, Expertise, Situations, Insights, Contact. `opportunities.html` was kept as the "current mandates" page (linked from Home's "View current mandates" CTA and the "Example matters presently in hand" cards) but is **not** in the primary nav. Nav IA is now: Home · About · Expertise · Situations · Insights · Contact.

Key decisions:
- **Brand name changed to "Cotswolds Capital" (plural)** per the client copy doc, replacing the singular "Cotswold Capital" used in the earlier build. Applied in all text (titles, footer, body). **The logo image (`assets/logo/cotswold-logo.avif`) still says "Cotswold" and needs re-lettering to a new asset** — Claude cannot edit the raster/avif logo.
- The copy intentionally mixes "the firm" and "the office"; copy was applied **verbatim** rather than a blanket find-replace.
- Home city photo strip was **removed** and replaced with a typographic jurisdictions block, per the doc's design note "No meaningless picture of the cities."
- Added a **"Trusted partners" logo marquee** on Home using placeholder wordmarks (Meridian, Ashford, etc.) — needs real partner logo assets.
- Situations "Selected situations" section is a **client placeholder** (case studies to follow).
- Footer dropped "FCA registration" (firm does not engage in regulated activities); legal column is Privacy & legal + Modern slavery statement.

New shared CSS components added to `concept-i/styles/site.css`: `.jurisdictions`/`.jx`, `.marquee`, `.prose`/`.prose-cols`, `.discipline`, `.environments`/`.environment`, `.locations`.
