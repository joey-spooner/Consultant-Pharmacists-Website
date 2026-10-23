import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { after, before, test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = await readFile(new URL('../src/site/sample-qa.md', import.meta.url), 'utf8');
const normalizedSource = source.replace(/\r\n/g, '\n');
const sourceLines = normalizedSource.trimEnd().split('\n');
const firstQuestion = sourceLines.findIndex(line => line.startsWith('1. '));
const editorialHeader = sourceLines.slice(0, firstQuestion).filter(Boolean);
// Independent, line-based oracle: do not use the production parser to construct
// expected output. The digest pins the current client wording AND editorial
// notes; only deliberately reviewed source edits should update this value.
const approvedSourceDigest = 'dbb582d9c25664de4abe59c874a7d5ff05ae2de3a04342650d3758fda217333f';
const expected = sourceLines.slice(firstQuestion).join('\n').split('\n\n').map((block, index) => {
  const lines = block.split('\n');
  assert.equal(lines.length, 2, `Source pair ${index + 1} must have two lines`);
  assert.ok(lines[0].startsWith(`${index + 1}. `));
  assert.ok(lines[0].endsWith('\\'));
  assert.ok(lines[1].startsWith('**Answer:** '));
  return {
    number: index + 1,
    question: lines[0].slice(`${index + 1}. `.length, -1),
    answer: lines[1].slice('**Answer:** '.length),
  };
});

let server;
let components;
let parseSampleQa;
let events;

before(async () => {
  // Vite loads the real TSX, raw Markdown and supporting modules. Exports and
  // an analytics spy exist only inside this test server, never in the app.
  server = await createServer({
    root,
    configFile: false,
    appType: 'custom',
    server: { middlewareMode: true, watch: null, hmr: false },
    optimizeDeps: { noDiscovery: true, entries: [] },
    esbuild: { jsx: 'automatic' },
    plugins: [{
      name: 'sample-qa-regression-harness',
      transform(code, id) {
        if (id.endsWith('/src/site/SitePage.tsx')) {
          return `${code}\nexport { Home, SampleQa, Det };`;
        }
        if (id.endsWith('/src/site/analytics.ts')) {
          return 'export const events = []; export function trackEvent(name) { events.push(name); }';
        }
      },
    }],
  });
  components = await server.ssrLoadModule('/src/site/SitePage.tsx');
  ({ parseSampleQa } = await server.ssrLoadModule('/src/site/sample-qa.ts'));
  ({ events } = await server.ssrLoadModule('/src/site/analytics.ts'));
});

after(async () => { await server?.close(); });

function textMarkup(value) {
  return renderToStaticMarkup(createElement('p', null, value));
}

test('the Markdown retains the baseline source wording and editorial notes', () => {
  assert.equal(createHash('sha256').update(normalizedSource).digest('hex'), approvedSourceDigest,
    'The Calcium source changed. Review the wording before updating this baseline.');
  assert.equal(expected.length, 36);
  assert.equal(editorialHeader.length, 3);
  assert.match(editorialHeader[1], /Sample Self Assessment - Calcium\.rtf/);
  assert.match(editorialHeader[2], /Two spelling corrections.*need his OK/);
  assert.match(editorialHeader[2], /"Chovstek".*"Chvostek".*"anerobically".*"anaerobically"/);
});

test('all 36 rendered list items contain the exact question followed by its exact answer', () => {
  const markup = renderToStaticMarkup(createElement(components.SampleQa));
  assert.match(markup, /^<ol style="list-style-type:decimal">/);
  const items = [...markup.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)];
  assert.equal(items.length, 36);
  expected.forEach(({ question, answer }, index) => {
    const answerMarkup = renderToStaticMarkup(createElement('p', null,
      createElement('strong', null, 'Answer:'), ' ', answer));
    assert.equal(items[index][1], textMarkup(question) + answerMarkup, `Rendered pair ${index + 1}`);
    // Internal spaces, blanks, ® and punctuation must survive display.
    assert.match(items[index][0], /white-space:pre-wrap/);
  });
});

test('editorial title, attribution and spelling approval notes never appear in the displayed sample', () => {
  const markup = renderToStaticMarkup(createElement(components.SampleQa));
  for (const line of editorialHeader) {
    assert.ok(!markup.includes(textMarkup(line).slice(3, -4)), `Leaked editorial line: ${line}`);
  }
  assert.doesNotMatch(markup, /Sample Self Assessment - Calcium\.rtf|Two spelling corrections|Chovstek|anerobically/);
});

