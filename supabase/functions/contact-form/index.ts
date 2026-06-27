import { withSupabase } from 'npm:@supabase/server@1';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/** @param {unknown} value @param {number} max */
function trimField(value: unknown, max: number) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

/** @param {string} email */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** @param {unknown} body */
function parseContactPayload(body: unknown) {
  if (!body || typeof body !== 'object') {
    throw new Error('Dữ liệu không hợp lệ');
  }

  const record = body as Record<string, unknown>;
  const name = trimField(record.name, 120);
  const email = trimField(record.email, 254);
  const subject = trimField(record.subject, 200);
  const msg = trimField(record.msg, 5000);

  if (!name || name.length < 2) throw new Error('Vui lòng nhập họ tên');
  if (!isValidEmail(email)) throw new Error('Email không hợp lệ');
  if (!subject || subject.length < 3) throw new Error('Vui lòng nhập chủ đề');
  if (!msg || msg.length < 10) throw new Error('Lời nhắn quá ngắn');

  return { name, email, subject, msg };
}

/** Public API: gửi form liên hệ qua Gmail SMTP */
export default {
  fetch: withSupabase({ auth: 'none' }, async (req, _ctx) => {
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders });
    }

    if (req.method !== 'POST') {
      return Response.json(
        { success: false, error: 'Method not allowed' },
        { status: 405, headers: corsHeaders },
      );
    }

    const smtpUser = Deno.env.get('SMTP_USER');
    const smtpPass = Deno.env.get('SMTP_PASS');
    const contactTo = Deno.env.get('CONTACT_TO') ?? 'dotrongtan113@gmail.com';

    if (!smtpUser || !smtpPass) {
      return Response.json(
        { success: false, error: 'Email server chưa được cấu hình' },
        { status: 503, headers: corsHeaders },
      );
    }

    let payload;
    try {
      payload = parseContactPayload(await req.json());
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Dữ liệu không hợp lệ';
      return Response.json({ success: false, error: message }, { status: 400, headers: corsHeaders });
    }

    const { name, email, subject, msg } = payload;
    const sentAt = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    const textBody = [
      'Tin nhắn mới từ website TANDEV',
      '',
      `Họ tên: ${name}`,
      `Email: ${email}`,
      `Chủ đề: ${subject}`,
      `Thời gian: ${sentAt}`,
      '',
      'Nội dung:',
      msg,
    ].join('\n');

    const htmlBody = `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a">
        <h2 style="margin:0 0 16px">Tin nhắn mới từ website TANDEV</h2>
        <p><strong>Họ tên:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Chủ đề:</strong> ${subject}</p>
        <p><strong>Thời gian:</strong> ${sentAt}</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0" />
        <p style="white-space:pre-wrap">${msg.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
      </div>
    `;

    const client = new SMTPClient({
      connection: {
        hostname: 'smtp.gmail.com',
        port: 465,
        tls: true,
        auth: {
          username: smtpUser,
          password: smtpPass,
        },
      },
    });

    try {
      await client.send({
        from: smtpUser,
        to: contactTo,
        replyTo: email,
        subject: `[TANDEV] ${subject}`,
        content: textBody,
        html: htmlBody,
      });
      await client.close();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Không gửi được email';
      return Response.json({ success: false, error: message }, { status: 502, headers: corsHeaders });
    }

    return Response.json(
      { success: true, data: { message: 'Email đã được gửi' } },
      { headers: corsHeaders },
    );
  }),
};
