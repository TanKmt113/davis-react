import { withSupabase } from 'npm:@supabase/server@1';

/** Public API: danh sách dự án portfolio (RLS-scoped, publishable key gate) */
export default {
  fetch: withSupabase({ auth: 'publishable' }, async (_req, ctx) => {
    const { data, error } = await ctx.supabase
      .from('projects')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      return Response.json({ message: error.message }, { status: 500 });
    }

    return Response.json(data ?? []);
  }),
};
