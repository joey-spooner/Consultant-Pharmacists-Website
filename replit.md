# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

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

Keep the existing five-page website while developing a book-focused single-page alternative for comparison. The user intends GitHub Pages to be the long-term host, but hosting migration should wait for design approval.

The alternative must prominently offer the free electrolyte self-assessment, keep the webinar list out of its public content, provide separate webinar-list and speaking-request CTAs, omit speaking fees, and integrate About. Form-to-email handling is deferred until design approval; Formspree is the user's suggested service, not an already configured integration. Do not claim requests are submitted or that webinar-list replies are automated until that behavior is connected and verified.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Keep book positioning practical and problem-focused, but distinguish verified topic coverage from promised treatment outcomes or bedside protocols. The supplied orange-juice/cardiac-medication anecdote needs a named drug and credible source before publication; use general interaction copy meanwhile. Describe individualization as “one formula doesn’t fit every patient,” not a claim that every patient requires a unique formula.
- Present the free electrolyte download under the guide's Electrolytes (Chapters 5–11) section. The supplied file has 29 physical PDF pages, including self-assessment questions/answers and contents/appendices listings, not the full text of those chapters; do not claim it contains all seven chapters or present it as a separate title. A previous eight-page description was incorrect.
- The supplied full-book PDF is not encrypted or permission-restricted despite any "ReadOnly" filename. Do not put the full PDF in public web assets or claim it is protected; Gumroad watermarking is expected to be applied on upload, not by this site.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
