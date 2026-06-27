import { useEffect, useState } from 'react';
import { fetchSeoData } from '../services/contentService';

/** @returns {{ data: import('../constants/seoDefaults').SeoConfig, loading: boolean }} */
export function useSeo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchSeoData()
      .then((result) => {
        if (active) setData(result);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { data, loading };
}
