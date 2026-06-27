import { Alert, AdminCard, FormField, FormTextarea, PageHeader, SaveButton } from '../../components/Admin/AdminUI';
import { DEFAULT_SEO } from '../../constants/seoDefaults';
import { resolveAbsoluteUrl } from '../../lib/seoMeta';
import { useSectionForm } from '../../hooks/useSectionForm';

export default function AdminSeo() {
  const { form, setField, loading, saving, message, save } = useSectionForm('seo', { ...DEFAULT_SEO });
  const previewImage = resolveAbsoluteUrl(form.ogImage);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={save}>
      <PageHeader
        title="SEO & Chia sẻ mạng xã hội"
        description="Open Graph (Facebook, Zalo) · Twitter Card · Google"
      />
      <Alert type={message.type} message={message.text} />

      <AdminCard title="Thông tin hiển thị khi share link" className="mb-6">
        <div className="grid gap-4 max-w-2xl">
          <FormField label="Tên website" value={form.siteName} onChange={(e) => setField('siteName', e.target.value)} />
          <FormField label="Tiêu đề (title)" value={form.title} onChange={(e) => setField('title', e.target.value)} />
          <FormTextarea label="Mô tả (description)" rows={3} value={form.description} onChange={(e) => setField('description', e.target.value)} />
          <FormField label="Từ khóa (phân cách bằng dấu phẩy)" value={form.keywords} onChange={(e) => setField('keywords', e.target.value)} />
          <FormField label="Tác giả" value={form.author} onChange={(e) => setField('author', e.target.value)} />
        </div>
      </AdminCard>

      <AdminCard title="Ảnh preview (Open Graph)" className="mb-6">
        <div className="grid gap-4 max-w-2xl">
          <FormField
            label="Ảnh OG (đường dẫn hoặc URL đầy đủ)"
            value={form.ogImage}
            onChange={(e) => setField('ogImage', e.target.value)}
            placeholder="/images/hero-bg3.jpg"
          />
          <FormField label="Mô tả ảnh (alt)" value={form.ogImageAlt} onChange={(e) => setField('ogImageAlt', e.target.value)} />
          <p className="text-xs text-text-secondary">
            Khuyến nghị ảnh <strong className="text-text-primary">1200×630 px</strong>, dung lượng &lt; 5MB.
            Upload vào thư mục <code className="text-primary">public/images/</code> rồi nhập đường dẫn.
          </p>
          {previewImage && (
            <div className="rounded-xl border border-white/10 overflow-hidden bg-black/20">
              <img src={previewImage} alt={form.ogImageAlt} className="w-full max-h-48 object-cover" />
            </div>
          )}
        </div>
      </AdminCard>

      <AdminCard title="Tuỳ chọn nâng cao">
        <div className="grid gap-4 max-w-2xl">
          <FormField label="Twitter @handle (tuỳ chọn)" value={form.twitterHandle} onChange={(e) => setField('twitterHandle', e.target.value)} placeholder="@username" />
          <FormField label="Locale" value={form.locale} onChange={(e) => setField('locale', e.target.value)} />
          <FormField label="Theme color" value={form.themeColor} onChange={(e) => setField('themeColor', e.target.value)} placeholder="#f97316" />
        </div>
      </AdminCard>

      <AdminCard title="Sau khi deploy" className="mt-6">
        <ul className="text-sm text-text-secondary space-y-2 list-disc list-inside max-w-2xl">
          <li>Đặt <code className="text-primary">VITE_SITE_URL</code> trong <code>.env</code> = domain production (vd: https://tandev.vn)</li>
          <li>Chạy lại <code>npm run build</code> và deploy để crawler đọc meta tĩnh</li>
          <li>
            Làm mới cache preview:{' '}
            <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Facebook Debugger
            </a>
            {' · '}
            <a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              LinkedIn Inspector
            </a>
          </li>
        </ul>
      </AdminCard>

      <div className="mt-6">
        <SaveButton loading={saving} />
      </div>
    </form>
  );
}
