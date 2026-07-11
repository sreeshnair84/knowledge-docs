#!/usr/bin/env node
/** Create a deterministic health report for the Markdown knowledge corpus. */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outputIndex = process.argv.indexOf('--output');
const output = outputIndex >= 0 ? process.argv[outputIndex + 1] : null;
const docs = path.join(root, 'docs');
const sidebar = fs.readFileSync(path.join(root, 'sidebars.js'), 'utf8');
const required = new Set(['title', 'date_created', 'last_reviewed', 'status', 'source_type', 'source_file', 'doc_type', 'tags']);
const findings = new Map();
const titles = new Map();
const types = new Map();
const tags = new Map();

function add(kind, item) { if (!findings.has(kind)) findings.set(kind, []); findings.get(kind).push(item); }
function increment(map, key) { map.set(key, (map.get(key) ?? 0) + 1); }
function collect(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? collect(full) : (entry.isFile() && entry.name.endsWith('.md') ? [full] : []);
  });
}
function frontmatter(text) {
  const match = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n/);
  if (!match) return {};
  return Object.fromEntries(match[1].split(/\r?\n/).flatMap((line) => {
    const i = line.indexOf(':');
    return i > 0 && !line.trimStart().startsWith('#') ? [[line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')]] : [];
  }));
}

const pages = collect(docs);
for (const page of pages) {
  const relative = path.relative(root, page).split(path.sep).join('/');
  const docId = path.relative(docs, page).replace(/\\/g, '/').replace(/\.md$/, '');
  const text = fs.readFileSync(page, 'utf8');
  const meta = frontmatter(text);
  if (!Object.keys(meta).length) add('missing_frontmatter', { file: relative });
  else {
    const missing = [...required].filter((key) => !(key in meta)).sort();
    if (missing.length) add('incomplete_frontmatter', { file: relative, missing });
    if (meta.title) { const key = meta.title.toLowerCase(); titles.set(key, [...(titles.get(key) ?? []), relative]); }
    else add('missing_title', { file: relative });
    if (meta.doc_type) increment(types, meta.doc_type);
    for (const tag of (meta.tags?.match(/[\w-]+/g) ?? [])) increment(tags, tag.toLowerCase());
  }
  const headings = [...text.matchAll(/^(#{1,6})\s+(.+?)\s*$/gm)].map((m) => [m[1].length, m[2]]);
  if (!headings.length || headings[0][0] !== 1) add('invalid_h1', { file: relative });
  for (let i = 1; i < headings.length; i += 1) if (headings[i][0] > headings[i - 1][0] + 1) add('heading_level_jump', { file: relative, heading: headings[i][1], from: headings[i - 1][0], to: headings[i][0] });
  if ((text.match(/```/g) ?? []).length % 2) add('unclosed_fence', { file: relative });
  if (/\n{5,}/.test(text)) add('excessive_blank_lines', { file: relative });
  if (/<iframe/i.test(text)) add('iframe_embed', { file: relative });
  if (!sidebar.includes(`'${docId}'`) && !sidebar.includes(`\"${docId}\"`)) add('sidebar_orphan_candidate', { file: relative, doc_id: docId });
  for (const match of text.matchAll(/(?<!!)\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].split('#')[0].trim();
    if (target && !/^(https?:|mailto:|#|\/)/.test(target) && !target.includes('://') && !fs.existsSync(path.resolve(path.dirname(page), target))) add('broken_relative_link', { file: relative, target });
  }
}
for (const [title, files] of titles) if (files.length > 1) add('duplicate_title', { title, files });
const asObject = (map) => Object.fromEntries([...map].sort(([a], [b]) => a.localeCompare(b)));
const report = {
  generated: new Date().toISOString().slice(0, 10), pages_scanned: pages.length,
  document_types: asObject(types), top_tags: [...tags].sort((a, b) => b[1] - a[1]).slice(0, 30),
  findings: asObject(findings), summary: asObject(new Map([...findings].map(([key, value]) => [key, value.length]))),
};
const payload = `${JSON.stringify(report, null, 2)}\n`;
if (output) fs.writeFileSync(path.resolve(root, output), payload); else process.stdout.write(payload);
