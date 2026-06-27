import { useCallback, useEffect, useState } from 'react';
import { fetchSectionAdmin, upsertSection } from '../services/contentService';

/** @param {string} sectionKey @param {object} defaultValue */
export function useSectionForm(sectionKey, defaultValue) {
  const [form, setForm] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const content = await fetchSectionAdmin(sectionKey);
      if (content) setForm({ ...defaultValue, ...content });
    } catch {
      setMessage({ type: 'error', text: 'Không thể tải dữ liệu' });
    } finally {
      setLoading(false);
    }
  }, [sectionKey, defaultValue]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKey]);

  const save = async (event) => {
    event?.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await upsertSection(sectionKey, form);
      setMessage({ type: 'success', text: 'Đã lưu thành công!' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Lưu thất bại' });
    } finally {
      setSaving(false);
    }
  };

  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  return { form, setForm, setField, loading, saving, message, save };
}
