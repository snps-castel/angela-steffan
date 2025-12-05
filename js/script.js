// JavaScript for portfolio site
let translations = {};
let currentLang = localStorage.getItem('preferredLanguage') || 'de';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio site loaded successfully!');
    
    // Load initial language
    loadLanguage(currentLang);
    
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const langSwitcher = document.querySelector('.language-switcher');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            langSwitcher.classList.toggle('active');
            nav.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                langSwitcher.classList.remove('active');
                nav.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking overlay
        nav.addEventListener('click', function(e) {
            if (e.target === nav && nav.classList.contains('menu-open')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                langSwitcher.classList.remove('active');
                nav.classList.remove('menu-open');
            }
        });
    }
    
    // Language switcher functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    const htmlTag = document.documentElement;
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            
            // Update language
            currentLang = selectedLang;
            htmlTag.setAttribute('lang', selectedLang);
            localStorage.setItem('preferredLanguage', selectedLang);
            
            // Load and apply new language
            loadLanguage(selectedLang);
            
            // Update active state
            updateActiveLanguage(selectedLang);
            
            console.log(`Language switched to: ${selectedLang.toUpperCase()}`);
        });
    });
    
    function updateActiveLanguage(lang) {
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Initialize active language button
    updateActiveLanguage(currentLang);
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Get translated success message
            const successMsg = translations.contact?.form?.successMessage || 
                `Thank you, ${name}! Your message has been received.\n\nNote: This is a demo form. No actual message was sent.`;
            
            alert(successMsg.replace('{name}', name));
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Load language JSON file
async function loadLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load language file: ${lang}.json`);
        }
        translations = await response.json();
        applyTranslations();
    } catch (error) {
        console.error('Error loading language file:', error);
        // Fallback to default if language file fails to load
        if (lang !== 'de') {
            loadLanguage('de');
        }
    }
}

// Apply translations to the page
function applyTranslations() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(key);
        
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update all placeholders with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getNestedTranslation(key);
        
        if (translation) {
            element.placeholder = translation;
        }
    });
}

// Get nested translation value from key (e.g., "nav.home")
function getNestedTranslation(key) {
    return key.split('.').reduce((obj, k) => obj?.[k], translations);
}