// Jadwal Page Enhanced Interactions: animations, highlight, smooth scroll
(function(){
  document.addEventListener('DOMContentLoaded', function() {
    // Highlight current day rows
    const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    const today = new Date().getDay();
    const currentDay = days[today];
    document.querySelectorAll('.day-row').forEach(row => {
      if (row.getAttribute('data-day') === currentDay) {
        row.classList.add('current-day');
      }
    });

    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Initialize AOS animations
    if (window.AOS) {
      AOS.init({ duration: 700, once: true, offset: 100, easing: 'ease-out-cubic' });
    }

    // Stagger AOS on schedule rows
    const scheduleRows = document.querySelectorAll('#jadwal-section table tbody tr');
    let delay = 0;
    scheduleRows.forEach((row) => {
      row.setAttribute('data-aos', 'fade-up');
      row.setAttribute('data-aos-delay', String((delay % 8) * 50));
      delay++;
    });
    if (window.AOS) { AOS.refresh(); }

    // Bootstrap tooltips for badges
    if (window.bootstrap && typeof bootstrap.Tooltip === 'function') {
      document.querySelectorAll('.badge').forEach((badge) => {
        if (!badge.getAttribute('title')) {
          badge.setAttribute('title', badge.textContent.trim());
        }
        new bootstrap.Tooltip(badge, { placement: 'top' });
      });
    }

    // Back to Top button and scroll progress
    const backToTop = document.querySelector('.back-to-top');
    const progressBar = document.getElementById('scroll-progress');

    const updateProgress = () => {
      if (!progressBar) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    };

    const onScroll = () => {
      updateProgress();
      if (backToTop) {
        const shouldShow = (window.scrollY || document.documentElement.scrollTop) > 300;
        backToTop.classList.toggle('show', shouldShow);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Ripple interaction for Program Tambahan icons
    document.querySelectorAll('#program-tambahan .icon-circle').forEach((icon) => {
      icon.addEventListener('mouseenter', () => {
        icon.classList.add('ripple');
        setTimeout(() => icon.classList.remove('ripple'), 800);
      }, { passive: true });
    });
  });
})();
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var section = document.querySelector('#jadwal-section');
    if (!section) return;

    // Targetkan blok hari dan setiap item jadwal di dalamnya
    var targets = Array.prototype.slice.call(
      section.querySelectorAll('.day-block, .schedule-items > div')
    );
    if (!targets.length) return;

    // Tambahkan kelas fade-in dan setel delay bertahap
    targets.forEach(function (el, i) {
      el.classList.add('fade-in-item');
      var delay = (i % 10) * 60; // 0–540ms, siklus setiap 10 elemen
      el.style.setProperty('--stagger', delay + 'ms');
    });

    // IntersectionObserver untuk memicu animasi saat elemen masuk viewport
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );

    targets.forEach(function (el) {
      io.observe(el);
    });

    // Highlight current day on new structure (.day-block)
    var dayMap = ['minggu','senin','selasa','rabu','kamis','jumat','sabtu'];
    var todayKey = dayMap[new Date().getDay()];
    var currentBlock = section.querySelector('.day-block[data-day="' + todayKey + '"]');
    if (currentBlock) {
      currentBlock.classList.add('current-day');
    }

    // Day filter controls
    var filter = document.querySelector('.day-filter');
    if (filter) {
      var buttons = Array.prototype.slice.call(filter.querySelectorAll('button[data-day]'));
      var blocks = Array.prototype.slice.call(section.querySelectorAll('.day-block'));
      var setActive = function (btn) {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      };
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var day = btn.getAttribute('data-day');
          setActive(btn);
          if (day === 'all') {
            blocks.forEach(function (el) { el.classList.remove('hidden'); });
          } else {
            blocks.forEach(function (el) {
              var match = el.getAttribute('data-day') === day;
              el.classList.toggle('hidden', !match);
            });
            var target = section.querySelector('.day-block[data-day="' + day + '"]');
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });

      // Default: highlight today's button but tetap tampil Semua
      var todayBtn = filter.querySelector('button[data-day="' + todayKey + '"]');
      var allBtn = filter.querySelector('button[data-day="all"]');
      if (todayBtn && allBtn) {
        // Mark semantic active on today for initial cue
        todayBtn.classList.add('active');
        // Keep All as actual state to avoid hiding content on first load
        todayBtn.classList.remove('active');
        allBtn.classList.add('active');
      }
    }

    // Assign badge-time classes based on icon inside badge
    Array.prototype.slice.call(section.querySelectorAll('.time-col .badge')).forEach(function (badge) {
      var icon = badge.querySelector('i');
      if (!icon) return;
      if (icon.classList.contains('fa-sun')) {
        badge.classList.add('badge-time-morning');
      } else if (icon.classList.contains('fa-cloud-sun')) {
        badge.classList.add('badge-time-afternoon');
      } else if (icon.classList.contains('fa-moon')) {
        badge.classList.add('badge-time-night');
      }
    });

    // Ganti ikon per kegiatan berdasarkan kata kunci
    var iconMap = [
      { keys: ['alfiyah','imrithi','jurumiyah','jurumiyah','mutammimah'], icon: 'fa-scroll', color: 'text-primary' },
      { keys: ['fathul muin','asybah','asybah wanadzoir','bajuri'], icon: 'fa-book-open', color: 'text-success' },
      { keys: ['tafsir','munir'], icon: 'fa-book', color: 'text-info' },
      { keys: ['tanwirul qulub','tanwirul qulub'], icon: 'fa-feather', color: 'text-warning' },
      { keys: ['kifayatul awam','al luma','waladiyah'], icon: 'fa-mosque', color: 'text-dark' }
    ];
    Array.prototype.slice.call(section.querySelectorAll('.schedule-items li')).forEach(function (li) {
      var text = li.textContent.toLowerCase();
      var iconEl = li.querySelector('i');
      var applied = false;
      for (var i = 0; i < iconMap.length && !applied; i++) {
        var m = iconMap[i];
        if (m.keys.some(function (k) { return text.indexOf(k) !== -1; })) {
          if (iconEl) {
            iconEl.className = 'fas ' + m.icon + ' ' + m.color + ' me-2';
          }
          applied = true;
        }
      }
      if (!applied && iconEl) {
        iconEl.className = 'fas fa-book text-secondary me-2';
      }
    });
  });
})();