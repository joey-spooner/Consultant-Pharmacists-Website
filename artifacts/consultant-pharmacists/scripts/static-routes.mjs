import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// GitHub Pages serves folders directly, without an SPA fallback.
// Write one HTML shell per route so direct loads and social previews have
// route-specific metadata before React starts. The content is still client-rendered.
const output = fileURLToPath(new URL('../dist/public/', import.meta.url));
const basePath = `${(process.env.BASE_PATH || '/').replace(/\/+$/, '')}/`;
const siteUrl = process.env.SITE_URL || 'https://consultant-pharmacists-website.replit.app';
const rootUrl = new URL(basePath, `${siteUrl.replace(/\/+$/, '')}/`);
const imageUrl = new URL('og-preview.png', rootUrl).href;
const shell = await readFile(path.join(output, 'index.html'), 'utf8');

const pages = [
  {
    route: 'join',
    robots: 'noindex, nofollow',
    title: 'Join the call | Consultant Pharmacists of America',
    description: 'Join the call with Consultant Pharmacists of America.',
  },
  {
    route: '',
    title: 'Clinical Guide to Parenteral Micronutrition — Enhanced Third Edition | Consultant Pharmacists of America',
    description: 'Compatibility, dosing and monitoring for every TPN micronutrient, in one reference you can search. For multidiscipline clinical nutritionists, particularly hospital and home nutrition teams.',
    image: 'option-c-cover.png',
  },
  {
    route: 'option-c',
    canonicalRoute: '',
    title: 'Clinical Guide to Parenteral Micronutrition — Enhanced Third Edition | Consultant Pharmacists of America',
    description: 'Compatibility, dosing and monitoring for every TPN micronutrient, in one reference you can search. For multidiscipline clinical nutritionists, particularly hospital and home nutrition teams.',
    image: 'option-c-cover.png',
  },
  {
    route: 'option-c/contact',
    title: 'Contact and Classroom Pricing | Consultant Pharmacists of America',
    description: 'Contact Consultant Pharmacists of America about clinical consultation, healthcare writing, and classroom pricing.',
    image: 'option-c-cover.png',
  },
  {
    route: 'option-c/webinars',
    title: 'Clinical Webinar Topics | Consultant Pharmacists of America',
    description: 'Explore the complete clinical nutrition, parenteral nutrition, and pharmacy education topic catalog.',
    image: 'option-c-cover.png',
  },
  {
    route: 'cv',
    title: 'Thomas G. Baumgartner — Curriculum Vitae | Consultant Pharmacists of America',
    description: 'Curriculum vitae of Thomas G. Baumgartner, Pharm.D., M.Ed., FASHP, FASPEN, R.Ph., President and CEO of Consultant Pharmacists of America.',
    image: 'option-c-baumgartner.jpg',
  },
  {
    route: 'option-c/cv',
    canonicalRoute: 'cv',
    title: 'Thomas G. Baumgartner — Curriculum Vitae | Consultant Pharmacists of America',
    description: 'Curriculum vitae of Thomas G. Baumgartner, Pharm.D., M.Ed., FASHP, FASPEN, R.Ph., President and CEO of Consultant Pharmacists of America.',
    image: 'option-c-baumgartner.jpg',
  },
];
const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`Missing required SEO tag: ${pattern}`);
  return html.replace(pattern, replacement);
}
function renderPage(page) {
  const route = page.canonicalRoute ?? page.route;
  const url = new URL(route ? `${route}/` : '', rootUrl).href;
  const pageImageUrl = page.image ? new URL(page.image, rootUrl).href : imageUrl;
  let html = shell;
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = replaceTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${escapeHtml(url)}" />`);
  html = replaceTag(html, /<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${page.robots ?? (page.route === '' ? 'index, follow' : 'noindex, follow')}" />`);
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
// GitHub Pages has no configurable HTTP redirects. These tiny documents use
// location.replace, a no-script meta refresh, and a normal fallback link.
function redirectPage(target) {
  const url = new URL(target, rootUrl).href;
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, follow"><title>Consultant Pharmacists of America</title><link rel="canonical" href="${escapeHtml(url)}"><meta http-equiv="refresh" content="0; url=${escapeHtml(url)}"><script>location.replace(${JSON.stringify(url)});</script></head><body><a href="${escapeHtml(url)}">Continue to Consultant Pharmacists of America</a></body></html>`;
}
const redirects = [
  ['contact', 'option-c/contact/'],
  ...['option-a', 'option-a/about', 'option-a/client-relationships',
    'option-a/webinars', 'option-a/contact', 'single-page',
    'about', 'client-relationships', 'webinars'].map(route => [route, '']),
];
for (const [route, target] of redirects) {
  const directory = path.join(output, route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), redirectPage(target));
}
// Unknown/deeper legacy addresses also return to the selected homepage.
await writeFile(path.join(output, '404.html'), redirectPage(''));
await writeFile(path.join(output, '.nojekyll'), '');
const urls = ['', 'option-c/webinars/', 'option-c/contact/', 'cv/']
  .map(route => `  <url><loc>${new URL(route, rootUrl).href}</loc></url>`).join('\n');
await writeFile(path.join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await writeFile(path.join(output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', rootUrl).href}\n`);
console.log(`Generated ${pages.length} page shells and ${redirects.length} redirects for ${rootUrl.href}`);