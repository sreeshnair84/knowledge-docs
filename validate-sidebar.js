const s = require('./sidebars.js');
const fs = require('fs');
const path = require('path');

const idMap = {};

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { scanDir(full); continue; }
    if (!entry.name.endsWith('.md')) continue;
    const rel = full.split(path.sep).join('/').replace('docs/', '').replace(/\.md$/, '');
    idMap[rel] = true;
    // Docusaurus strips leading numeric prefix (digit followed by - or _) segment by segment
    const stripped = rel.replace(/(\/|^)\d+[_-]/g, '$1');
    if (stripped !== rel) idMap[stripped] = true;
  }
}
scanDir('docs');

function extractIds(items) {
  const ids = [];
  for (const item of items) {
    if (typeof item === 'string') ids.push(item);
    else if (item.type === 'doc') ids.push(item.id);
    else if (item.type === 'category' && item.items) ids.push(...extractIds(item.items));
    if (item && item.link && item.link.id) ids.push(item.link.id);
  }
  return ids;
}

const ids = extractIds(s.tutorialSidebar);
const missing = ids.filter(id => !idMap[id]);

if (missing.length === 0) {
  console.log('ALL ' + ids.length + ' doc IDs resolve correctly.');
} else {
  console.log('TRULY MISSING (' + missing.length + '):');
  missing.forEach(m => console.log('  ' + m));
}