test('the Q&A follows the sample chapter, with PDF samples before the preface', () => {
  const home = renderToStaticMarkup(createElement(components.Home));
  const panels = [...home.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/g)];
  const labels = panels.map(panel => panel[1].match(/^<summary>(.*?)<\/summary>/)[1]);
  const index = labels.indexOf('Sample Q&amp;A: Calcium (Chapter 5 self assessment)');
  assert.ok(index > 0);
  assert.equal(labels.filter(label => label === labels[index]).length, 1);
  assert.equal(labels[index - 1], 'Sample chapter: Calcium (Chapter 5)');
  assert.equal(labels[index + 1], 'Sample: TPN Virtual Handbook, 50 daily monitoring parameters');
  assert.equal(labels[index + 2], 'Sample appendix: Common lab reference values (Appendix J)');
  assert.equal(labels[index + 3], 'Preface and full contents');
  assert.equal((panels[index][1].match(/<li\b/g) || []).length, 36);
  assert.ok(panels[index][1].includes(renderToStaticMarkup(createElement(components.SampleQa))));
  assert.doesNotMatch(panels[index][0].split('>')[0], /\bopen\b/);
});

function findElements(element, predicate) {
  if (Array.isArray(element)) return element.flatMap(child => findElements(child, predicate));
  if (!element || typeof element !== 'object') return [];
  return [
    ...(predicate(element) ? [element] : []),
    ...findElements(element.props?.children, predicate),
  ];
}

test('the existing Det emits open_sample_qa on opening, never on render or closing', () => {
  events.length = 0;
  const panels = findElements(components.Home(), element =>
    element.type === components.Det && element.props.label === 'Sample Q&A: Calcium (Chapter 5 self assessment)');
  assert.equal(panels.length, 1);
  assert.equal(panels[0].props.event, 'open_sample_qa');
  const details = components.Det(panels[0].props);
  assert.equal(details.type, 'details');
  assert.deepEqual(events, []);
  details.props.onToggle({ currentTarget: { open: false } });
  assert.deepEqual(events, []);
  details.props.onToggle({ currentTarget: { open: true } });
  assert.deepEqual(events, ['open_sample_qa']);
  details.props.onToggle({ currentTarget: { open: false } });
  assert.deepEqual(events, ['open_sample_qa']);
  details.props.onToggle({ currentTarget: { open: true } });
  assert.deepEqual(events, ['open_sample_qa', 'open_sample_qa']);
});

test('the parser preserves every source character and supports CRLF', () => {
  assert.deepEqual(parseSampleQa(source), expected);
  assert.deepEqual(parseSampleQa(normalizedSource.replace(/\n/g, '\r\n')), expected);
});

const firstBlock = sourceLines.slice(firstQuestion, firstQuestion + 2).join('\n');
const secondBlock = sourceLines.slice(firstQuestion + 3, firstQuestion + 5).join('\n');
const invalidSources = {
  'empty sample': '',
  'header only': editorialHeader.join('\n'),
  'missing question and answer': normalizedSource.replace(`${firstBlock}\n\n`, ''),
  'missing answer': normalizedSource.replace(/^\*\*Answer:\*\* .*\n/m, ''),
  'empty answer': normalizedSource.replace(/^\*\*Answer:\*\* .*/m, '**Answer:** '),
  'whitespace-only answer': normalizedSource.replace(/^\*\*Answer:\*\* .*/m, '**Answer:**    '),
  'wrong answer marker': normalizedSource.replace('**Answer:**', '**Response:**'),
  'empty question': normalizedSource.replace(/^1\. .*$/m, '1. \\'),
  'whitespace-only question': normalizedSource.replace(/^1\. .*$/m, '1.    \\'),
  'missing question line break marker': normalizedSource.replace(/^1\. (.*)\\$/m, '1. $1'),
  'duplicate question number': normalizedSource.replace(/^2\. /m, '1. '),
  'skipped question number': normalizedSource.replace(/^2\. /m, '3. '),
  'reordered question pairs': normalizedSource.replace(`${firstBlock}\n\n${secondBlock}`, `${secondBlock}\n\n${firstBlock}`),
  'answer before question': normalizedSource.replace(firstBlock, firstBlock.split('\n').reverse().join('\n')),
  'missing last answer': normalizedSource.replace(/^\*\*Answer:\*\* alkalinizers\n?$/m, ''),
  'extra question and answer': `${normalizedSource}\n37. Extra question\\\n**Answer:** Extra answer\n`,
  'extra orphan answer': `${normalizedSource}\n**Answer:** Orphan answer\n`,
  'malformed extra pair': `${normalizedSource}\n37. Invalid question\n**Answer:** \n`,
};

for (const [name, invalidSource] of Object.entries(invalidSources)) {
  test(`invalid input fails explicitly: ${name}`, () => {
    assert.throws(() => parseSampleQa(invalidSource),
      /The Calcium sample must contain 36 consecutive questions with answers\./);
  });
}
