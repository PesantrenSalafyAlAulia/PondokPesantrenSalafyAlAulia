// Contact page JS: form submission to WhatsApp + animations
document.addEventListener('DOMContentLoaded', () => {
  // Reveal animation for elements
  const revealEls = document.querySelectorAll('.reveal-up');
  if (revealEls.length) {
    const observer = ('IntersectionObserver' in window)
      ? new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
      : null;
    revealEls.forEach(el => {
      if (observer) observer.observe(el); else el.classList.add('revealed');
    });
  }

  // Contact form to WhatsApp
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const nama = document.getElementById('nama');
  const email = document.getElementById('email');
  const telepon = document.getElementById('telepon');
  const subjek = document.getElementById('subjek');
  const pesan = document.getElementById('pesan');

  const targetWaNumber = '6281234567890'; // gunakan nomor WA yang aktif

  // Real-time validation for message field
  if (pesan) {
    pesan.addEventListener('input', function() {
      if (this.value.trim().length >= 10) {
        this.setCustomValidity('');
      } else {
        this.setCustomValidity('Pesan harus minimal 10 karakter');
      }
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Custom validation for message length
    if (pesan && pesan.value.trim().length < 10) {
      pesan.setCustomValidity('Pesan harus minimal 10 karakter');
    } else if (pesan) {
      pesan.setCustomValidity('');
    }

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Build WhatsApp message
    const text = [
      'Halo Pondok Pesantren Assalafi Al Aulia,',
      `Nama: ${nama?.value || '-'}`,
      `Email: ${email?.value || '-'}`,
      `Telepon: ${telepon?.value || '-'}`,
      `Subjek: ${subjek?.value || '-'}`,
      '',
      `Pesan: ${pesan?.value || '-'}`
    ].join('\n');

    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${targetWaNumber}?text=${encodedText}`;

    // Loading state
    if (submitBtn) {
      const original = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Mengarah ke WhatsApp...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = original;
        submitBtn.disabled = false;
      }, 2000);
    }

    // Open WhatsApp with prefilled text
    window.open(waUrl, '_blank');

    // Reset form after opening WA
    form.reset();
    form.classList.remove('was-validated');
  });
});