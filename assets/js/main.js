/**
 * Main JavaScript for Pondok Pesantren Assalafi Al Aulia
 * Theme: Modern Islamic Design with NU Identity
 * Updated version with enhanced features
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Navbar scroll effect with improved animation
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
                navbar.classList.add('shadow');
            } else {
                navbar.classList.remove('navbar-scrolled');
                navbar.classList.remove('shadow');
            }
        });
    }

    // Smooth scroll for anchor links with improved offset calculation
    document.querySelectorAll('a.scroll-to').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Counter animation with improved performance
    const counterElements = document.querySelectorAll('.counter-number');
    if (counterElements.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-count'));
                    let count = 0;
                    const duration = 2000; // ms
                    const increment = countTo / (duration / 16); // 60fps
                    
                    const updateCount = () => {
                        count += increment;
                        if (count < countTo) {
                            target.textContent = Math.ceil(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            target.textContent = countTo;
                        }
                    };
                    
                    requestAnimationFrame(updateCount);
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        counterElements.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Image gallery with lightbox effect
    const galleryImages = document.querySelectorAll('.gallery-item img');
    if (galleryImages.length > 0) {
        galleryImages.forEach(image => {
            image.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                document.body.appendChild(lightbox);
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = this.src;
                lightbox.appendChild(lightboxImg);
                
                lightbox.addEventListener('click', function() {
                    this.remove();
                });
                
                setTimeout(() => {
                    lightbox.classList.add('show');
                }, 10);
            });
        });
    }
    
    // Add back to top button functionality
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        // Create back to top button if it doesn't exist
        const button = document.createElement('button');
        button.id = 'back-to-top';
        button.className = 'back-to-top-btn';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(button);
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });
    }
    
    // Enhanced mobile menu
    const mobileMenuToggle = document.querySelector('.navbar-toggler');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.body.classList.toggle('mobile-menu-open');
        });
    }
    
    // Add current year to footer
    const yearElements = document.querySelectorAll('.current-year');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }
    
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
        });
    });
});

// Hide preloader when page is fully loaded
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('preloader-hide');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
                        if (count < countTo) {
                            count += increment;
                            target.textContent = Math.ceil(count);
                            setTimeout(updateCount, 10);
                        } else {
                            target.textContent = countTo;
                        }
                    
                    updateCount();
                    observer.unobserve(target);
                
            ;

        counterElements.forEach(counter => {
            counterObserver.observe(counter);
        });
    

    // Animate on scroll
    const animateElements = document.querySelectorAll('.animate-fade-in');
    if (animateElements.length > 0) {
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(element => {
            animateObserver.observe(element);
        });
    }

    // Gallery filter
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.remove('hidden');
                        }, 10);
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.remove('hidden');
                        }, 10);
                    } else {
                        item.classList.add('hidden');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    if (forms.length > 0) {
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    // If using AJAX form submission
                    if (form.classList.contains('ajax-form')) {
                        event.preventDefault();
                        const formStatus = form.querySelector('.form-status');
                        
                        // Show loading message
                        if (formStatus) {
                            formStatus.innerHTML = '<div class="alert alert-info">Mengirim pesan...</div>';
                        }
                        
                        // Simulate form submission
                        setTimeout(() => {
                            if (formStatus) {
                                formStatus.innerHTML = '<div class="alert alert-success">Pesan berhasil dikirim! Kami akan segera menghubungi Anda.</div>';
                            }
                            form.reset();
                        }, 1500);
                    }
                }
                
                form.classList.add('was-validated');
            }, false);
        });
    }

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        setTimeout(typeWriter, 500);
    }

    // Parallax effect for hero background
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.backgroundPosition = `center ${rate}px`;
        });
    }
