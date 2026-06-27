import { useCallback, useEffect, useState } from 'react';
import { Alert, AdminCard, FormField, FormTextarea, PageHeader, SaveButton } from '../../components/Admin/AdminUI';
import { fetchAll, createRow, updateRow, deleteRow } from '../../services/adminCrudService';

export default function AdminServices() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [form, setForm] = useState({ title: '', description: '', sort_order: 0, is_active: true });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await fetchAll('services'));
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
      const payload = { title: form.title, description: form.description, sort_order: Number(form.sort_order) || 0, is_active: form.is_active };
      if (editing?.id) await updateRow('services', editing.id, payload);
      else await createRow('services', payload);
      setShowForm(false);
      setEditing(null);
      await load();
      setMessage({ type: 'success', text: 'Đã lưu dịch vụ!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div>
      <PageHeader
        title="Dịch vụ"
        description="Quản lý section Dịch Vụ & Giải Pháp"
        action={<button type="button" onClick={() => { setEditing(null); setForm({ title: '', description: '', sort_order: 0, is_active: true }); setShowForm(true); }} className="px-4 py-2 rounded-xl bg-primary text-white text-sm">+ Thêm dịch vụ</button>}
      />
      <Alert type={message.type} message={message.text} />

      {showForm && (
        <AdminCard className="mb-6">
          <form onSubmit={save} className="grid gap-4 max-w-2xl">
            <FormField label="Tiêu đề" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <FormTextarea label="Mô tả" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
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
          <div key={item.id} className="p-4 rounded-xl border border-white/5 bg-surface/30 flex justify-between gap-4">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-text-secondary line-clamp-2 mt-1">{item.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button type="button" onClick={() => { setEditing(item); setForm(item); setShowForm(true); }} className="text-sm px-3 py-1 rounded-lg border border-white/10">Sửa</button>
              <button type="button" onClick={async () => { if (confirm('Xóa?')) { await deleteRow('services', item.id); load(); } }} className="text-sm px-3 py-1 rounded-lg border border-red-400/30 text-red-400">Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
