import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Module-level cache so we only fetch graph-related.json once per session.
let _cache = null;
let _pending = null;

function fetchGraph(url) {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (_cache) return Promise.resolve(_cache);
  if (!_pending) {
    _pending = fetch(url)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(data => { _cache = data; return data; })
      .catch(() => { _pending = null; return null; });
  }
  return _pending;
}

function idToPath(id, baseUrl) {
  if (id === 'index') return baseUrl;
  const clean = id.endsWith('/index') ? id.slice(0, -6) : id;
  return `${baseUrl}${clean}`;
}

export default function RelatedPages() {
  const { siteConfig: { baseUrl } } = useDocusaurusContext();
  const { pathname } = useLocation();
  const [related, setRelated] = useState(null);

  const docId = pathname.startsWith(baseUrl)
    ? pathname.slice(baseUrl.length).replace(/\/$/, '') || 'index'
    : null;

  useEffect(() => {
    if (!docId) { setRelated([]); return; }
    fetchGraph(`${baseUrl}graph-related.json`).then(graph => {
      if (!graph) { setRelated([]); return; }
      const hits = graph[docId] || graph[`${docId}/index`] || [];
      setRelated(hits.slice(0, 5));
    });
  }, [docId, baseUrl]);

  if (!related || related.length === 0) return null;

  return (
    <div className="related-pages">
      <div className="related-pages__heading">Related Pages</div>
      <ul className="related-pages__list">
        {related.map(r => (
          <li key={r.id}>
            <Link to={idToPath(r.id, baseUrl)}>{r.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
