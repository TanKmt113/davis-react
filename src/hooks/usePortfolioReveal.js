import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

const REVEAL_TARGETS = '.portfolio-heading-inner > *, .portfolio-filters-inner, .portfolio-card';

/**
 * @param {unknown[]} items
 * @param {boolean} isLoading
 */
export function usePortfolioReveal(items, isLoading) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || isLoading || !items.length || prefersReducedMotion()) {
      return undefined;
    }

    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      gsap.from('.portfolio-heading-inner > *', {
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.portfolio-filters-inner', {
        y: 20,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.portfolio-card', {
        y: 56,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.portfolio-grid',
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
      gsap.set(REVEAL_TARGETS, { clearProps: 'transform,opacity,scale' });
    };
  }, [items, isLoading]);

  return sectionRef;
}
