/**
 * Gửi form liên hệ qua Supabase Edge Function (Gmail SMTP).
 * @param {{ name: string, email: string, subject: string, msg: string }} payload
 */
export async function sendContactMessage(payload) {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL;
  const apiKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error('Chưa cấu hình Supabase. Kiểm tra file .env');
  }

  const response = await fetch(`${baseUrl}/functions/v1/contact-form`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.success) {
    throw new Error(result.error ?? 'Gửi tin nhắn thất bại. Vui lòng thử lại sau.');
  }

  return result;
}
