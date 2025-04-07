document.addEventListener('DOMContentLoaded', function() {
    const LanguageManager = {
        init: function() {
            this.langSelect = document.getElementById('lang-select');
            this.translations = {
                en: {
                    home: "Home",
                    avatars: "Avatars",
                    timeline: "Timeline",
                    quiz: "Quiz",
                    compare: "Compare",
                    resources: "Resources",
                    // Add more translations as needed
                },
                hi: {
                    home: "होम",
                    avatars: "अवतार",
                    timeline: "समयरेखा",
                    quiz: "प्रश्नोत्तरी",
                    compare: "तुलना",
                    resources: "संसाधन",
                    // Add more translations as needed
                },
                sa: {
                    home: "गृहम्",
                    avatars: "अवतारः",
                    timeline: "कालरेखा",
                    quiz: "प्रश्नावली",
                    compare: "तुलना",
                    resources: "संसाधनानि",
                    // Add more translations as needed
                }
            };
            
            this.addEventListeners();
        },
        
        addEventListeners: function() {
            this.langSelect.addEventListener('change', () => {
                this.changeLanguage(this.langSelect.value);
            });
        },
        
        changeLanguage: function(lang) {
            if (!this.translations[lang]) return;
            
            // Update navigation items
            const navItems = document.querySelectorAll('#main-nav ul li a');
            navItems.forEach(item => {
                const key = item.getAttribute('href').replace('#', '');
                if (this.translations[lang][key]) {
                    item.textContent = this.translations[lang][key];
                }
            });
            
            // Store language preference
            localStorage.setItem('preferred-language', lang);
            
            // Dispatch event for other components to update
            document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
        },
        
        loadSavedLanguage: function() {
            const savedLang = localStorage.getItem('preferred-language');
            if (savedLang && this.translations[savedLang]) {
                this.langSelect.value = savedLang;
                this.changeLanguage(savedLang);
            }
        }
    };
    
    // Initialize language manager
    LanguageManager.init();
    LanguageManager.loadSavedLanguage();
});