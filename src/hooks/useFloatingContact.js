import { useEffect, useState } from 'react';
import { fetchFloatingContact } from '../services/contentService';
import { DEFAULT_FLOATING_CONTACT } from '../constants/contactChannels';

/** @returns {{ data: typeof DEFAULT_FLOATING_CONTACT, loading: boolean }} */
export function useFloatingContact() {
  const [data, setData] = useState(DEFAULT_FLOATING_CONTACT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchFloatingContact()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setData(DEFAULT_FLOATING_CONTACT);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading };
}
