import { withSupabase } from 'npm:@supabase/server@1';

/** Health check — no auth required */
export default {
  fetch: withSupabase({ auth: 'none' }, async (_req, _ctx) => {
    return Response.json({
      status: 'ok',
      service: 'davis-react',
      time: new Date().toISOString(),
    });
  }),
};
