#!/usr/bin/env node
/** Portable, universal pre-commit validation for staged Markdown pages. */
import { execFileSync } from 'node:child_process';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const staged = git('diff', '--cached', '--name-only', '--diff-filter=ACM', '--', 'docs/*.md', 'docs/**/*.md')
  .split(/\r?\n/).filter(Boolean);
if (!staged.length) process.exit(0);

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
