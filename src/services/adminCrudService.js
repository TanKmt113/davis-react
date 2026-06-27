import { supabase } from '../lib/supabase';

function assertClient() {
  if (!supabase) throw new Error('Supabase chưa được cấu hình');
  return supabase;
}

/** @param {string} table */
export async function fetchAll(table) {
  const { data, error } = await assertClient().from(table).select('*').order('sort_order');
  if (error) throw error;
  return data ?? [];
}

/** @param {string} table @param {object} row */
export async function createRow(table, row) {
  const { data, error } = await assertClient().from(table).insert(row).select().single();
  if (error) throw error;
  return data;
}

/** @param {string} table @param {string} id @param {object} row */
export async function updateRow(table, id, row) {
  const { data, error } = await assertClient().from(table).update(row).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

/** @param {string} table @param {string} id */
export async function deleteRow(table, id) {
  const { error } = await assertClient().from(table).delete().eq('id', id);
  if (error) throw error;
}
