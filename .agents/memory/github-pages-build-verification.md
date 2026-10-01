---
name: GitHub Pages build verification
description: Distinguish successful automatic Pages jobs from the custom build that produces a working Vite site.
---

Before confirming that the website is published on GitHub Pages, verify the remote repository contains the prepared custom workflow, identify which workflow actually ran, and check the deployment's recorded URL.

**Why:** GitHub's automatic dynamic Pages workflow can successfully publish a source repository without running the Vite build. A green job status can therefore coexist with a 404 homepage. Local preparation or a merged task does not establish that its files have reached GitHub.

**How to apply:** If a user shares “Triggered via dynamic” or “pages build and deployment,” inspect remote workflow files and the run details rather than assuming it is the prepared build. Obtain the real site URL from deployment metadata, then check its response. Missing workflow files require syncing the latest code, not changing default token permissions or addressing unrelated runner notices.