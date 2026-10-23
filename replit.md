# Consultant Pharmacists of America

A clinical reference website with book and primer purchases, sample downloads, webinars, a CV and an inquiry form.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

The clinical reference website is the sole public design. Retired designs and their unused assets are removed. Keep the current appearance and copy unchanged during routing or code cleanup. Do not claim GitHub Pages is live until a deployment is confirmed.

The user expects the free self-assessment download to request name and email only before delivery; the current direct download does not yet implement this. Publishing approval does not mean that form is connected.

Do not change the current palette during maintenance. Where a gold accent is specifically requested, use muted gold rather than orange.

Prominently offer the free electrolyte self-assessment, keep the full webinar list on its dedicated page rather than the homepage, provide separate webinar-list and speaking-request CTAs, omit speaking fees, and integrate About. The Contact page uses Formspree. Do not claim automated webinar-list replies exist unless that behavior is connected and verified.

The canonical pages are `/`, `/webinars/`, `/contact/` and `/cv/`. Keep `/join/` unlisted. The Terms of Sale remain at `/terms/` with their footer and purchase links, but are excluded from the sitemap. Preserve redirects for earlier shared addresses.

The supplied Terms of Sale require review before sales launch. Keep the bracketed refund text until the client decides the policy.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Keep book positioning practical and problem-focused, but distinguish verified topic coverage from promised treatment outcomes or bedside protocols. The supplied orange-juice/cardiac-medication anecdote needs a named drug and credible source before publication; use general interaction copy meanwhile. Describe individualization as “one formula doesn’t fit every patient,” not a claim that every patient requires a unique formula.
- Present the free electrolyte download under the guide's Electrolytes (Chapters 5–11) section. The supplied file has 29 physical PDF pages, including self-assessment questions/answers and contents/appendices listings, not the full text of those chapters; do not claim it contains all seven chapters or present it as a separate title. A previous eight-page description was incorrect.
- The supplied full-book PDF is not encrypted or permission-restricted despite any "ReadOnly" filename. Do not put the full PDF in public web assets or claim it is protected; Gumroad watermarking is expected to be applied on upload, not by this site.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
