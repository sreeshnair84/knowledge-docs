#!/usr/bin/env node
/** Portable, universal pre-commit validation for staged Markdown pages. */
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const changed = git('diff', '--cached', '--name-only');
if (!changed) process.exit(0);
const staged = git('diff', '--cached', '--name-only', '--diff-filter=ACM', '--', 'docs/*.md', 'docs/**/*.md')
  .split(/\r?\n/).filter(Boolean);

const required = ['title', 'date_created', 'last_reviewed', 'status', 'source_type', 'source_file', 'tags'];
let failed = false, titleMismatches = 0;
for (const file of staged) {
  const text = git('show', `:${file}`);
  const match = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n/);
  const issues = [];
  if (!match) issues.push('missing frontmatter');
  const meta = Object.fromEntries((match?.[1] ?? '').split(/\r?\n/).flatMap((line) => {
    const i = line.indexOf(':'); return i > 0 ? [[line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')]] : [];
  }));
  for (const field of required) if (!(field in meta)) issues.push(`missing '${field}'`);
  const h1 = text.slice(match?.[0].length ?? 0).match(/^#\s+(.+?)\s*$/m);
  if (!h1) issues.push('missing H1');
  else if (meta.title && h1[1].replace(/^['"]|['"]$/g, '') !== meta.title) titleMismatches += 1;
  if (/<iframe[^>]+src=["'][^"']*\.pdf/i.test(text)) issues.push('embedded PDF iframe');
  if ((text.match(/```/g) ?? []).length % 2) issues.push('unclosed code fence');
  if (issues.length) { failed = true; console.error(`\n${file}\n  - ${issues.join('\n  - ')}`); }
}
if (failed) { console.error('\nPre-commit checks failed. Fix the listed universal publishing issues.'); process.exit(1); }
console.log(`knowledge-repo pre-commit: ${staged.length} Markdown file(s) pass universal validation.${titleMismatches ? ` ${titleMismatches} title/H1 mismatches remain in the quality-review queue.` : ''}`);
const docusaurus = path.join('node_modules', '@docusaurus', 'core', 'bin', 'docusaurus.mjs');
if (!existsSync(docusaurus)) {
  console.error(`Pre-commit build check cannot run: ${docusaurus} is missing. Install dependencies first.`);
  process.exit(1);
}
console.log('knowledge-repo pre-commit: running production build...');
const build = spawnSync(process.execPath, [docusaurus, 'build'], { stdio: 'inherit' });
if (build.status !== 0) process.exit(build.status ?? 1);
console.log('knowledge-repo pre-commit: production build passed.');
