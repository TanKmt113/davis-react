import { Alert, AdminCard, FormField, FormTextarea, PageHeader, SaveButton } from '../../components/Admin/AdminUI';
import { useSectionForm } from '../../hooks/useSectionForm';
import { DEFAULT_FLOATING_CONTACT } from '../../constants/contactChannels';

const DEFAULT = {
  formTitle: '',
  title: '',
  subTitle: '',
  text: '',
  floating: { ...DEFAULT_FLOATING_CONTACT },
};

export default function AdminContact() {
  const { form, setForm, setField, loading, saving, message, save } = useSectionForm('contact', DEFAULT);

  const setFloating = (field, value) => {
    setForm((prev) => ({
      ...prev,
      floating: { ...prev.floating, [field]: value },
    }));
  };

  const floating = form.floating ?? DEFAULT_FLOATING_CONTACT;

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
        title="Liên hệ"
        description="Section Contact + widget liên hệ nổi (góc phải màn hình)"
      />
      <Alert type={message.type} message={message.text} />

      <AdminCard title="Section Liên hệ (trang chủ)" className="mb-6">
        <div className="grid gap-4 max-w-2xl">
          <FormField label="Tiêu đề form" value={form.formTitle} onChange={(e) => setField('formTitle', e.target.value)} />
          <FormField label="Tiêu đề section" value={form.title} onChange={(e) => setField('title', e.target.value)} />
          <FormField label="Phụ đề" value={form.subTitle} onChange={(e) => setField('subTitle', e.target.value)} />
          <FormTextarea label="Mô tả" rows={4} value={form.text} onChange={(e) => setField('text', e.target.value)} />
        </div>
      </AdminCard>

      <AdminCard title="Widget liên hệ nổi (Zalo · Facebook · Email)">
        <div className="grid gap-4 max-w-2xl">
          <FormField label="Tiêu đề panel" value={floating.panelTitle} onChange={(e) => setFloating('panelTitle', e.target.value)} />
          <FormField label="Ghi chú phản hồi" value={floating.responseNote} onChange={(e) => setFloating('responseNote', e.target.value)} />
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Số điện thoại (gọi)" value={floating.phone} onChange={(e) => setFloating('phone', e.target.value)} />
            <FormField label="Hiển thị SĐT" value={floating.phoneDisplay} onChange={(e) => setFloating('phoneDisplay', e.target.value)} />
          </div>
          <FormField label="Email" type="email" value={floating.email} onChange={(e) => setFloating('email', e.target.value)} />
          <FormField label="Link Zalo" value={floating.zaloUrl} onChange={(e) => setFloating('zaloUrl', e.target.value)} placeholder="https://zalo.me/84..." />
          <FormField label="Link Facebook / Messenger" value={floating.facebookUrl} onChange={(e) => setFloating('facebookUrl', e.target.value)} placeholder="https://m.me/..." />
          <FormField label="Giờ hỗ trợ" value={floating.workingHours} onChange={(e) => setFloating('workingHours', e.target.value)} />
          <FormField label="Nút chuyển tới form" value={floating.ctaLabel} onChange={(e) => setFloating('ctaLabel', e.target.value)} />
          <div className="flex flex-wrap gap-6 pt-1">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={floating.showZalo !== false} onChange={(e) => setFloating('showZalo', e.target.checked)} />
              Hiện nút Zalo
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={floating.showFacebook !== false} onChange={(e) => setFloating('showFacebook', e.target.checked)} />
              Hiện nút Facebook
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={floating.showEmail !== false} onChange={(e) => setFloating('showEmail', e.target.checked)} />
              Hiện nút Email
            </label>
          </div>
        </div>
      </AdminCard>

      <div className="mt-6">
        <SaveButton loading={saving} />
      </div>
    </form>
  );
}
