---
name: GitHub Pages build verification
description: Distinguish successful automatic Pages jobs from the custom build that produces a working Vite site.
---

Before confirming that the website is published on GitHub Pages, verify the remote repository contains the prepared custom workflow, identify which workflow actually ran, and check the deployment's recorded URL.

**Why:** GitHub's automatic dynamic Pages workflow can successfully publish a source repository without running the Vite build. A green job status can therefore coexist with a 404 homepage. Local preparation or a merged task does not establish that its files have reached GitHub.

**How to apply:** If a user shares “Triggered via dynamic” or “pages build and deployment,” inspect remote workflow files and the run details rather than assuming it is the prepared build. Obtain the real site URL from deployment metadata, then check its response. Missing workflow files require syncing the latest code, not changing default token permissions or addressing unrelated runner notices.

## Workflow upload permissions

Do not assume the GitHub integration's `repo` scope permits uploading Actions workflows. Check for the separate `workflow` scope and distinguish the integration connection from Replit's Git-provider connection.

**Why:** Repository metadata can report full write access while creating a Git tree containing an Actions workflow returns 404. An otherwise identical tree without the workflow can succeed. The standard connector's configured scope set may omit `workflow`, so repeating its OAuth authorization cannot add the missing permission.

**How to apply:** Diagnose ambiguous write failures before requesting another authorization. If the configured scopes cannot grant workflow access, repair the native Git-provider connection or explain the missing permission rather than repeatedly reconnecting the same integration. Preparing Git objects through the API does not update a branch; report success only after verifying the branch reference advanced.

Do not infer divergent history from the Git pane's generic `PUSH_REJECTED` message.

**Why:** The pane can suggest missing remote commits even when a fresh fetch shows the remote is an ancestor of local HEAD and the actual push fails with invalid GitHub credentials.

**How to apply:** Fetch first, compare ahead/behind counts, and inspect the underlying Git error. Never pull, reset, or force-push merely to address this generic UI message when authentication is the real blocker.