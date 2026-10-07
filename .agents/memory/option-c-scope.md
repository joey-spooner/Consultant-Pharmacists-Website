---
name: Option C scope
description: Keep A/B visually intact while Option C is the primary GitHub Pages homepage.
---

Option C is a separate third version. Keep Options A and B as they are; do not apply C's PDF purchase paths, pricing, removals, or red visual direction to them.

**Why:** On 2026-10-07 the user explicitly chose “Yes—add Option C and keep A and B as they are,” resolving a conflict with the uploaded brief's instructions to update both older versions.

**How to apply:** Isolate C's styles, copy, purchase configuration, and supporting pages. Adding routes and static route shells is acceptable, but changes to shared components must not alter A or B.

Option C is now the primary GitHub Pages homepage. Keep B accessible at its original `/single-page/` route and A at `/option-a/`; do not rewrite their visual content or purchase flows.

**Why:** The user subsequently asked to “Make C the primary page for GitHub pages. Leave A and B in the background.” This changes which option owns the root URL, not the approval to preserve A/B as alternatives.

**How to apply:** Point homepage and C navigation to the root; use root canonical/index metadata for C and background/noindex metadata for the review alternatives. Keep their direct links working.
