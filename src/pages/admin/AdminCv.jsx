import ImageUpload from '../../components/Admin/ImageUpload';
import { Alert, AdminCard, PageHeader, SaveButton } from '../../components/Admin/AdminUI';
import { DEFAULT_CV } from '../../constants/cvDefaults';
import { useSectionForm } from '../../hooks/useSectionForm';

export default function AdminCv() {
  const { form, setField, loading, saving, message, save } = useSectionForm('cv', { ...DEFAULT_CV });

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
        title="CV Online"
        description="Ảnh đại diện hiển thị trên trang /cv"
      />
      <Alert type={message.type} message={message.text} />

      <AdminCard title="Ảnh đại diện">
        <div className="grid gap-4 max-w-2xl">
          <ImageUpload
            label="Ảnh chân dung (tỉ lệ 4×6, khuyến nghị 400×600px)"
            value={form.avatarUrl}
            onChange={(url) => setField('avatarUrl', url)}
          />
          {form.avatarUrl ? (
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 inline-block">
              <p className="text-xs text-text-secondary mb-2">Xem trước trên CV</p>
              <img
                src={form.avatarUrl}
                alt="Preview CV avatar"
                className="w-[7.5rem] aspect-[4/6] object-cover rounded-lg border-2 border-primary/30"
              />
            </div>
          ) : null}
          <p className="text-xs text-text-secondary">
            Sau khi lưu, mở{' '}
            <a href="/cv" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              /cv
            </a>
            {' '}để kiểm tra.
          </p>
          <SaveButton loading={saving} />
        </div>
      </AdminCard>
    </form>
  );
}
