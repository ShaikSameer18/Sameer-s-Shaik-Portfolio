// Welcome Animation Controller
class WelcomeAnimationController {
    constructor() {
        this.welcomeOverlay = document.getElementById('welcome-overlay');
        this.navbar = document.querySelector('.navbar');
        this.hero = document.querySelector('.hero');
        this.sections = document.querySelectorAll('section');
        this.typedTextElement = document.querySelector('.typed-text');
        
        this.typingTexts = [
            "Computer Science Graduate",
            "Data Science Enthusiast", 
            "Software Developer",
            "Machine Learning Engineer",
            "Problem Solver"
        ];
        
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        
        this.init();
    }
    
    init() {
        // Show welcome overlay on page load
        this.showWelcomeOverlay();
        
        // Start typing animation after logo animation
        setTimeout(() => {
            this.startTypingAnimation();
        }, 2000);
        
        // Hide welcome overlay after animation completes
        setTimeout(() => {
            this.hideWelcomeOverlay();
        }, 6000); // 6 seconds total duration
    }
    
    showWelcomeOverlay() {
        this.welcomeOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    hideWelcomeOverlay() {
        this.welcomeOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Show main content with animations
        setTimeout(() => {
            this.showMainContent();
        }, 500);
    }
    
    showMainContent() {
        // Show navbar
        this.navbar.classList.add('show');
        
        // Show hero section
        setTimeout(() => {
            this.hero.classList.add('show');
        }, 300);
        
        // Show other sections with staggered animation
        this.sections.forEach((section, index) => {
            if (section.id !== 'home') {
                setTimeout(() => {
                    section.classList.add('show');
                }, 600 + (index * 200));
            }
        });
    }
    
    startTypingAnimation() {
        this.typeText();
    }
    
    typeText() {
        const currentText = this.typingTexts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.typedTextElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.typedTextElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        let typeSpeed = this.isDeleting ? 50 : 100;
        
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
            typeSpeed = 500; // Pause before next text
        }
        
        setTimeout(() => this.typeText(), typeSpeed);
    }
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced Contact Form with EmailJS Integration
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = this.form.querySelector('.submit-btn');
        this.originalBtnContent = this.submitBtn.innerHTML;
        this.isSubmitting = false;
        
        // EmailJS Configuration - Updated with your credentials
        this.emailjsConfig = {
            serviceId: 'service_d1vkzzr',
            templateId: 'template_4cfdtfr',
            publicKey: 'bJBhsfDvX4Ksk07DZ'
        };
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.addInputValidation();
        this.loadEmailJS();
    }
    
    loadEmailJS() {
        // Load EmailJS library
        if (!window.emailjs) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
            script.onload = () => {
                emailjs.init(this.emailjsConfig.publicKey);
                console.log('EmailJS initialized successfully');
            };
            document.head.appendChild(script);
        } else {
            emailjs.init(this.emailjsConfig.publicKey);
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!this.validateForm(data)) {
            this.showMessage('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        this.setSubmittingState(true);
        
        try {
            // Send email using EmailJS with your configured credentials
            const result = await emailjs.sendForm(
                this.emailjsConfig.serviceId,
                this.emailjsConfig.templateId,
                this.form,
                this.emailjsConfig.publicKey
            );
            
            console.log('Email sent successfully:', result);
            this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();
            
        } catch (error) {
            console.error('Failed to send email:', error);
            
            // Fallback to mailto if EmailJS fails
            this.showMessage('EmailJS failed, opening your email client as backup...', 'info');
            setTimeout(() => {
                this.handleMailtoFallback(data);
            }, 1000);
        } finally {
            this.setSubmittingState(false);
        }
    }
    
    handleMailtoFallback(data) {
        const mailtoLink = `mailto:sameershaik1301@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;
        window.location.href = mailtoLink;
    }
    
    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return data.name.trim() && 
               emailRegex.test(data.email) && 
               data.subject.trim() && 
               data.message.trim();
    }
    
    setSubmittingState(isSubmitting) {
        this.isSubmitting = isSubmitting;
        
        if (isSubmitting) {
            this.submitBtn.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                <span>Sending...</span>
            `;
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.innerHTML = this.originalBtnContent;
            this.submitBtn.disabled = false;
        }
    }
    
    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Insert message before submit button
        this.form.insertBefore(messageDiv, this.submitBtn);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
    
    addInputValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateInput(input));
            input.addEventListener('input', () => this.clearInputError(input));
        });
    }
    
    validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        
        if (input.hasAttribute('required') && !value) {
            isValid = false;
        } else if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }
        
        if (!isValid) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
        
        return isValid;
    }
    
    clearInputError(input) {
        input.classList.remove('error');
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-card').forEach(el => {
    observer.observe(el);
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill category hover effects
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotate(2deg)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize welcome animation controller
    new WelcomeAnimationController();
    
    // Initialize contact form
    new ContactFormHandler();
    
    console.log('Portfolio loaded successfully with welcome animation!');
});

// Add CSS for active nav link and enhanced animations
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);