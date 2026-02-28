// Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger menu animation
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
    }
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Height of fixed header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('kontaktformular');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            const errorElements = form.querySelectorAll('.form-error');
            errorElements.forEach(error => error.remove());
            
            // Validate form
            let isValid = true;
            const requiredFields = ['name', 'email', 'nachricht'];
            
            requiredFields.forEach(fieldName => {
                const field = form.querySelector(`[name="${fieldName}"]`);
                if (field && !field.value.trim()) {
                    showFieldError(field, 'Dieses Feld ist erforderlich.');
                    isValid = false;
                }
            });
            
            // Validate email
            const emailField = form.querySelector('[name="email"]');
            if (emailField && emailField.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value.trim())) {
                    showFieldError(emailField, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                    isValid = false;
                }
            }
            
            if (isValid) {
                // Show success message
                showFormMessage('Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen.', 'success');
                
                // Reset form
                form.reset();
                
                // In a real application, you would send the form data to a server here
                console.log('Form submitted successfully');
            }
        });
    }
});

function showFieldError(field, message) {
    const error = document.createElement('div');
    error.className = 'form-error';
    error.style.color = '#dc3545';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.textContent = message;
    
    field.parentNode.appendChild(error);
    field.style.borderColor = '#dc3545';
    
    // Remove error when user starts typing
    field.addEventListener('input', function() {
        error.remove();
        field.style.borderColor = '';
    });
}

function showFormMessage(message, type) {
    const form = document.getElementById('kontaktformular');
    if (!form) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 4px;
        font-weight: 500;
        ${type === 'success' ? 
            'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
            'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    messageDiv.textContent = message;
    
    form.parentNode.insertBefore(messageDiv, form);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Scroll Animations
function handleScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.positionierung-item, .leistung-item, .gear-item, .crew-item, .referenz-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', handleScrollAnimations);

// Header scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (header) {
        if (scrollTop > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '';
        }
    }
    
    lastScrollTop = scrollTop;
});

// Active navigation highlighting
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = 80;
        
        if (window.pageYOffset >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavigation);
document.addEventListener('DOMContentLoaded', updateActiveNavigation);

// Add active state styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #000000 !important;
        font-weight: 600;
    }
    
    .form-error {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .form-message {
        animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
