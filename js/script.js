// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => {
        n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Project Carousel
const carouselTrack = document.querySelector('.carousel-track');
const btnLeft = document.querySelector('.carousel-btn-left');
const btnRight = document.querySelector('.carousel-btn-right');

if (carouselTrack && btnLeft && btnRight) {
    let currentIndex = 0;

    function getVisibleCount() {
        return window.innerWidth <= 768 ? 1 : 3;
    }

    function getTotalCards() {
        return carouselTrack.children.length;
    }

    function updateCarousel() {
        const visibleCount = getVisibleCount();
        const totalCards = getTotalCards();
        const maxIndex = totalCards - visibleCount;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const gap = 24; // 1.5rem
        const viewportWidth = carouselTrack.parentElement.offsetWidth;
        const cardWidth = (viewportWidth - gap * (visibleCount - 1)) / visibleCount;

        Array.from(carouselTrack.children).forEach(card => {
            card.style.width = cardWidth + 'px';
        });

        const offset = currentIndex * (cardWidth + gap);
        carouselTrack.style.transform = `translateX(-${offset}px)`;

        btnLeft.disabled = currentIndex === 0;
        btnRight.disabled = currentIndex >= maxIndex;
    }

    btnLeft.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
    });

    btnRight.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 253, 255, 0.99)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 253, 255, 0.97)';
        header.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.publication-item, .experience-item, .area-card, .project-card, .award-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading state for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        const originalText = link.textContent;
        link.textContent = 'Opening...';
        setTimeout(() => {
            link.textContent = originalText;
        }, 2000);
    });
});

// Simple form validation if contact form exists
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const email = contactForm.querySelector('input[type="email"]');
        const message = contactForm.querySelector('textarea');
        
        if (!email.value || !message.value) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
}