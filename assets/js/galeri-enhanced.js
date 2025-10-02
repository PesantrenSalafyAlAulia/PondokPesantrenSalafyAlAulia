// Lightweight animations and polish for galeri.html
(function() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function() {
    // Hide preloader when page fully loaded
    window.addEventListener('load', function() {
      const pre = document.getElementById('preloader');
      if (pre) pre.style.display = 'none';
    });

    // Targets to animate (using existing structure, no content changes)
    const targets = [];
    const selectors = [
      '.hero-section',
      '.section-title',
      '.divider',
      '.featured-card',
      '.gallery-item',
      '.carousel',
      '.row > [class^="col-"]'
    ];
    selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => targets.push(el)));

    if (prefersReduced) {
      targets.forEach(el => {
        el.classList.remove('fade-in-observe');
        el.classList.add('animate-in');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    // Assign initial class
    targets.forEach(el => el.classList.add('fade-in-observe'));

    // IntersectionObserver for fade-in
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // Stagger based on element index in document flow
          const idx = targets.indexOf(el);
          el.style.transitionDelay = `${Math.min(idx * 40, 400)}ms`;
          el.classList.add('animate-in');
          io.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    targets.forEach(el => io.observe(el));

    // Subtle hover for gallery items (CSS covers most cases)
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('mouseenter', () => item.classList.add('hover')); // hook for future
      item.addEventListener('mouseleave', () => item.classList.remove('hover'));
    });

    // Modern micro-tilt effect on hover (disabled if reduced motion)
    if (!prefersReduced) {
      const maxTilt = 6; // degrees
      document.querySelectorAll('.gallery-item').forEach(item => {
        const img = item.querySelector('img');
        if (!img) return;
        const onMove = (e) => {
          const rect = item.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width; // 0..1
          const y = (e.clientY - rect.top) / rect.height; // 0..1
          const tiltX = (0.5 - y) * maxTilt;
          const tiltY = (x - 0.5) * maxTilt;
          img.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
          img.style.transition = 'transform 60ms linear';
        };
        const reset = () => {
          img.style.transform = '';
          img.style.transition = '';
        };
        item.addEventListener('mousemove', onMove);
        item.addEventListener('mouseleave', reset);
      });
    }

    // Build filter chips dynamically from category badges
    const badgeEls = Array.from(document.querySelectorAll('.gallery-item .category-badge'));
    const categories = Array.from(new Set(badgeEls.map(b => b.textContent.trim())));
    const filterContainer = document.getElementById('gallery-filter');
    if (filterContainer && categories.length) {
      const allChip = document.createElement('button');
      allChip.className = 'filter-chip active';
      allChip.innerHTML = '<i class="fas fa-layer-group"></i>Semua';
      allChip.dataset.category = 'Semua';
      filterContainer.appendChild(allChip);

      categories.forEach(cat => {
        const chip = document.createElement('button');
        chip.className = 'filter-chip';
        chip.innerHTML = `<i class="fas fa-tag"></i>${cat}`;
        chip.dataset.category = cat;
        filterContainer.appendChild(chip);
      });

      function applyFilter(cat) {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.toggle('active', c.dataset.category === cat));
        document.querySelectorAll('.gallery-item').forEach(item => {
          const badge = item.querySelector('.category-badge');
          const itemCat = badge ? badge.textContent.trim() : '';
          const show = (cat === 'Semua' || itemCat === cat);
          item.style.display = show ? '' : 'none';
        });
      }

      filterContainer.addEventListener('click', (e) => {
        const target = e.target.closest('.filter-chip');
        if (!target) return;
        applyFilter(target.dataset.category);
      });
    }

    // Back-to-top button
    let backToTop = document.querySelector('.back-to-top');
    if (!backToTop) {
      backToTop = document.createElement('button');
      backToTop.className = 'back-to-top';
      backToTop.setAttribute('aria-label', 'Kembali ke atas');
      backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
      document.body.appendChild(backToTop);
    }
    const onScroll = () => {
      const show = window.scrollY > 400;
      backToTop.classList.toggle('show', show);
    };
    window.addEventListener('scroll', onScroll);
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Lightbox using Bootstrap Modal (no external libs)
    let modal = document.getElementById('galleryLightbox');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'galleryLightbox';
      modal.className = 'modal fade';
      modal.setAttribute('tabindex', '-1');
      modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content" style="background: rgba(0,0,0,0.85); border: none;">
            <div class="modal-body p-0">
              <img id="lightboxImage" src="" alt="Preview" class="w-100" style="max-height: 85vh; object-fit: contain;">
            </div>
          </div>
        </div>`;
      document.body.appendChild(modal);
    }
    const lightboxImg = document.getElementById('lightboxImage');
    const modalInstance = (window.bootstrap && window.bootstrap.Modal) ? new window.bootstrap.Modal(modal) : null;
    document.querySelectorAll('a.glightbox').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const src = link.getAttribute('href');
        if (lightboxImg) lightboxImg.src = src;
        if (modalInstance) modalInstance.show();
      });
    });

    // Lazy loading for gallery images
    document.querySelectorAll('.gallery-item img').forEach(img => {
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    });

    // Lazy loading for carousel images
    document.querySelectorAll('.carousel-item img').forEach(img => {
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    });

    // Update current year in footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    // Footer reveal on scroll (ensure footer content becomes visible)
    const footerEl = document.querySelector('.footer');
    if (footerEl) {
      // Enable animated reveal only where supported
      footerEl.classList.add('footer-animated');
      if (typeof IntersectionObserver !== 'undefined') {
        const fio = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              footerEl.classList.add('footer-visible');
              const cards = footerEl.querySelectorAll('.footer-content');
              cards.forEach((card, i) => {
                card.style.transitionDelay = `${i * 120}ms`;
              });
              fio.disconnect();
            }
          });
        }, { threshold: 0.2 });
        fio.observe(footerEl);
      } else {
        // Fallback: show footer content immediately
        footerEl.classList.add('footer-visible');
      }
      // Ripple effect for social icons
      footerEl.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', function (e) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const ripple = document.createElement('span');
          ripple.className = 'ripple';
          ripple.style.left = x + 'px';
          ripple.style.top = y + 'px';
          this.appendChild(ripple);
          setTimeout(() => ripple.remove(), 600);
        });
      });

      // Interactive sheen: move the radial gradient with cursor
      const onFooterMouseMove = (e) => {
        const rect = footerEl.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100; // percent
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        footerEl.style.setProperty('--sheenX', `${x}%`);
        footerEl.style.setProperty('--sheenY', `${y}%`);
      };
      footerEl.addEventListener('mousemove', onFooterMouseMove);

      // Magnetic hover for social icons (gentle translate toward cursor)
      footerEl.querySelectorAll('.social-links a').forEach(link => {
        const onMove = (e) => {
          const rect = link.getBoundingClientRect();
          const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width; // -0.5..0.5
          const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
          const strength = 6; // px
          link.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
        };
        const reset = () => {
          link.style.transform = '';
        };
        link.addEventListener('mousemove', onMove);
        link.addEventListener('mouseleave', reset);
      });
    }
  });
})();