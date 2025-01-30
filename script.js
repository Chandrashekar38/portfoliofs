// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
    
    // Save theme preference
    const isDark = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Image Slider Class
class ImageSlider {
    constructor() {
        this.sliderContainer = document.querySelector('.slider-container');
        this.slides = document.querySelectorAll('.slide');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        // Create dots
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        
        // Set first slide as active
        this.slides[0].classList.add('active');
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause autoplay on hover
        this.sliderContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    updateSlides() {
        // Update slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === this.currentSlide) {
                slide.classList.add('active');
            }
        });
        
        // Update dots
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === this.currentSlide) {
                dot.classList.add('active');
            }
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlides();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlides();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlides();
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000); // Change slide every 5 seconds
    }
    
    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Document Load Event Handler
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Initialize slider if it exists
    if (document.querySelector('.image-slider')) {
        new ImageSlider();
    }

    // Initialize smooth scroll
    initSmoothScroll();

    // Initialize form handling
    initFormHandling();
});

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
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
}

// Navigation Background Change on Scroll
const nav = document.querySelector('.nav-container');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.background = document.body.classList.contains('light-theme') 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(26, 26, 26, 0.95)';
    } else {
        nav.style.background = document.body.classList.contains('light-theme')
            ? 'rgba(255, 255, 255, 0.7)'
            : 'rgba(26, 26, 26, 0.7)';
    }
});

// Form Handling
function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // You can add your form submission logic here
            console.log('Form submitted:', data);
            
            // Optional: Show success message
            showFormMessage('Message sent successfully!', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Form Message Helper
function showFormMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('contact-form');
    form.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Add scroll reveal animations
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});

// Optional: Add loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('loader--hidden');
    }
});