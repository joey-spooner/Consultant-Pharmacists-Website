# GitHub Pages setup

This repository includes a GitHub Actions workflow for the Consultant Pharmacists static site. It builds the site into `artifacts/consultant-pharmacists/dist/public` and deploys that directory to GitHub Pages. Option B is the homepage and remains accessible at its previous `/single-page/` URL. The five-page Option A is preserved for review at `/option-a/`, with its pages beneath that path.

To publish it:

1. Upload/connect this code to your GitHub repository. The workflow runs on pushes to `main`; edit `.github/workflows/consultant-pharmacists-pages.yml` if your default branch has another name.
2. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. Open **Actions**, select **Deploy Consultant Pharmacists to GitHub Pages**, and choose **Run workflow**. Later pushes to `main` deploy automatically.

The workflow uses GitHub's `configure-pages` outputs rather than a hard-coded site URL: its `base_path` supplies the repository prefix for project sites, and its `origin` supplies `SITE_URL` (including a Pages custom domain when configured). Set up any custom domain and DNS in GitHub Pages settings as needed.

The site has not been published by this setup alone. It will have a live Pages URL only after the code is in a GitHub repository, Pages is enabled for Actions, and the workflow completes successfully.