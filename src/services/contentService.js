import fallbackData from '../Data.json';
import { DEFAULT_SEO } from '../constants/seoDefaults';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

/** @param {string} sectionKey */
export async function fetchSection(sectionKey) {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase
    .from('site_content')
    .select('content')
    .eq('section_key', sectionKey)
    .maybeSingle();

  if (error) throw error;
  return data?.content ?? null;
}

/** @param {string} sectionKey @param {object} content */
export async function upsertSection(sectionKey, content) {
  const client = supabase;
  if (!client) throw new Error('Supabase chưa được cấu hình');

  const { error } = await client.from('site_content').upsert(
    { section_key: sectionKey, content, updated_at: new Date().toISOString() },
    { onConflict: 'section_key' },
  );

  if (error) throw error;
}

/** @param {string} table */
async function fetchTable(table) {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

/** @param {string} table */
async function fetchAllTable(table) {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function fetchServices() {
  const data = await fetchTable('services');
  if (data?.length) {
    return data.map((s) => ({ title: s.title, text: s.description }));
  }
  return fallbackData.serviceData.services;
}

export async function fetchSkillCategories() {
  const header = await fetchSection('skills_header');
  const data = await fetchTable('skill_categories');

  if (data?.length) {
    return {
      title: header?.title ?? fallbackData.skillData.title,
      text: header?.text ?? fallbackData.skillData.text,
      categories: data.map((c) => ({
        title: c.title,
        description: c.description,
        icon: c.icon,
        iconColor: c.icon_color,
        skills: c.skills ?? [],
      })),
    };
  }

  return {
    title: fallbackData.skillData.title,
    text: fallbackData.skillData.text,
    categories: getDefaultSkillCategories(),
  };
}

function getDefaultSkillCategories() {
  return [
    {
      title: 'Fullstack Development',
      description: 'Phát triển giao diện responsive, tối ưu SEO cùng hệ thống backend hiệu năng cao.',
      icon: 'material-symbols:integration-instructions-outline',
      iconColor: 'text-primary',
      skills: ['ReactJS', 'Next.js', 'VueJS', 'Nuxt 3', 'TypeScript', 'Node.js', 'NestJS'],
    },
    {
      title: 'Cơ sở dữ liệu & Caching',
      description: 'Thiết kế cơ sở dữ liệu tối ưu, phân tích truy vấn, lập chỉ mục.',
      icon: 'material-symbols:database-outline',
      iconColor: 'text-yellow-400',
      skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Redis'],
    },
    {
      title: 'DevOps & Tự động hóa',
      description: 'Triển khai CI/CD, container hóa và tự động hóa quy trình.',
      icon: 'material-symbols:cloud-done-outline',
      iconColor: 'text-red-400',
      skills: ['Docker', 'GitHub Actions', 'n8n', 'Linux / Ubuntu'],
    },
  ];
}

export async function fetchHeroData() {
  const content = await fetchSection('hero');
  const base = fallbackData.heroData.homeOneHero;

  return {
    title: content?.title ?? base.title,
    designation: content?.designation ?? base.designation,
    imgLink: content?.imgLink ?? base.imgLink,
    description: content?.description ?? 'Đồng hành cùng doanh nghiệp từ ý tưởng đến sản phẩm hoàn thiện — website, thương mại điện tử, tích hợp đa nền tảng và tự động hóa vận hành. Giải pháp ổn định, đo lường được kết quả.',
    tags: content?.tags ?? ['E-commerce / Shopify / Haravan', 'Website doanh nghiệp', 'Tích hợp & Tự động hóa', 'POS / ERP'],
  };
}

export async function fetchAboutData() {
  const content = await fetchSection('about');
  const base = fallbackData.aboutData;

  return {
    imgLink: content?.imgLink ?? base.imgLink,
    cvPdf: content?.cvPdf ?? base.cvPdf,
    title: content?.title ?? base.title,
    subtitle: content?.subtitle ?? base.subtitle,
    text: content?.text ?? base.text,
    details: content?.details ?? base.details,
    tags: content?.tags ?? ['Shopify / Haravan / WordPress', 'Tích hợp Nhanh.vn / SAP', 'Website doanh nghiệp', 'Tự động hóa n8n'],
    stats: content?.stats ?? [
      { value: '15+', label: 'Dự án bàn giao', desc: 'Website, e-commerce và tích hợp hệ thống cho doanh nghiệp.' },
      { value: '99.8%', label: 'Uptime hệ thống', desc: 'Cam kết ổn định cho POS và nền tảng bán hàng multi-store.' },
      { value: '60%', label: 'Rút ngắn quy trình', desc: 'Tự động hóa giúp giảm thao tác thủ công và sai sót vận hành.' },
      { value: '95+', label: 'Điểm PageSpeed', desc: 'Tối ưu tốc độ web — tăng trải nghiệm và tỷ lệ chuyển đổi.' },
    ],
    experienceBadge: content?.experienceBadge ?? { label: 'Kinh nghiệm', value: '3+ Năm triển khai' },
  };
}

export async function fetchContactData() {
  const content = await fetchSection('contact');
  const base = fallbackData.contactData;

  return {
    formTitle: content?.formTitle ?? base.formTitle,
    title: content?.title ?? base.title,
    subTitle: content?.subTitle ?? base.subTitle,
    text: content?.text ?? base.text,
  };
}

/** @returns {Promise<import('../constants/contactChannels').FloatingContactConfig>} */
export async function fetchFloatingContact() {
  const content = await fetchSection('contact');
  const base = fallbackData.contactData.floating ?? {};
  const merged = { ...base, ...(content?.floating ?? {}) };

  return {
    panelTitle: merged.panelTitle ?? 'Liên hệ nhanh',
    responseNote: merged.responseNote ?? 'Phản hồi trong vòng 24 giờ',
    phone: merged.phone ?? '0969846563',
    phoneDisplay: merged.phoneDisplay ?? '0969 846 563',
    email: merged.email ?? 'dotrongtan113@gmail.com',
    zaloUrl: merged.zaloUrl || import.meta.env.VITE_ZALO_URL || 'https://zalo.me/84969846563',
    facebookUrl: merged.facebookUrl || import.meta.env.VITE_FACEBOOK_URL || 'https://www.facebook.com/',
    workingHours: merged.workingHours ?? '8:00 – 22:00 (T2–T7)',
    ctaLabel: merged.ctaLabel ?? 'Gửi yêu cầu dự án →',
    showZalo: merged.showZalo !== false,
    showFacebook: merged.showFacebook !== false,
    showEmail: merged.showEmail !== false,
  };
}

/** @returns {Promise<import('../constants/seoDefaults').SeoConfig>} */
export async function fetchSeoData() {
  const content = await fetchSection('seo');
  const base = fallbackData.seoData ?? DEFAULT_SEO;
  return { ...DEFAULT_SEO, ...base, ...(content ?? {}) };
}

export async function fetchSocialLinks() {
  const data = await fetchTable('social_links');
  if (data?.length) {
    return data.map((s) => ({ icon: s.icon, title: s.title, link: s.link }));
  }
  return fallbackData.socialData;
}

export { fetchAllTable, fetchSection as fetchSectionAdmin };
