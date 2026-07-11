#!/usr/bin/env node
/** Build a compact, machine-readable navigation and relationship index. */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outputAt = process.argv.indexOf('--output');
const output = path.resolve(root, outputAt >= 0 ? process.argv[outputAt + 1] : '_meta/knowledge-index.json');
const docs = path.join(root, 'docs');
const indexes = { folders: {}, doc_types: {}, tags: {} };
const documents = {};
const add = (index, key, value) => { if (!key) return; (index[key] ??= []).push(value); };
const collect = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? collect(path.join(dir, e.name)) : (e.name.endsWith('.md') ? [path.join(dir, e.name)] : []));
const parseMeta = (text) => {
  const block = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n/);
  if (!block) return {};
  return Object.fromEntries(block[1].split(/\r?\n/).flatMap((line) => {
    const i = line.indexOf(':');
    return i > 0 ? [[line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')]] : [];
  }));
};
const normalize = (id) => id.split('/').map((part) => part.replace(/^\d+[-_]/, '')).join('/');
const candidates = new Map();
for (const page of collect(docs)) {
  const id = path.relative(docs, page).replace(/\\/g, '/').replace(/\.md$/, '');
  candidates.set(id, id); candidates.set(normalize(id), id);
}
for (const page of collect(docs)) {
  const id = path.relative(docs, page).replace(/\\/g, '/').replace(/\.md$/, '');
  const text = fs.readFileSync(page, 'utf8');
  const meta = parseMeta(text);
  const folder = path.dirname(id) === '.' ? '' : path.dirname(id);
  const outgoing = [];
  for (const match of text.replace(/```[\s\S]*?```/g, '').matchAll(/(?<!!)\[[^\]]*\]\(([^)#]+)(?:#[^)]+)?\)/g)) {
    const link = match[1].trim();
    if (/^(https?:|mailto:|\/)/.test(link)) continue;
    const local = path.posix.normalize(path.posix.join(folder, link.replace(/\.md$/, ''))).replace(/^\.\//, '');
    const target = candidates.get(local) ?? candidates.get(normalize(local));
    if (target && target !== id && !outgoing.includes(target)) outgoing.push(target);
  }
  const tags = meta.tags?.match(/[\w-]+/g)?.map((tag) => tag.toLowerCase()) ?? [];
  documents[id] = { title: meta.title ?? path.basename(id), folder, doc_type: meta.doc_type ?? null, tags, status: meta.status ?? null, last_reviewed: meta.last_reviewed ?? null, outgoing };
  add(indexes.folders, folder, id); add(indexes.doc_types, meta.doc_type, id); tags.forEach((tag) => add(indexes.tags, tag, id));
}
for (const index of Object.values(indexes)) for (const ids of Object.values(index)) ids.sort();
const inbound = Object.fromEntries(Object.keys(documents).map((id) => [id, []]));
for (const [id, record] of Object.entries(documents)) record.outgoing.forEach((target) => inbound[target].push(id));
for (const [id, record] of Object.entries(documents)) record.inbound = inbound[id].sort();
fs.writeFileSync(output, `${JSON.stringify({ generated: new Date().toISOString().slice(0, 10), documents, indexes }, null, 2)}\n`);
