// ============================================================
// GOENKA MUN 2026 — shared behaviour
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;

    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // close all others
      faqItems.forEach(other => {
        other.classList.remove('open');
        const otherA = other.querySelector('.faq-a');
        if (otherA) otherA.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Nav shrink on scroll ---------- */
  const navEl = document.querySelector('.nav');
  if (navEl) {
    const onScroll = () => {
      navEl.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll reveal ---------- */
  const revealGroups = [
    '.prologue-left', '.prologue-right',
    '.assemblies-head', '.committee-card',
    '.chronology .chapter-label', '.chronology h2', '.chronology .sub',
    '.why-head', '.why-item',
    '.archive-head', '.archive-grid',
    '.faq-inner .chapter-label', '.faq-inner h2', '.faq-item',
    '.location-left', '.map-frame',
    '.contact-left', '.card-form',
    '.footer-top > div', '.footer-bottom',
    '.apply-hero-inner > *'
  ];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  revealGroups.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = reduceMotion ? '0ms' : `${Math.min(i, 6) * 70}ms`;
    });
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ---------- Chronology timeline: drawing rail ---------- */
    const timeline = document.querySelector('.timeline');
    if (timeline) {
      const tlItems = timeline.querySelectorAll('.tl-item');
      tlItems.forEach((item, i) => {
        item.classList.add('reveal');
        item.style.transitionDelay = reduceMotion ? '0ms' : `${i * 60}ms`;
      });

      const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            timelineObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      timelineObserver.observe(timeline);
      tlItems.forEach(item => timelineObserver.observe(item));
    }

    /* ---------- Stat count-up ---------- */
    const statEls = document.querySelectorAll('.stat b');
    if (statEls.length) {
      const animateCount = (el) => {
        const text = el.textContent.trim();
        const match = text.match(/^(\d+)(.*)$/);
        if (!match) return;
        const target = parseInt(match[1], 10);
        const suffix = match[2];

        if (reduceMotion) {
          el.textContent = target + suffix;
          return;
        }

        const duration = 1200;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };

      const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      statEls.forEach(el => statObserver.observe(el));
    }
  } else {
    /* Fallback: no IntersectionObserver support — show everything immediately */
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
    const timeline = document.querySelector('.timeline');
    if (timeline) timeline.classList.add('in-view');
  }

});
