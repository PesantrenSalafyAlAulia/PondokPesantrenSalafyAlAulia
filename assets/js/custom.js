/**
 * Custom JavaScript for Pondok Pesantren Website
 * Enhanced animations and interactivity with error handling and performance optimizations
 */

// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize preloader
        initPreloader();
        
        // Initialize navbar scroll effect
        initNavbarScroll();
        
        // Initialize back to top button
        initBackToTop();
        
        // Initialize AOS (Animate On Scroll)
        initAOS();
        
        // Initialize gallery filtering if gallery exists
        if (document.querySelector('.gallery-filter')) {
            initGalleryFilter();
        }
        
        // Initialize counter animation if counters exist
        if (document.querySelector('.counter')) {
            initCounters();
        }
        
        // Initialize smooth scroll for anchor links
        initSmoothScroll();
        
        // Set current year in footer copyright
        setCurrentYear();
        
        // Initialize hover effects
        initHoverEffects();

        // Initialize lazy loading
        initLazyLoading();

        // Initialize form validation
        initFormValidation();

        // Initialize typing effect
        initTypingEffect();

        // Initialize parallax
        initParallax();
    } catch (error) {
        console.error('Error initializing page features:', error);
    }
});

/**
 * Throttle function for performance optimization
 */
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Initialize preloader
 */
const initPreloader = () => {
    try {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 500);
            });
        }
    } catch (error) {
        console.error('Error initializing preloader:', error);
    }
};

/**
 * Initialize navbar scroll effect
 */
const initNavbarScroll = () => {
    try {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const handleScroll = () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('shadow', 'bg-white');
                    navbar.classList.remove('navbar-dark');
                    navbar.classList.add('navbar-light');
                } else {
                    navbar.classList.remove('shadow', 'bg-white');
                    if (navbar.classList.contains('navbar-transparent')) {
                        navbar.classList.remove('navbar-light');
                        navbar.classList.add('navbar-dark');
                    }
                }
            };
            window.addEventListener('scroll', throttle(handleScroll, 100));
        }
    } catch (error) {
        console.error('Error initializing navbar scroll:', error);
    }
};

/**
 * Initialize back to top button
 */
const initBackToTop = () => {
    try {
        const backToTopButton = document.querySelector('.back-to-top');
        if (backToTopButton) {
            const handleScroll = () => {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('active');
                } else {
                    backToTopButton.classList.remove('active');
                }
            };
            window.addEventListener('scroll', throttle(handleScroll, 100));
            
            backToTopButton.addEventListener('click', (e) => {
                e.preventDefault();
                // Respect user's reduced motion preference
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                window.scrollTo({
                    top: 0,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            });
        }
    } catch (error) {
        console.error('Error initializing back to top button:', error);
    }
};

/**
 * Initialize AOS (Animate On Scroll)
 */
const initAOS = () => {
    try {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                mirror: false,
                disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            });
        }
    } catch (error) {
        console.error('Error initializing AOS:', error);
    }
};

/**
 * Initialize gallery filtering with Isotope
 */
const initGalleryFilter = () => {
    try {
        // Initialize Isotope
        const galleryContainer = document.querySelector('.gallery-container');
        let iso;
        
        if (galleryContainer && typeof Isotope !== 'undefined') {
            iso = new Isotope(galleryContainer, {
                itemSelector: '.gallery-item-wrapper',
                layoutMode: 'fitRows'
            });
            
            // Filter items on button click
            const filterButtons = document.querySelectorAll('.gallery-filter .btn');
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filterValue = this.getAttribute('data-filter');
                    
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // Add active class to current button
                    this.classList.add('active');
                    
                    // Filter items
                    iso.arrange({
                        filter: filterValue
                    });
                });
            });
        }
        
        // Initialize Lightbox
        if (typeof GLightbox !== 'undefined') {
            GLightbox({
                selector: '.gallery-lightbox',
                touchNavigation: true,
                loop: true,
                autoplayVideos: true
            });
        }
    } catch (error) {
        console.error('Error initializing gallery filter:', error);
    }
};

/**
 * Initialize counter animation
 */
const initCounters = () => {
    try {
        const counters = document.querySelectorAll('.counter');
        
        const countUp = () => {
            counters.forEach(counter => {
                if (isElementInViewport(counter) && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        counter.textContent = Math.round(current);
                        
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        }
                    }, 16);
                }
            });
        };
        
        // Run on scroll
        window.addEventListener('scroll', throttle(countUp, 100));
        // Run once on page load
        countUp();
    } catch (error) {
        console.error('Error initializing counters:', error);
    }
};

/**
 * Check if element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Initialize smooth scroll for anchor links
 */
const initSmoothScroll = () => {
    try {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = e.currentTarget.getAttribute('href');
                
                if (targetId === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Respect user's reduced motion preference
                    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Offset for navbar
                        behavior: prefersReducedMotion ? 'auto' : 'smooth'
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error initializing smooth scroll:', error);
    }
};

/**
 * Set current year in footer copyright
 */
const setCurrentYear = () => {
    try {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    } catch (error) {
        console.error('Error setting current year:', error);
    }
};

/**
 * Initialize hover effects
 */
const initHoverEffects = () => {
    try {
        // Add tilt effect to feature boxes (optimized)
        const featureBoxes = document.querySelectorAll('.feature-box');

        featureBoxes.forEach(box => {
            box.addEventListener('mousemove', throttle((e) => {
                const boxRect = box.getBoundingClientRect();
                const boxCenterX = boxRect.left + boxRect.width / 2;
                const boxCenterY = boxRect.top + boxRect.height / 2;

                const mouseX = e.clientX;
                const mouseY = e.clientY;

                const angleX = (mouseY - boxCenterY) / 30; // Reduced intensity
                const angleY = (boxCenterX - mouseX) / 30;

                box.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`; // Reduced movement
            }, 50));

            box.addEventListener('mouseleave', () => {
                box.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // Add pulse effect to icons on hover
        const icons = document.querySelectorAll('.icon-wrapper');

        icons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.classList.add('icon-pulse');
            });

            icon.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    icon.classList.remove('icon-pulse');
                }, 1000);
            });
        });

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
    } catch (error) {
        console.error('Error initializing hover effects:', error);
    }
};

/**
 * Initialize lazy loading for images
 */
const initLazyLoading = () => {
    try {
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
    } catch (error) {
        console.error('Error initializing lazy loading:', error);
    }
};

/**
 * Initialize form validation
 */
const initFormValidation = () => {
    try {
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
    } catch (error) {
        console.error('Error initializing form validation:', error);
    }
};

/**
 * Initialize typing effect for hero title
 */
const initTypingEffect = () => {
    try {
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
    } catch (error) {
        console.error('Error initializing typing effect:', error);
    }
};

/**
 * Initialize parallax effect for hero background
 */
const initParallax = () => {
    try {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.backgroundPosition = `center ${rate}px`;
            });
        }
    } catch (error) {
        console.error('Error initializing parallax:', error);
    }
};
