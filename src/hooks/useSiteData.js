import { useEffect, useState } from 'react';
import {
  fetchHeroData,
  fetchAboutData,
  fetchContactData,
  fetchServices,
  fetchSkillCategories,
  fetchSocialLinks,
} from '../services/contentService';
import { fetchPortfolioProjects } from '../services/portfolioService';
import fallbackData from '../Data.json';

export function useSiteData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [hero, about, contact, services, skills, social, projects] = await Promise.all([
          fetchHeroData(),
          fetchAboutData(),
          fetchContactData(),
          fetchServices(),
          fetchSkillCategories(),
          fetchSocialLinks(),
          fetchPortfolioProjects().catch(() => fallbackData.portfolioData.portfolioItems),
        ]);

        if (!cancelled) {
          setData({ hero, about, contact, services, skills, social, projects });
        }
      } catch {
        if (!cancelled) {
          setData({
            hero: fallbackData.heroData.homeOneHero,
            about: fallbackData.aboutData,
            contact: fallbackData.contactData,
            services: fallbackData.serviceData.services,
            skills: { title: fallbackData.skillData.title, text: fallbackData.skillData.text, categories: [] },
            social: fallbackData.socialData,
            projects: fallbackData.portfolioData.portfolioItems,
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { data, loading };
}
