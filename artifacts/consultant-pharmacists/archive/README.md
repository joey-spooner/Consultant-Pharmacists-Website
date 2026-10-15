# Archived website designs

The previous multi-page and single-page designs are preserved under `src/`,
with their original components, styles and review banner. The active entry
point does not import this directory. Tailwind scans only the active `src/`,
TypeScript includes only the active `src/`, and Vite publishes only bundled
dependencies and `public/`, so this archive is not part of the published site.

To restore a design later, copy its files to their original `src/` locations,
restore its routes and static page shells, and restore any required global
styles from `src/index.css` here. The shared webinar data remains in the active
`src/data/` because the selected design also uses it.
