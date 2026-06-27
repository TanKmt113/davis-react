import { withSupabase } from 'npm:@supabase/server@1';

type ProjectPayload = {
  title: string;
  sub_title: string;
  description: string;
  product_link?: string;
  image_url?: string | null;
  sort_order?: number;
  is_active?: boolean;
  effect?: string;
  duration?: string;
  delay?: string;
};

/** Admin API: thêm/sửa dự án (secret key, bypass RLS) */
export default {
  fetch: withSupabase({ auth: 'secret' }, async (req, ctx) => {
    const method = req.method.toUpperCase();

    if (method === 'GET') {
      const { data, error } = await ctx.supabaseAdmin
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        return Response.json({ message: error.message }, { status: 500 });
      }

      return Response.json(data ?? []);
    }

    if (method === 'POST') {
      let body: ProjectPayload;
      try {
        body = await req.json();
      } catch {
        return Response.json({ message: 'Invalid JSON body' }, { status: 400 });
      }

      if (!body.title || !body.sub_title || !body.description) {
        return Response.json(
          { message: 'title, sub_title, description are required' },
          { status: 400 },
        );
      }

      const { data, error } = await ctx.supabaseAdmin
        .from('projects')
        .insert(body)
        .select()
        .single();

      if (error) {
        return Response.json({ message: error.message }, { status: 500 });
      }

      return Response.json(data, { status: 201 });
    }

    if (method === 'PATCH') {
      const url = new URL(req.url);
      const id = url.searchParams.get('id');

      if (!id) {
        return Response.json({ message: 'id query param is required' }, { status: 400 });
      }

      let body: Partial<ProjectPayload>;
      try {
        body = await req.json();
      } catch {
        return Response.json({ message: 'Invalid JSON body' }, { status: 400 });
      }

      const { data, error } = await ctx.supabaseAdmin
        .from('projects')
        .update(body)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return Response.json({ message: error.message }, { status: 500 });
      }

      return Response.json(data);
    }

    if (method === 'DELETE') {
      const url = new URL(req.url);
      const id = url.searchParams.get('id');

      if (!id) {
        return Response.json({ message: 'id query param is required' }, { status: 400 });
      }

      const { error } = await ctx.supabaseAdmin.from('projects').delete().eq('id', id);

      if (error) {
        return Response.json({ message: error.message }, { status: 500 });
      }

      return new Response(null, { status: 204 });
    }

    return Response.json({ message: 'Method not allowed' }, { status: 405 });
  }),
};
