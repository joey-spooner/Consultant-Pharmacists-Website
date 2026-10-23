import type { ReactNode } from 'react';

// Small safe renderer for constrained markdown: headings, paragraphs, nested lists,
// **bold**, *italic*, [links](http/mailto), trailing backslash line breaks.
function inline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${key}-${i++}`;
    if (m[1] !== undefined) out.push(<strong key={k}>{inline(m[1], k)}</strong>);
    else if (m[2] !== undefined) out.push(<em key={k}>{inline(m[2], k)}</em>);
    else if (/^(https?:|mailto:)/i.test(m[4])) out.push(<a key={k} href={m[4]}>{m[3]}</a>);
    else out.push(m[3]);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function lines(text: string, key: string): ReactNode[] {
  const parts = text.split(/\\\n|\s{2,}\n/);
  return parts.flatMap((p, i) => (i < parts.length - 1 ? [...inline(p, `${key}-${i}`), <br key={`${key}-br${i}`} />] : inline(p, `${key}-${i}`)));
}

type Item = { text: string; ordered: boolean; children: Item[] };
const itemRe = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;

function buildList(rows: { indent: number; ordered: boolean; text: string }[]): Item[] {
  const root: Item[] = [];
  const stack: { indent: number; list: Item[] }[] = [{ indent: -1, list: root }];
  for (const r of rows) {
    while (stack.length > 1 && r.indent <= stack[stack.length - 1].indent) stack.pop();
    const item: Item = { text: r.text, ordered: r.ordered, children: [] };
    stack[stack.length - 1].list.push(item);
    stack.push({ indent: r.indent, list: item.children });
  }
  return root;
}

function renderList(items: Item[], key: string): ReactNode {
  const Tag = items[0]?.ordered ? 'ol' : 'ul';
  return (
    <Tag key={key}>
      {items.map((it, i) => (
        <li key={`${key}-${i}`}>
          {lines(it.text, `${key}-${i}`)}
          {it.children.length > 0 && renderList(it.children, `${key}-${i}-c`)}
        </li>
      ))}
    </Tag>
  );
}

export function Markdown({ source }: { source: string }) {
  const src = source.replace(/\r\n?/g, '\n').split('\n');
  const nodes: ReactNode[] = [];
  let i = 0;
  let n = 0;
  while (i < src.length) {
    const line = src[i];
    if (!line.trim()) { i++; continue; }
    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) {
      const level = Math.max(2, h[1].length);
      const Tag = `h${level}` as 'h2';
      nodes.push(<Tag key={`b${n++}`}>{inline(h[2], `h${n}`)}</Tag>);
      i++;
      continue;
    }
    if (itemRe.test(line)) {
      const rows: { indent: number; ordered: boolean; text: string }[] = [];
      while (i < src.length) {
        const m = itemRe.exec(src[i]);
        if (m) {
          rows.push({ indent: m[1].replace(/\t/g, '    ').length, ordered: /\d/.test(m[2]), text: m[3] });
          i++;
        } else if (src[i].trim() && /^\s+\S/.test(src[i]) && rows.length) {
          rows[rows.length - 1].text += `\n${src[i].trim()}`;
          i++;
        } else break;
      }
      nodes.push(renderList(buildList(rows), `l${n++}`));
      continue;
    }
    const buf: string[] = [];
    while (i < src.length && src[i].trim() && !/^#{1,6}\s/.test(src[i]) && !itemRe.test(src[i])) buf.push(src[i++]);
    nodes.push(<p key={`b${n++}`}>{lines(buf.join('\n'), `p${n}`)}</p>);
  }
  return <>{nodes}</>;
}
