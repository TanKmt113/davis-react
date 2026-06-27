import ImageUpload from '../../components/Admin/ImageUpload';
import { Alert, AdminCard, FormField, FormTextarea, PageHeader, SaveButton } from '../../components/Admin/AdminUI';
import { useSectionForm } from '../../hooks/useSectionForm';

const DEFAULT = {
  title: '', subtitle: '', text: '', imgLink: '', cvPdf: '',
  details: [{ title: 'Điện thoại', info: '' }, { title: 'Email', info: '' }, { title: 'Học vấn', info: '' }],
  tags: [], stats: [], experienceBadge: { label: 'Kinh nghiệm', value: '' },
};

export default function AdminAbout() {
  const { form, setField, loading, saving, message, save } = useSectionForm('about', DEFAULT);

  const updateDetail = (index, field, value) => {
    const details = [...(form.details ?? [])];
    details[index] = { ...details[index], [field]: value };
    setField('details', details);
  };

  const updateStat = (index, field, value) => {
    const stats = [...(form.stats ?? [])];
    stats[index] = { ...stats[index], [field]: value };
    setField('stats', stats);
  };

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
            <FormField label="Link CV (PDF)" value={form.cvPdf} onChange={(e) => setField('cvPdf', e.target.value)} />
          </div>
        </AdminCard>
        <AdminCard title="Liên hệ chi tiết">
          <div className="grid sm:grid-cols-3 gap-4">
            {(form.details ?? []).map((d, i) => (
              <div key={i} className="space-y-2">
                <FormField label={d.title} value={d.info} onChange={(e) => updateDetail(i, 'info', e.target.value)} />
              </div>
            ))}
          </div>
        </AdminCard>
        <AdminCard title="Chỉ số thành tựu">
          <div className="grid sm:grid-cols-2 gap-4">
            {(form.stats ?? []).map((s, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/5 space-y-2">
                <FormField label="Giá trị" value={s.value} onChange={(e) => updateStat(i, 'value', e.target.value)} />
                <FormField label="Nhãn" value={s.label} onChange={(e) => updateStat(i, 'label', e.target.value)} />
                <FormTextarea label="Mô tả" rows={2} value={s.desc} onChange={(e) => updateStat(i, 'desc', e.target.value)} />
              </div>
            ))}
          </div>
        </AdminCard>
        <SaveButton loading={saving} />
      </div>
    </form>
  );
}
