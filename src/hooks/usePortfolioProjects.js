import { useEffect, useState } from 'react';
import { isSupabaseConfigured } from '../lib/supabase';
import { fetchPortfolioProjects } from '../services/portfolioService';

/**
 * @typedef {Object} PortfolioItem
 * @property {string} title
 * @property {string} subTitle
 * @property {string} description
 * @property {string} productLink
 * @property {string | null} [imgLink]
 * @property {string} [effect]
 * @property {string} [duration]
 * @property {string} [delay]
 * @property {'ecommerce' | 'integration' | 'system' | 'web'} [category]
 * @property {string[]} [tags]
 */

/**
 * @param {PortfolioItem[]} fallbackItems
 */
export function usePortfolioProjects(fallbackItems = []) {
  const [portfolioItems, setPortfolioItems] = useState(fallbackItems);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured());
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) return undefined;

    let cancelled = false;

    async function loadProjects() {
      try {
        const items = await fetchPortfolioProjects();
        if (cancelled) return;

        setPortfolioItems(items.length > 0 ? items : fallbackItems);
        setError(null);
      } catch (err) {
        if (cancelled) return;

        setPortfolioItems(fallbackItems);
        setError(err instanceof Error ? err.message : 'Không thể tải dự án');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, [fallbackItems]);

  return { portfolioItems, isLoading, error };
}
