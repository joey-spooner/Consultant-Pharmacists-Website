import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// GitHub Pages serves folders at /about/, not an SPA fallback at /about.
// Write one HTML shell per route so direct loads and social previews have
// route-specific metadata before React starts. The content is still client-rendered.
const output = fileURLToPath(new URL('../dist/public/', import.meta.url));
const basePath = process.env.BASE_PATH || '/';
const siteUrl = process.env.SITE_URL || 'https://consultant-pharmacists-website.replit.app';
const rootUrl = new URL(basePath, `${siteUrl.replace(/\/+$/, '')}/`);
const imageUrl = new URL('og-preview.png', rootUrl).href;
const shell = await readFile(path.join(output, 'index.html'), 'utf8');

const pages = [
  {
    route: '',
    title: 'Consultant Pharmacists of America | Clinical Advisory',
    description: 'Independent clinical pharmacy and nutrition advisory services from Dr. Thomas G. Baumgartner, with expertise in parenteral nutrition and micronutrition.',
  },
  {
    route: 'about',
    title: 'About Dr. Baumgartner | Consultant Pharmacists of America',
    description: 'Explore Dr. Thomas G. Baumgartner’s credentials, professional recognition, and more than 30 years of clinical pharmacy experience.',
  },
  {
    route: 'client-relationships',
    title: 'Client Relationships | Consultant Pharmacists of America',
    description: 'Learn about the healthcare, pharmacy, institutional, and private-patient settings served by Consultant Pharmacists of America.',
  },
  {
    route: 'webinars',
    title: 'Clinical Webinars | Consultant Pharmacists of America',
    description: 'Browse clinical nutrition, parenteral nutrition, and pharmacy education topics from Dr. Thomas G. Baumgartner.',
  },
  {
    route: 'contact',
    title: 'Contact | Consultant Pharmacists of America',
    description: 'Contact Consultant Pharmacists of America about clinical consultation, medico-legal expertise, healthcare writing, and guest speaking.',
  },
  {
    route: 'single-page',
    title: 'The Clinical Guide to Parenteral Micronutrition | Consultant Pharmacists of America',
    description: 'A practical clinical reference for hospital and home nutrition teams, by pharmacist educator Dr. Thomas G. Baumgartner. Get the Kindle edition or the free Chapters 5–11 self-assessment.',
    image: 'parenteral-micronutrition-cover-enhanced.jpg',
  },
];

const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`Missing required SEO tag: ${pattern}`);
  return html.replace(pattern, replacement);
}
function renderPage(page) {
  const url = new URL(page.route ? `${page.route}/` : '', rootUrl).href;
  const pageImageUrl = page.image ? new URL(page.image, rootUrl).href : imageUrl;
  let html = shell;
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = replaceTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${escapeHtml(url)}" />`);
  for (const [selector, content] of [
    ['name="description"', page.description],
    ['property="og:title"', page.title],
    ['property="og:description"', page.description],
    ['property="og:url"', url],
    ['property="og:image"', pageImageUrl],
    ['name="twitter:title"', page.title],
    ['name="twitter:description"', page.description],
    ['name="twitter:image"', pageImageUrl],
  ]) {
    const pattern = new RegExp(`<meta ${selector} content="[^"]*" \\/>`);
    html = replaceTag(html, pattern, `<meta ${selector} content="${escapeHtml(content)}" />`);
  }
  return html;
}

for (const page of pages) {
  const directory = path.join(output, page.route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), renderPage(page));
}
const urls = pages.map(page => `  <url><loc>${new URL(page.route ? `${page.route}/` : '', rootUrl).href}</loc></url>`).join('\n');
await writeFile(path.join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await writeFile(path.join(output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', rootUrl).href}\n`);
console.log(`Generated ${pages.length} static route shells for ${rootUrl.href}`);