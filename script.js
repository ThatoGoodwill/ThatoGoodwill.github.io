document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Theme Toggle Functionality
const themeToggle = document.getElementById('theme-switch');
const root = document.documentElement;

// Check for saved theme preference or use preferred color scheme
const currentTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the current theme
if (currentTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
}

// Theme switch event listener
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    themeToggle.checked = e.matches;
    localStorage.setItem('theme', newTheme);
});
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    // Add this to your existing script.js
// Project hover effects
document.querySelectorAll('.project-card').forEach(card => {
    const image = card.querySelector('.project-image');
    const category = card.getAttribute('data-category');
    
    // Set different hover effects based on category
    card.addEventListener('mouseenter', () => {
        if (category === 'web') {
            image.style.transform = 'scale(1.05)';
            image.style.filter = 'brightness(1.1)';
        } else if (category === 'app') {
            image.style.transform = 'rotate(1deg) scale(1.03)';
        } else if (category === 'design') {
            image.style.filter = 'contrast(1.1) brightness(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        image.style.transform = '';
        image.style.filter = '';
    });
});

// Add click event for project cards to open the first link
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking on a link directly
        if (!e.target.closest('a')) {
            const firstLink = card.querySelector('.project-links a');
            if (firstLink) {
                window.open(firstLink.href, '_blank');
            }
        }
    });
});
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            if (isElementInViewport(bar) && !bar.style.width) {
                bar.style.width = level + '%';
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run once on page load
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just log it and show an alert
            console.log({ name, email, subject, message });
            
            alert('Thank you for your message, Thato will get back to you soon!');
            contactForm.reset();
        });
    }
    
    // Initialize animations when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-image, .about-text, .skills-category, .project-card, .timeline-item, .cert-item');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
}
);
