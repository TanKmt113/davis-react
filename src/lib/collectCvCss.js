/** Thu thập CSS .cv-* từ stylesheet (bỏ @media print của trang chính) */
export function collectCvCssRules() {
  const chunks = [];

  function walkRules(rules) {
    for (const rule of rules) {
      if (rule.type === CSSRule.MEDIA_RULE) {
        if (rule.media.mediaText.includes('print')) {
          continue;
        }
        walkRules(rule.cssRules);
        continue;
      }

      if (rule.cssText.includes('.cv-')) {
        chunks.push(rule.cssText);
      }
    }
  }

  for (const sheet of document.styleSheets) {
    try {
      walkRules(sheet.cssRules);
    } catch {
      // Bỏ qua stylesheet cross-origin
    }
  }

  return chunks.join('\n');
}
