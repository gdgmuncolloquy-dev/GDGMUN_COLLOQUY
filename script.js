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

});
