import ImageUpload from '../../components/Admin/ImageUpload';
import { Alert, AdminCard, FormField, FormTextarea, PageHeader, SaveButton } from '../../components/Admin/AdminUI';
import { useSectionForm } from '../../hooks/useSectionForm';

const DEFAULT = {
  title: '', subtitle: '', text: '', imgLink: '',
  tags: [], experienceBadge: { label: 'Kinh nghiệm', value: '' },
};

export default function AdminAbout() {
  const { form, setField, loading, saving, message, save } = useSectionForm('about', DEFAULT);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <form onSubmit={save}>
      <PageHeader title="Giới thiệu" description="Section About — thông tin cá nhân & thành tựu" />
      <Alert type={message.type} message={message.text} />
      <div className="grid gap-6">
        <AdminCard title="Thông tin chính">
          <div className="grid gap-4 max-w-2xl">
            <FormField label="Tiêu đề" value={form.title} onChange={(e) => setField('title', e.target.value)} />
            <FormField label="Phụ đề" value={form.subtitle} onChange={(e) => setField('subtitle', e.target.value)} />
            <FormTextarea label="Mô tả" value={form.text} onChange={(e) => setField('text', e.target.value)} />
            <ImageUpload value={form.imgLink} onChange={(url) => setField('imgLink', url)} />
          </div>
        </AdminCard>
        <SaveButton loading={saving} />
      </div>
    </form>
  );
}
