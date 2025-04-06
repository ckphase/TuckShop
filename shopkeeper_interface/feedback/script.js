// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        // Close mobile menu if open
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
    });
});

// Animate statistics when in view
const stats = document.querySelectorAll('.number');
let animated = false;

function animateStats() {
    if (animated) return;

    const statsSection = document.querySelector('.stats');
    const statsSectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (statsSectionTop < windowHeight * 0.75) {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50; // Adjust for animation speed
            
            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCount();
        });
        animated = true;
    }
}

window.addEventListener('scroll', animateStats);

// Form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Reset form
    contactForm.reset();
    
    // Show success message (you can customize this)
    alert('Thank you for your message! We will get back to you soon.');
});
// Mobile Navbar Toggle
document.querySelector(".menu-btn").addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("show");
});

// Contact Form Submission
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
        alert("Please fill out all fields.");
        return;
    }

    // Here, you can send data to an API or save it locally
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    alert("Your message has been sent successfully!");
    document.getElementById("contact-form").reset();
});
