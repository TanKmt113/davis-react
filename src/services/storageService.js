import { supabase } from '../lib/supabase';

export const PROJECT_IMAGES_BUCKET = 'project-images';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const MAX_SIZE_MB = 20;

/**
 * Upload ảnh dự án lên Supabase Storage.
 * @param {File} file
 * @returns {Promise<string>} Public URL
 */
export async function uploadProjectImage(file) {
  if (!supabase) throw new Error('Supabase chưa được cấu hình');

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Chỉ chấp nhận JPG, PNG, WebP, GIF');
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`Ảnh tối đa ${MAX_SIZE_MB}MB`);
  }

  const ext = file.name.includes('.')
    ? file.name.split('.').pop()?.toLowerCase()
    : ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' }[file.type]);
  const safeExt = ext || 'jpg';
  const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${safeExt}`;

  const { error } = await supabase.storage
    .from(PROJECT_IMAGES_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from(PROJECT_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
