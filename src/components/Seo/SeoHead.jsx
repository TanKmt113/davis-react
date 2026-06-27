import { useEffect } from 'react';
import { useSeo } from '../../hooks/useSeo';
import { applySeoToDocument } from '../../lib/seoMeta';

/** Cập nhật meta tags SEO / Open Graph / Twitter khi load trang. */
export default function SeoHead() {
  const { data, loading } = useSeo();

  useEffect(() => {
    if (!loading && data) applySeoToDocument(data);
  }, [data, loading]);

  return null;
}
