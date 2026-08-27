/**
 * Gắn class WOW.js + animate.css cho phần tử React.
 * @param {string} [baseClass]
 * @param {string} animation - animate.css v3, ví dụ: fadeInUp
 * @param {{ delay?: number, duration?: string }} [options]
 */
export function wowProps(baseClass = '', animation = 'fadeInUp', options = {}) {
  const { delay, duration } = options;
  const className = [baseClass, 'wow', animation].filter(Boolean).join(' ');

  return {
    className,
    ...(delay != null ? { 'data-wow-delay': `${delay / 1000}s` } : {}),
    ...(duration ? { 'data-wow-duration': duration } : {}),
  };
}
