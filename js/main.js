/**
 * Main Navigation Logic for Scroll Portfolio with Multilingual Support
 */

class ScrollPortfolioNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav a');
        this.sections = document.querySelectorAll('.section');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateActiveNav();
        
        console.log('Portfolio navigation initialized! 🚀');
    }
    
    bindEvents() {
        // Navigation clicks - handle both language versions
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Scroll listener with throttling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                this.updateActiveNav();
            }, 10);
        });
    }
    
    updateActiveNav() {
        let currentSection = '';
        
        this.sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = section.id;
            }
        });
        
        // Update active state for all language versions of nav links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update navigation text based on language
    updateNavigation(language) {
        // Navigation items remain the same in both languages
        // as they are universal terms (Intro, Work, Values, etc.)
        console.log(`Navigation updated for language: ${language}`);
    }
    
    // Public API methods
    scrollToSection(sectionId) {
        const section = document.querySelector(`#${sectionId}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    getCurrentSection() {
        let currentSection = '';
        this.sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = section.id;
            }
        });
        return currentSection;
    }
    
    // Refresh navigation links (useful after language switch)
    refreshNavigation() {
        this.navLinks = document.querySelectorAll('.nav a');
        this.updateActiveNav();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioNav = new ScrollPortfolioNavigation();
    
    // Integration with language switcher
    setTimeout(() => {
        if (window.languageSwitcher) {
            // Hook into language switch to update navigation if needed
            const originalSwitchLanguage = window.languageSwitcher.switchLanguage;
            window.languageSwitcher.switchLanguage = function(language) {
                originalSwitchLanguage.call(this, language);
                
                // Update navigation after language switch
                if (window.portfolioNav) {
                    window.portfolioNav.updateNavigation(language);
                    window.portfolioNav.refreshNavigation();
                }
            };
        }
    }, 200);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollPortfolioNavigation;
}