'use client';

import { useEffect } from 'react';

export default function RevealObserver() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('IntersectionObserver' in window === false) {
      document
        .querySelectorAll<HTMLElement>('[data-reveal]')
        .forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );

    const apply = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        observer.observe(el);
      });
    };

    apply();

    const mo = new MutationObserver(apply);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
