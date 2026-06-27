/** @typedef {Object} FloatingContactConfig
 * @property {string} panelTitle
 * @property {string} responseNote
 * @property {string} phone
 * @property {string} phoneDisplay
 * @property {string} email
 * @property {string} zaloUrl
 * @property {string} facebookUrl
 * @property {string} workingHours
 * @property {string} ctaLabel
 * @property {boolean} showZalo
 * @property {boolean} showFacebook
 * @property {boolean} showEmail
 */

/** @type {FloatingContactConfig} */
export const DEFAULT_FLOATING_CONTACT = {
  panelTitle: 'Liên hệ nhanh',
  responseNote: 'Phản hồi trong vòng 24 giờ',
  phone: '0969846563',
  phoneDisplay: '0969 846 563',
  email: 'dotrongtan113@gmail.com',
  zaloUrl: 'https://zalo.me/84969846563',
  facebookUrl: 'https://www.facebook.com/',
  workingHours: '8:00 – 22:00 (T2–T7)',
  ctaLabel: 'Gửi yêu cầu dự án →',
  showZalo: true,
  showFacebook: true,
  showEmail: true,
};

/** @param {Partial<FloatingContactConfig>} [overrides] */
export function mergeFloatingContact(overrides) {
  return { ...DEFAULT_FLOATING_CONTACT, ...overrides };
}
