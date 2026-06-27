import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

/** @returns {import('react').RefObject<HTMLElement>} */
export function useHeroEntrance() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.set('.hero-reveal', { opacity: 0, y: 28 });
      gsap.set('.hero-avatar', { scale: 0.88 });
      gsap.set('.hero-tag', { scale: 0.9 });

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-blob', { opacity: 0, scale: 0.85, duration: 1.4, stagger: 0.12 })
        .from('.hero-card', { opacity: 0, y: 48, scale: 0.97, duration: 0.9 }, '-=1')
        .to('.hero-avatar', { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: 'back.out(1.4)' }, '-=0.55')
        .to('.hero-title', { opacity: 1, y: 0, duration: 0.65 }, '-=0.45')
        .to('.hero-designation', { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
        .to('.hero-desc', { opacity: 1, y: 0, duration: 0.55 }, '-=0.3')
        .to('.hero-cta', { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 }, '-=0.25')
        .to('.hero-tag', { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.07, ease: 'back.out(1.6)' }, '-=0.2');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
