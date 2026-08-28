import { useEffect, useState } from 'react';
import { DEFAULT_CV } from '../constants/cvDefaults';
import { fetchSection } from '../services/contentService';

/** Tải cấu hình CV (ảnh đại diện, ...) từ Supabase */
export function useCvSettings() {
  const [settings, setSettings] = useState(DEFAULT_CV);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const content = await fetchSection('cv');
        if (!cancelled && content) {
          setSettings({ ...DEFAULT_CV, ...content });
        }
      } catch {
        /* fallback DEFAULT_CV */
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { ...settings, loading };
}
