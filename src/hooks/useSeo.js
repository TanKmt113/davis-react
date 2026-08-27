import { useBranding } from '../context/BrandingContext';

/** @returns {{ data: import('../constants/seoDefaults').SeoConfig, loading: boolean }} */
export function useSeo() {
  const { branding, loading } = useBranding();
  return { data: branding, loading };
}
