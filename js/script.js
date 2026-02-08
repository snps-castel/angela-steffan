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
    
    // Initialize EmailJS with your Public Key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key from https://dashboard.emailjs.com/admin/account
    if (typeof emailjs !== 'undefined') {
        emailjs.init('YOUR_PUBLIC_KEY');
    }
    
    // Handle contact form submission with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Disable submit button during sending
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Send admin notification email
            emailjs.sendForm('YOUR_SERVICE_ID', 'template_admin', contactForm)
                .then(function(response) {
                    console.log('Admin email sent!', response.status, response.text);
                    
                    // Send user confirmation email
                    return emailjs.sendForm('YOUR_SERVICE_ID', 'template_user_confirm', contactForm);
                })
                .then(function(response) {
                    console.log('User confirmation sent!', response.status, response.text);
                    
                    // Show success message
                    const successMsg = translations.contact?.form?.successMessage || 
                        'Thank you! Your message has been sent successfully. I will respond within 24-48 hours.';
                    alert(successMsg);
                    
                    // Reset form
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    const errorMsg = translations.contact?.form?.errorMessage || 
                        'Oops! Something went wrong. Please try again or contact me directly via email.';
                    alert(errorMsg);
                    
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
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