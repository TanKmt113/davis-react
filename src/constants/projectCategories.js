/** @typedef {'ecommerce' | 'integration' | 'system' | 'web'} ProjectCategoryId */

/** @type {Array<{ id: ProjectCategoryId, label: string, icon: string, badgeClass: string }>} */
export const PROJECT_CATEGORIES = [
  {
    id: 'ecommerce',
    label: 'E-commerce',
    icon: 'mdi:cart-outline',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  },
  {
    id: 'integration',
    label: 'Tích hợp & Tự động hóa',
    icon: 'mdi:sync',
    badgeClass: 'bg-sky-500/15 text-sky-400 border-sky-500/25',
  },
  {
    id: 'system',
    label: 'Hệ thống / POS',
    icon: 'mdi:store-outline',
    badgeClass: 'bg-violet-500/15 text-violet-400 border-violet-500/25',
  },
  {
    id: 'web',
    label: 'Website / CMS',
    icon: 'mdi:web',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  },
];

/** @type {Record<ProjectCategoryId, string[]>} */
export const TAG_SUGGESTIONS = {
  ecommerce: ['Shopify', 'Haravan', 'WordPress', 'WooCommerce', 'MedusaJS', 'Liquid', 'VNPAY', 'GHTK'],
  integration: ['N8N', 'Webhook', 'API', 'Nhanh.vn', 'Tự động hóa', 'Shopify', 'Zapier'],
  system: ['POS', 'Bán lẻ', 'Multi-store', 'Hardware', 'ERP', 'Inventory'],
  web: ['WordPress', 'CMS', 'Landing page', 'Frontend', 'React', 'Next.js'],
};

/** @param {ProjectCategoryId | string | null | undefined} id */
export function getCategoryMeta(id) {
  return PROJECT_CATEGORIES.find((c) => c.id === id) ?? PROJECT_CATEGORIES[0];
}

/** @param {string[]} tags */
export function tagsToSubTitle(tags) {
  return (tags ?? []).filter(Boolean).join(' / ');
}

/**
 * Chuẩn hóa category/tags từ DB hoặc fallback subTitle.
 * @param {{ category?: string | null, tags?: string[] | null, subTitle?: string }} item
 */
export function resolveProjectMeta(item) {
  let category = item.category ?? null;
  const sub = (item.subTitle ?? '').toLowerCase();

  if (!category) {
    if (sub.includes('e-commerce') || sub.includes('shopify') || sub.includes('haravan') || sub.includes('wordpress')) {
      category = 'ecommerce';
    } else if (sub.includes('tự động hóa') || sub.includes('tích hợp') || sub.includes('n8n')) {
      category = 'integration';
    } else if (sub.includes('pos') || sub.includes('bán lẻ')) {
      category = 'system';
    } else {
      category = 'web';
    }
  }

  const tags = item.tags?.length
    ? item.tags
    : (item.subTitle ?? '').split('/').map((t) => t.trim()).filter(Boolean);

  return { category, tags, categoryMeta: getCategoryMeta(category) };
}
