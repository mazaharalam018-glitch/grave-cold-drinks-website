import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return <motion.div className="grave-scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export function ScrollReveals() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    const selector = 'main > section:not(.hero), .product-card, .review-card, .faq-item, .contact-detail-card, .journal-card';
    const seen = new WeakSet();
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('grave-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px 0px' });
    const scan = (node) => {
      if (!(node instanceof Element)) return;
      const found = [];
      if (node.matches(selector)) found.push(node);
      found.push(...node.querySelectorAll(selector));
      found.forEach((el, index) => {
        if (seen.has(el)) return;
        seen.add(el);
        el.classList.add('grave-reveal');
        el.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 65}ms`);
        revealObserver.observe(el);
      });
    };
    scan(document.body);
    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(scan));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => { mutationObserver.disconnect(); revealObserver.disconnect(); };
  }, []);
  return null;
}
