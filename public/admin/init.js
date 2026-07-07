(() => {
  const PREVIEW_CSS_URL = '/admin/preview.css?v=20260707-1415';
  const EDITOR_FONT = 'var(--vjnl-admin-font-mono)';
  const FALLBACK_STYLE = `
html, body {
  width: 100% !important;
  max-width: 100% !important;
  overflow-x: hidden !important;
}
img, picture img, figure img, .feature-image, [class*="feature-image"], [class*="featureImage"] {
  display: block !important;
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
}
`;

  const RICH_TEXT_SELECTORS = [
    "[data-slate-editor='true']",
    "[data-plate-editor='true']",
    "[contenteditable='true'][role='textbox']",
    "[class*='RichTextControl'] [contenteditable='true']",
  ].join(',');

  function registerPreviewStyle() {
    if (window.CMS && typeof window.CMS.registerPreviewStyle === 'function') {
      try {
        window.CMS.registerPreviewStyle(PREVIEW_CSS_URL);
      } catch (_error) {
        /* no-op */
      }
      return true;
    }
    return false;
  }

  function enforceRichTextFont(root = document) {
    const editors = root.querySelectorAll(RICH_TEXT_SELECTORS);
    editors.forEach((editor) => {
      editor.style.setProperty('font-family', EDITOR_FONT, 'important');
      editor
        .querySelectorAll('p,span,div,li,blockquote,h1,h2,h3,h4,h5,h6,a,em,strong,code,pre')
        .forEach((node) => node.style.setProperty('font-family', EDITOR_FONT, 'important'));
    });
  }

  function injectIntoFrame(frame) {
    let doc;
    try {
      doc = frame.contentDocument;
    } catch (_error) {
      return;
    }

    if (!doc || !doc.head) return;

    if (!doc.querySelector('link[data-vjnl-preview-css="1"]')) {
      const link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = PREVIEW_CSS_URL;
      link.setAttribute('data-vjnl-preview-css', '1');
      doc.head.appendChild(link);
    }

    if (!doc.querySelector('style[data-vjnl-preview-fallback="1"]')) {
      const style = doc.createElement('style');
      style.setAttribute('data-vjnl-preview-fallback', '1');
      style.textContent = FALLBACK_STYLE;
      doc.head.appendChild(style);
    }
  }

  function bindFrames() {
    const frames = document.querySelectorAll('iframe');
    frames.forEach((frame) => {
      if (!frame.dataset.vjnlPreviewBound) {
        frame.dataset.vjnlPreviewBound = '1';
        frame.addEventListener('load', () => injectIntoFrame(frame));
      }
      injectIntoFrame(frame);
    });
  }

  function start() {
    registerPreviewStyle();
    bindFrames();
    enforceRichTextFont();

    const retries = 40;
    let count = 0;
    const interval = setInterval(() => {
      registerPreviewStyle();
      bindFrames();
      enforceRichTextFont();
      count += 1;
      if (count >= retries) {
        clearInterval(interval);
      }
    }, 500);

    const observer = new MutationObserver(() => {
      bindFrames();
      enforceRichTextFont();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
