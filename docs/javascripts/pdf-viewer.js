---
title: "Pdf Viewer"
date_created: 2026-06-13
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["javascripts", "pdf-viewer.js"]
---

/**
 * On mobile devices, PDF iframes render poorly (single page, no scroll).
 * This script injects a Google Docs Viewer iframe on mobile for PDFs,
 * and a direct-open button as fallback.
 */
document.addEventListener('DOMContentLoaded', function () {
  var isMobile = window.innerWidth < 768;

  document.querySelectorAll('details').forEach(function (details) {
    var iframe = details.querySelector('iframe');
    if (!iframe) return;

    var src = iframe.getAttribute('src') || '';
    var isPDF = src.toLowerCase().includes('.pdf');

    if (isPDF) {
      // Build absolute URL for the PDF
      var absURL = new URL(src, window.location.href).href;

      // Inject a visible "Open PDF" button for mobile
      var btn = document.createElement('a');
      btn.href = absURL;
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
      btn.className = 'pdf-open-btn';
      btn.textContent = 'Open PDF \u2197';
      iframe.parentNode.insertBefore(btn, iframe.nextSibling);

      // On mobile: swap iframe src to Google Docs Viewer for full multi-page view
      if (isMobile) {
        var gdocsURL = 'https://docs.google.com/viewer?url=' +
          encodeURIComponent(absURL) + '&embedded=true';
        iframe.setAttribute('src', gdocsURL);
        iframe.style.display = 'block';
        iframe.style.height = '75vh';
      }
    }
  });
});
