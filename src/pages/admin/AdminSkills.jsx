import { useCallback, useEffect, useState } from 'react';
import { Alert, AdminCard, FormField, FormTextarea, PageHeader, SaveButton } from '../../components/Admin/AdminUI';
import { fetchAll, createRow, updateRow, deleteRow } from '../../services/adminCrudService';
import { fetchSectionAdmin, upsertSection } from '../../services/contentService';

export default function AdminSkills() {
  const [header, setHeader] = useState({ title: '', text: '' });
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [form, setForm] = useState(emptyItem());

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [h, data] = await Promise.all([
        fetchSectionAdmin('skills_header'),
        fetchAll('skill_categories'),
      ]);
      if (h) setHeader(h);
      setItems(data);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const saveHeader = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await upsertSection('skills_header', header);
      setMessage({ type: 'success', text: 'Đã lưu tiêu đề!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const saveItem = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: form.title,
      description: form.description,
      icon: form.icon,
      icon_color: form.icon_color,
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      sort_order: Number(form.sort_order) || 0,
      is_active: form.is_active,
    };
    try {
      if (editing?.id) await updateRow('skill_categories', editing.id, payload);
      else await createRow('skill_categories', payload);
      setShowForm(false);
      setEditing(null);
      await load();
      setMessage({ type: 'success', text: 'Đã lưu nhóm kỹ năng!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div>
      <PageHeader title="Kỹ năng" description="Quản lý tiêu đề và nhóm kỹ năng" />
      <Alert type={message.type} message={message.text} />

      <form onSubmit={saveHeader} className="mb-6">
        <AdminCard title="Tiêu đề section">
          <div className="grid gap-4 max-w-2xl">
            <FormField label="Tiêu đề" value={header.title ?? ''} onChange={(e) => setHeader({ ...header, title: e.target.value })} />
            <FormTextarea label="Mô tả" value={header.text ?? ''} onChange={(e) => setHeader({ ...header, text: e.target.value })} />
            <SaveButton loading={saving} label="Lưu tiêu đề" />
          </div>
        </AdminCard>
      </form>

      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Nhóm kỹ năng ({items.length})</h2>
        <button type="button" onClick={() => { setEditing(null); setForm(emptyItem()); setShowForm(true); }} className="px-4 py-2 rounded-xl bg-primary text-white text-sm">+ Thêm nhóm</button>
      </div>

      {showForm && (
        <AdminCard className="mb-6">
          <form onSubmit={saveItem} className="grid gap-4 max-w-2xl">
            <FormField label="Tên nhóm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <FormTextarea label="Mô tả" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <FormField label="Icon (Iconify)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
            <FormField label="Kỹ năng (phân cách dấu phẩy)" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
            <FormField label="Thứ tự" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} />
            <div className="flex gap-3">
              <SaveButton loading={saving} label="Lưu nhóm" />
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-white/10 text-sm">Hủy</button>
            </div>
          </form>
        </AdminCard>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-surface/30">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-text-secondary">{(item.skills ?? []).join(', ')}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => { setEditing(item); setForm({ ...item, skills: (item.skills ?? []).join(', ') }); setShowForm(true); }} className="text-sm px-3 py-1 rounded-lg border border-white/10">Sửa</button>
              <button type="button" onClick={async () => { if (confirm('Xóa?')) { await deleteRow('skill_categories', item.id); load(); } }} className="text-sm px-3 py-1 rounded-lg border border-red-400/30 text-red-400">Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function emptyItem() {
  return { title: '', description: '', icon: 'material-symbols:code', icon_color: 'text-primary', skills: '', sort_order: 0, is_active: true };
}
