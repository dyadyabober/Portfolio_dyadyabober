/**
 * Scroll to Top Button Functionality
 */

class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollToTop');
        this.threshold = 300; // Show button after scrolling 300px
        
        this.init();
    }
    
    init() {
        if (!this.button) {
            console.warn('Scroll to top button not found');
            return;
        }
        
        this.bindEvents();
        this.toggleVisibility();
    }
    
    bindEvents() {
        // Click event
        this.button.addEventListener('click', () => {
            this.scrollToTop();
        });
        
        // Scroll event with throttling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                this.toggleVisibility();
            }, 10);
        });
        
        // Keyboard support
        this.button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.scrollToTop();
            }
        });
    }
    
    toggleVisibility() {
        if (window.pageYOffset > this.threshold) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Focus management for accessibility
        setTimeout(() => {
            const firstFocusableElement = document.querySelector('a, button, input, textarea, select');
            if (firstFocusableElement) {
                firstFocusableElement.focus();
            }
        }, 500);
    }
    
    // Public API methods
    show() {
        this.button.classList.add('visible');
    }
    
    hide() {
        this.button.classList.remove('visible');
    }
    
    setThreshold(pixels) {
        this.threshold = pixels;
        this.toggleVisibility();
    }
}

// Smooth scroll enhancement for older browsers
class SmoothScrollPolyfill {
    static init() {
        // Check if smooth scroll is supported
        if (!('scrollBehavior' in document.documentElement.style)) {
            this.polyfill();
        }
    }
    
    static polyfill() {
        // Simple polyfill for smooth scrolling
        const originalScrollTo = window.scrollTo;
        
        window.scrollTo = function(options) {
            if (typeof options === 'object' && options.behavior === 'smooth') {
                const start = window.pageYOffset;
                const target = options.top || 0;
                const distance = target - start;
                const duration = 500;
                let startTime = null;
                
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Easing function
                    const ease = progress * (2 - progress);
                    
                    window.scrollTo(0, start + distance * ease);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                requestAnimationFrame(animation);
            } else {
                originalScrollTo.apply(window, arguments);
            }
        };
    }
}

// Scroll progress indicator (optional enhancement)
class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.bindEvents();
    }
    
    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #60a5fa, #3b82f6);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        this.progressBar = progressBar;
    }
    
    bindEvents() {
        window.addEventListener('scroll', () => {
            this.updateProgress();
        });
    }
    
    updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        this.progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll to top button
    window.scrollToTop = new ScrollToTop();
    
    // Initialize smooth scroll polyfill
    SmoothScrollPolyfill.init();
    
    // Optional: Initialize scroll progress bar
    // Uncomment the line below if you want a progress bar at the top
    // window.scrollProgress = new ScrollProgress();
});

// Performance optimization: Intersection Observer for animations
class ScrollAnimations {
    constructor() {
        this.observeElements();
    }
    
    observeElements() {
        // Only run if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe elements that should animate
            const animateElements = document.querySelectorAll('.value-card, .skill-group, .job');
            animateElements.forEach(el => observer.observe(el));
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ScrollToTop, SmoothScrollPolyfill, ScrollProgress, ScrollAnimations };
}