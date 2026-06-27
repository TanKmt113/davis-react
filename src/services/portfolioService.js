import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * @param {Record<string, unknown>} row
 * @returns {import('../hooks/usePortfolioProjects').PortfolioItem}
 */
const mapProjectRow = (row) => ({
  title: row.title,
  subTitle: row.sub_title,
  description: row.description,
  productLink: row.product_link ?? '#',
  imgLink: row.image_url ?? null,
  effect: row.effect ?? 'fade-up',
  duration: row.duration ?? '500',
  delay: row.delay ?? '300',
  category: row.category ?? null,
  tags: row.tags ?? null,
});

/**
 * Fetch qua Edge Function (withSupabase + auth publishable).
 * @returns {Promise<import('../hooks/usePortfolioProjects').PortfolioItem[]>}
 */
async function fetchViaEdgeFunction() {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL;
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const response = await fetch(`${baseUrl}/functions/v1/projects`, {
    headers: { apikey: publishableKey },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message ?? `Edge Function error: ${response.status}`);
  }

  const data = await response.json();
  return (data ?? []).map(mapProjectRow);
}

/**
 * Fallback: gọi trực tiếp Supabase REST (RLS).
 * @returns {Promise<import('../hooks/usePortfolioProjects').PortfolioItem[]>}
 */
async function fetchViaClient() {
  if (!supabase) {
    throw new Error('Supabase chưa được cấu hình');
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) throw error;

  return (data ?? []).map(mapProjectRow);
}

/**
 * Lấy danh sách dự án — ưu tiên Edge Function, fallback REST client.
 * @returns {Promise<import('../hooks/usePortfolioProjects').PortfolioItem[]>}
 */
export async function fetchPortfolioProjects() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase chưa được cấu hình');
  }

  try {
    return await fetchViaEdgeFunction();
  } catch {
    return fetchViaClient();
  }
}
