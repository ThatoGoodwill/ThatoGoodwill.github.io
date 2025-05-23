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
   function toggleReadMore() {
    var moreText = document.querySelector(".more-text");
    var btnText = document.getElementById("readMoreBtn");

    if (moreText.style.display === "none" || moreText.style.display === "") {
      moreText.style.display = "inline";
      btnText.textContent = "Read Less";
    } else {
      moreText.style.display = "none";
      btnText.textContent = "Read More";
    }
  }
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
    
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        const result = await response.json();
        
        if (response.ok) {
            // Success - show confirmation
            alert('✓ Message sent successful! thank you for contacting me');
            form.reset();
        } else {
            // Show error from Formspree
            throw new Error(result.error || 'Submission failed (server error)');
        }
    } catch (error) {
        console.error('Form error:', error);
        
        // User-friendly error messages
        if (error.message.toLowerCase().includes('failed to fetch')) {
            alert('⚠️ Network issue. Please check your connection.');
        } else if (error.message.toLowerCase().includes('formspree')) {
            alert('⚠️ Form service busy. Please email me directly or try later.');
        } else {
            alert(`⚠️ Error: ${error.message}`);
        }
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
}
);
