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

  /* ---------- Expression-of-interest forms (apply page + homepage teaser) ---------- */
  function wireForm(formId, btnId, noteId) {
    const form = document.getElementById(formId);
    if (!form) return;
    const submitBtn = document.getElementById(btnId);
    const note = document.getElementById(noteId);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Simulate submission
      submitBtn.textContent = 'Sent';
      submitBtn.disabled = true;
      if (note) note.classList.add('show');

      // Lock the fields
      Array.from(form.elements).forEach(el => {
        if (el !== submitBtn) el.disabled = true;
      });
    });
  }

  wireForm('applyForm', 'submitBtn', 'formNote');
  wireForm('homeForm', 'homeSubmitBtn', 'homeFormNote');

});