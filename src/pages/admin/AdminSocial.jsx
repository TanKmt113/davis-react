import { useCallback, useEffect, useState } from 'react';
import { Alert, AdminCard, FormField, PageHeader, SaveButton } from '../../components/Admin/AdminUI';
import { fetchAll, createRow, updateRow, deleteRow } from '../../services/adminCrudService';

export default function AdminSocial() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [form, setForm] = useState({ icon: 'linkedin', title: '', link: '', sort_order: 0, is_active: true });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await fetchAll('social_links'));
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, sort_order: Number(form.sort_order) || 0 };
      if (editing?.id) await updateRow('social_links', editing.id, payload);
      else await createRow('social_links', payload);
      setShowForm(false);
      await load();
      setMessage({ type: 'success', text: 'Đã lưu!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div>
      <PageHeader title="Mạng xã hội" description="LinkedIn, GitHub, Email..." action={<button type="button" onClick={() => { setEditing(null); setForm({ icon: 'linkedin', title: '', link: '', sort_order: 0, is_active: true }); setShowForm(true); }} className="px-4 py-2 rounded-xl bg-primary text-white text-sm">+ Thêm link</button>} />
      <Alert type={message.type} message={message.text} />

      {showForm && (
        <AdminCard className="mb-6">
          <form onSubmit={save} className="grid gap-4 max-w-2xl">
            <FormField label="Icon (linkedin, github, envelope...)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
            <FormField label="Tên hiển thị" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <FormField label="URL" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} required />
            <FormField label="Thứ tự" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} />
            <div className="flex gap-3">
              <SaveButton loading={saving} />
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-white/10 text-sm">Hủy</button>
            </div>
          </form>
        </AdminCard>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="p-4 rounded-xl border border-white/5 bg-surface/30 flex justify-between">
            <div>
              <p className="font-medium">{item.title} <span className="text-xs text-primary">({item.icon})</span></p>
              <p className="text-xs text-text-secondary truncate max-w-md">{item.link}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => { setEditing(item); setForm(item); setShowForm(true); }} className="text-sm px-3 py-1 rounded-lg border border-white/10">Sửa</button>
              <button type="button" onClick={async () => { if (confirm('Xóa?')) { await deleteRow('social_links', item.id); load(); } }} className="text-sm px-3 py-1 rounded-lg border border-red-400/30 text-red-400">Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
