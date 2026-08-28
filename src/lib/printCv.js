import { collectCvCssRules } from './collectCvCss';

const PRINT_CSS = `
  *, *::before, *::after { box-sizing: border-box; }

  html {
    font-size: 13px;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: #ffffff;
    color: #1c1917;
    font-family: Arial, Helvetica, sans-serif;
    overflow: visible;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  @page {
    size: A4 portrait;
    margin: 8mm;
  }

  .cv-header {
    break-inside: avoid;
    page-break-inside: avoid;
    padding: 0.5rem 1rem !important;
  }

  .cv-body {
    padding: 0.5rem 1rem 0.75rem !important;
  }

  .cv-section + .cv-section {
    margin-top: 0.65rem !important;
  }

  .cv-section-title {
    break-after: avoid;
    page-break-after: avoid;
  }

  .cv-subsection {
    margin-top: 0.5rem !important;
  }

  .cv-block + .cv-block {
    margin-top: 0.45rem !important;
  }

  .cv-paragraph + .cv-paragraph {
    margin-top: 0.35rem !important;
  }

  .cv-list li + li {
    margin-top: 0.15rem !important;
  }

  .cv-skills-grid,
  .cv-meta-grid {
    break-inside: auto;
    page-break-inside: auto;
  }

  .cv-project {
    break-inside: auto;
    page-break-inside: auto;
    padding: 0.4rem 0 !important;
  }

  .cv-footer {
    break-inside: avoid;
    page-break-inside: avoid;
    margin-top: 0.5rem !important;
  }

  p, li {
    orphans: 2;
    widows: 2;
  }

  @media print {
    .cv-document {
      box-shadow: none !important;
      max-width: none !important;
      width: 100% !important;
      margin: 0 !important;
      overflow: visible !important;
    }

    a[href]::after {
      content: none !important;
    }
  }
`;

function cloneCvDocument(source) {
  const clone = source.cloneNode(true);

  clone.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src');
    if (src) {
      img.src = new URL(src, window.location.href).href;
    }
  });

  return clone;
}

function waitForImages(doc) {
  const images = [...doc.images];
  if (!images.length) {
    return Promise.resolve();
  }

  return Promise.all(
    images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.onload = resolve;
          img.onerror = resolve;
        }),
    ),
  );
}

function buildPrintHtml(cvCss, documentHtml) {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>CV - Do Trong Tan</title>
  <style>${PRINT_CSS}\n${cvCss}</style>
</head>
<body>${documentHtml}</body>
</html>`;
}

/** In qua iframe tách khỏi Tailwind/theme */
export async function printCv() {
  const source = document.querySelector('.cv-document');
  if (!source) {
    return;
  }

  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  Object.assign(iframe.style, {
    position: 'fixed',
    right: '0',
    bottom: '0',
    width: '0',
    height: '0',
    border: '0',
    opacity: '0',
    pointerEvents: 'none',
  });

  document.body.appendChild(iframe);

  const win = iframe.contentWindow;
  const doc = win.document;
  const clone = cloneCvDocument(source);
  const cvCss = collectCvCssRules();

  doc.open();
  doc.write(buildPrintHtml(cvCss, clone.outerHTML));
  doc.close();

  await waitForImages(doc);

  const cleanup = () => {
    iframe.remove();
    win.onafterprint = null;
  };

  win.onafterprint = cleanup;

  const previousTitle = document.title;
  document.title = 'CV - Do Trong Tan';
  win.focus();
  win.print();
  document.title = previousTitle;

  setTimeout(cleanup, 3000);
}

export function loadCvFont() {
  return Promise.resolve();
}
