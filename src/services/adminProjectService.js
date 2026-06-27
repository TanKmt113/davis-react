import { supabase } from '../lib/supabase';

/**
 * @typedef {Object} AdminProject
 * @property {string} [id]
 * @property {string} title
 * @property {string} sub_title
 * @property {string} description
 * @property {string} [product_link]
 * @property {string | null} [image_url]
 * @property {number} [sort_order]
 * @property {boolean} [is_active]
 * @property {string} [effect]
 * @property {string} [duration]
 * @property {string} [delay]
 * @property {'ecommerce' | 'integration' | 'system' | 'web'} [category]
 * @property {string[]} [tags]
 */

function assertClient() {
  if (!supabase) throw new Error('Supabase chưa được cấu hình');
  return supabase;
}

/** @returns {Promise<AdminProject[]>} */
export async function fetchAllProjects() {
  const client = assertClient();
  const { data, error } = await client
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

/** @param {AdminProject} project */
export async function createProject(project) {
  const client = assertClient();
  const { data, error } = await client.from('projects').insert(project).select().single();
  if (error) throw error;
  return data;
}

/** @param {string} id @param {Partial<AdminProject>} project */
export async function updateProject(id, project) {
  const client = assertClient();
  const { data, error } = await client
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** @param {string} id */
export async function deleteProject(id) {
  const client = assertClient();
  const { error } = await client.from('projects').delete().eq('id', id);
  if (error) throw error;
}
