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

    setupLanguageSwitcher() {
        const languageSelector = document.querySelector('.language-selector');
        const languageCurrent = document.querySelector('.language-current');
        const languageOptions = document.querySelectorAll('.language-option');
        
        if (!languageSelector || !languageCurrent) {
            console.warn('Language selector elements not found');
            return;
        }
        
        languageCurrent.addEventListener('click', (e) => {
            e.stopPropagation();
            languageSelector.classList.toggle('open');
        });
        
        document.addEventListener('click', (e) => {
            if (!languageSelector.contains(e.target)) {
                languageSelector.classList.remove('open');
            }
        });
        
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = option.getAttribute('data-lang');
                
                this.updateCurrentLanguageDisplay(selectedLang);
                
                languageOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                this.switchLanguage(selectedLang);
                
                languageSelector.classList.remove('open');
            });
        });
        
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
        
        const allElements = document.querySelectorAll('[data-lang]:not(.language-option)');
        allElements.forEach(element => {
            element.classList.remove('lang-hidden');
        });
        
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

        this.updateLogo(language);
        document.documentElement.lang = language;
        this.updatePageMeta(language);
        
        try {
            localStorage.setItem('portfolio-language', language);
        } catch (e) {
            console.log('Language preference could not be saved');
        }
        
        const visibleElements = document.querySelectorAll(`[data-lang="${language}"]:not(.language-option):not(.lang-hidden)`);
        console.log(`Language switched to: ${language}, visible elements:`, visibleElements.length);
    }

    updateLogo(language) {
        const logo = document.getElementById('logoElement');
        if (logo) {
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

    initializeLanguageDisplay() {
        const enElements = document.querySelectorAll('[data-lang="en"]:not(.language-option)');
        enElements.forEach(element => {
            element.classList.add('lang-hidden');
        });
        
        const ukElements = document.querySelectorAll('[data-lang="uk"]:not(.language-option)');
        ukElements.forEach(element => {
            element.classList.remove('lang-hidden');
        });

        const ukOption = document.querySelector('.language-option[data-lang="uk"]');
        const enOption = document.querySelector('.language-option[data-lang="en"]');
        
        if (ukOption) ukOption.classList.add('active');
        if (enOption) enOption.classList.remove('active');
        
        this.updateLogo('uk');
        this.updateCurrentLanguageDisplay('uk');
        
        console.log('Language initialized with Ukrainian');
    }

    loadSavedLanguage() {
        try {
            const savedLanguage = localStorage.getItem('portfolio-language');
            if (savedLanguage && (savedLanguage === 'uk' || savedLanguage === 'en')) {
                this.currentLanguage = savedLanguage;
                
                this.updateCurrentLanguageDisplay(savedLanguage);
                
                const languageOptions = document.querySelectorAll('.language-option');
                languageOptions.forEach(option => {
                    option.classList.remove('active');
                    if (option.getAttribute('data-lang') === savedLanguage) {
                        option.classList.add('active');
                    }
                });
                
                this.switchLanguage(savedLanguage);
            }
        } catch (e) {
            console.log('Could not load language preference');
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    setLanguage(language) {
        if (language === 'uk' || language === 'en') {
            this.switchLanguage(language);
            
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

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.languageSwitcher = new LanguageSwitcher();
    }, 100);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageSwitcher;
}