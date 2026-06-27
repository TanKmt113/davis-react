import ImageUpload from '../../components/Admin/ImageUpload';
import { Alert, AdminCard, FormField, FormTextarea, PageHeader, SaveButton } from '../../components/Admin/AdminUI';
import { useSectionForm } from '../../hooks/useSectionForm';

const DEFAULT = {
  title: '',
  designation: '',
  imgLink: '',
  description: '',
  tags: [],
};

export default function AdminHero() {
  const { form, setField, loading, saving, message, save } = useSectionForm('hero', DEFAULT);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <form onSubmit={save}>
      <PageHeader title="Hero" description="Section banner đầu trang" />
      <Alert type={message.type} message={message.text} />
      <AdminCard>
        <div className="grid gap-5 max-w-2xl">
          <FormField label="Họ tên" value={form.title} onChange={(e) => setField('title', e.target.value)} required />
          <FormField label="Chức danh (typing effect)" value={form.designation} onChange={(e) => setField('designation', e.target.value)} />
          <ImageUpload value={form.imgLink} onChange={(url) => setField('imgLink', url)} />
          <FormTextarea label="Mô tả ngắn" value={form.description} onChange={(e) => setField('description', e.target.value)} />
          <FormField label="Tags (phân cách bằng dấu phẩy)" value={(form.tags ?? []).join(', ')} onChange={(e) => setField('tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))} />
          <SaveButton loading={saving} />
        </div>
      </AdminCard>
    </form>
  );
}
