// Custom JavaScript untuk website Pondok Pesantren

document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Preloader
    setTimeout(function() {
        document.querySelector('.preloader').classList.add('hide');
    }, 1000);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initialize Isotope for gallery filtering
    let galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        let iso = new Isotope(galleryContainer, {
            itemSelector: '.gallery-item',
            layoutMode: 'fitRows'
        });

        // Filter items on button click
        document.querySelectorAll('.gallery-filter .btn').forEach(button => {
            button.addEventListener('click', function() {
                let filterValue = this.getAttribute('data-filter');
                iso.arrange({ filter: filterValue });
                
                // Add active class to the current button
                document.querySelectorAll('.gallery-filter .btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }

    // Initialize GLightbox for gallery images
    const lightbox = GLightbox({
        selector: '.gallery-lightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
    });

    // Dynamic current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Tilt effect for feature boxes
    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach(box => {
        box.addEventListener('mousemove', function(e) {
            const boxRect = box.getBoundingClientRect();
            const x = e.clientX - boxRect.left;
            const y = e.clientY - boxRect.top;
            
            const xc = boxRect.width / 2;
            const yc = boxRect.height / 2;
            
            const dx = x - xc;
            const dy = y - yc;
            
            box.style.transform = `perspective(1000px) rotateY(${dx / 20}deg) rotateX(${-dy / 20}deg) translateZ(10px)`;
        });
        
        box.addEventListener('mouseleave', function() {
            box.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
        });
    });

    // Pulse effect for icons
    const icons = document.querySelectorAll('.icon-wrapper');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 1000);
        });
    });

    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        .pulse {
            animation: pulse 1s ease;
        }
    `;
    document.head.appendChild(style);
});