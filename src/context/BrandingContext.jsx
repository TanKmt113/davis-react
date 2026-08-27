import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_SEO } from '../constants/seoDefaults';
import { fetchSeoData } from '../services/contentService';

/** @type {import('react').Context<{ branding: import('../constants/seoDefaults').SeoConfig, loading: boolean }>} */
const BrandingContext = createContext({
  branding: DEFAULT_SEO,
  loading: true,
});

export function BrandingProvider({ children }) {
  const [branding, setBranding] = useState(DEFAULT_SEO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchSeoData()
      .then((data) => {
        if (active) setBranding(data);
      })
      .catch(() => {
        if (active) setBranding(DEFAULT_SEO);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => ({ branding, loading }), [branding, loading]);

  return (
    <BrandingContext.Provider value={value}>
      {children}
    </BrandingContext.Provider>
  );
}

export function useBranding() {
  return useContext(BrandingContext);
}
