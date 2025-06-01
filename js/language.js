/**
 * Language Switcher Module for Portfolio
 */

class LanguageSwitcher {
    constructor() {
        this.currentLanguage = 'uk';
        this.init();
    }
    
    init() {
        this.setupLanguageSwitcher();
        this.initializeLanguageDisplay();
        this.loadSavedLanguage();
        
        console.log('Language switcher initialized! 🌍');
    }

    // Language switcher functionality
    setupLanguageSwitcher() {
        const languageSelector = document.querySelector('.language-selector');
        const languageCurrent = document.querySelector('.language-current');
        const languageOptions = document.querySelectorAll('.language-option');
        
        if (!languageSelector || !languageCurrent) {
            console.warn('Language selector elements not found');
            return;
        }
        
        // Toggle dropdown
        languageCurrent.addEventListener('click', (e) => {
            e.stopPropagation();
            languageSelector.classList.toggle('open');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageSelector.contains(e.target)) {
                languageSelector.classList.remove('open');
            }
        });
        
        // Handle language selection
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = option.getAttribute('data-lang');
                
                // Update current display
                this.updateCurrentLanguageDisplay(selectedLang);
                
                // Update active option
                languageOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // Switch language
                this.switchLanguage(selectedLang);
                
                // Close dropdown
                languageSelector.classList.remove('open');
            });
        });
        
        // Close dropdown on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                languageSelector.classList.remove('open');
            }
        });
    }

    updateCurrentLanguageDisplay(language) {
        const currentFlag = document.querySelector('.language-current .flag');
        const currentCode = document.querySelector('.language-current .lang-code');
        
        const languageData = {
            uk: { flag: '🇺🇦', code: 'UA' },
            en: { flag: '🇺🇸', code: 'EN' }
        };
        
        if (languageData[language] && currentFlag && currentCode) {
            currentFlag.textContent = languageData[language].flag;
            currentCode.textContent = languageData[language].code;
        }
    }

    switchLanguage(language) {
        console.log('Switching to language:', language);
        this.currentLanguage = language;
        
        // Remove all language hiding classes first
        const allElements = document.querySelectorAll('[data-lang]:not(.language-option)');
        allElements.forEach(element => {
            element.classList.remove('lang-hidden');
        });
        
        // Hide elements that don't match the selected language
        if (language === 'uk') {
            const enElements = document.querySelectorAll('[data-lang="en"]:not(.language-option)');
            enElements.forEach(element => {
                element.classList.add('lang-hidden');
            });
        } else if (language === 'en') {
            const ukElements = document.querySelectorAll('[data-lang="uk"]:not(.language-option)');
            ukElements.forEach(element => {
                element.classList.add('lang-hidden');
            });
        }

        // Update logo based on language
        this.updateLogo(language);

        // Update document language
        document.documentElement.lang = language;
        
        // Update page title and meta description
        this.updatePageMeta(language);
        
        // Save language preference
        try {
            localStorage.setItem('portfolio-language', language);
        } catch (e) {
            console.log('Language preference could not be saved');
        }
        
        // Count visible elements for debug
        const visibleElements = document.querySelectorAll(`[data-lang="${language}"]:not(.language-option):not(.lang-hidden)`);
        console.log(`Language switched to: ${language}, visible elements:`, visibleElements.length);
    }

    updateLogo(language) {
        const logo = document.getElementById('logoElement');
        if (logo) {
            // Remove any existing language classes
            logo.classList.remove('lang-uk', 'lang-en');
            
            if (language === 'en') {
                logo.textContent = 'L';
                logo.classList.add('lang-en');
            } else {
                logo.textContent = 'Л';
                logo.classList.add('lang-uk');
            }
        }
    }

    updatePageMeta(language) {
        const titles = {
            uk: 'Лев — Frontend Developer',
            en: 'Lev — Frontend Developer'
        };
        
        const descriptions = {
            uk: 'Frontend розробник з 1 роком досвіду. Створюю сучасні веб-додатки з React, JavaScript, HTML/CSS.',
            en: 'Frontend developer with 1 year of experience. I create modern web applications with React, JavaScript, HTML/CSS.'
        };
        
        document.title = titles[language];
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = descriptions[language];
        }
    }

    // Initialize language display on page load
    initializeLanguageDisplay() {
        // Hide English content, show Ukrainian by default
        const enElements = document.querySelectorAll('[data-lang="en"]:not(.language-option)');
        enElements.forEach(element => {
            element.classList.add('lang-hidden');
        });
        
        // Ensure Ukrainian content is visible
        const ukElements = document.querySelectorAll('[data-lang="uk"]:not(.language-option)');
        ukElements.forEach(element => {
            element.classList.remove('lang-hidden');
        });

        // Set correct active option in menu
        const ukOption = document.querySelector('.language-option[data-lang="uk"]');
        const enOption = document.querySelector('.language-option[data-lang="en"]');
        
        if (ukOption) ukOption.classList.add('active');
        if (enOption) enOption.classList.remove('active');
        
        // Initialize logo for Ukrainian
        this.updateLogo('uk');
        
        // Update current display
        this.updateCurrentLanguageDisplay('uk');
        
        console.log('Language initialized with Ukrainian');
    }

    // Load saved language preference
    loadSavedLanguage() {
        try {
            const savedLanguage = localStorage.getItem('portfolio-language');
            if (savedLanguage && (savedLanguage === 'uk' || savedLanguage === 'en')) {
                this.currentLanguage = savedLanguage;
                
                // Update current display
                this.updateCurrentLanguageDisplay(savedLanguage);
                
                // Update active option
                const languageOptions = document.querySelectorAll('.language-option');
                languageOptions.forEach(option => {
                    option.classList.remove('active');
                    if (option.getAttribute('data-lang') === savedLanguage) {
                        option.classList.add('active');
                    }
                });
                
                // Apply saved language (this will also update the logo)
                this.switchLanguage(savedLanguage);
            }
        } catch (e) {
            console.log('Could not load language preference');
        }
    }

    // Public API methods
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    setLanguage(language) {
        if (language === 'uk' || language === 'en') {
            this.switchLanguage(language);
            
            // Update UI
            const languageOptions = document.querySelectorAll('.language-option');
            languageOptions.forEach(option => {
                option.classList.remove('active');
                if (option.getAttribute('data-lang') === language) {
                    option.classList.add('active');
                }
            });
            
            this.updateCurrentLanguageDisplay(language);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for main navigation to load first
    setTimeout(() => {
        window.languageSwitcher = new LanguageSwitcher();
    }, 100);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageSwitcher;
}