// JavaScript for portfolio site
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio site loaded successfully!');
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this to a server
            alert(`Thank you, ${name}! Your message has been received.\n\nNote: This is a demo form. No actual message was sent.`);
            
            // Reset form
            contactForm.reset();
        });
    }
});