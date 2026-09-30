---
name: Transparent black logo previews
description: How to verify transparent black brand assets without misreading their preview.
---

When reviewing a black logo on transparency, inspect a separate preview flattened over the intended page background while preserving the transparent master.

**Why:** Transparent pixels may retain black RGB values. A viewer or an incorrect background operation can display the entire image as a black rectangle even when the logo's alpha mask is correct.

**How to apply:** Check the source's alpha channel, flatten a *copy* over the actual site background for visual review, and keep the unflattened PNG for use in the app.