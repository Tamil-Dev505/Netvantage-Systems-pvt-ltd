console.log("NetVantage SaaS Website Loaded");

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

document.querySelectorAll(".ripple").forEach(button => {
    button.addEventListener("click", function(e) {
        const circle = document.createElement("span");
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.offsetX - diameter / 2}px`;
        circle.style.top = `${e.offsetY - diameter / 2}px`;
        this.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    });
});
const rings = document.querySelectorAll(".glass-ring");

document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    rings.forEach(ring => {
        ring.style.transform = `rotate(0deg) translate(${x}px, ${y}px)`;
    });
});
const particlesContainer = document.querySelector(".particles");

for (let i = 0; i < 60; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = Math.random() * 100 + "vh";

    const size = Math.random() * 3 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.animationDuration = (Math.random() * 5 + 5) + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";

    particlesContainer.appendChild(particle);
}
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-up").forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.8s ease";
    observer.observe(el);
});

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute("data-target");
            const suffix = counter.getAttribute("data-suffix") || "";
            let count = 0;
            const speed = target / 100;

            const updateCount = () => {
                if (count < target) {
                    count += speed;
                    counter.innerText = Math.ceil(count) + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + suffix;
                }
            };

            updateCount();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("form-success");

if (form) {
    // Form Validation
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phone === "" || re.test(phone);
    };

    const showError = (fieldId, message) => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        field.classList.add("error");
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
        }
    };

    const clearError = (fieldId) => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        field.classList.remove("error");
        if (errorElement) {
            errorElement.textContent = "";
            errorElement.style.display = "none";
        }
    };

    const validateForm = () => {
        let isValid = true;
        
        const name = document.getElementById("name").value.trim();
        if (name === "") {
            showError("name", "Name is required");
            isValid = false;
        } else {
            clearError("name");
        }

        const email = document.getElementById("email").value.trim();
        if (email === "") {
            showError("email", "Email is required");
            isValid = false;
        } else if (!validateEmail(email)) {
            showError("email", "Please enter a valid email");
            isValid = false;
        } else {
            clearError("email");
        }

        const phone = document.getElementById("phone").value.trim();
        if (phone !== "" && !validatePhone(phone)) {
            showError("phone", "Please enter a valid phone number");
            isValid = false;
        } else {
            clearError("phone");
        }

        const service = document.getElementById("service").value;
        if (service === "") {
            showError("service", "Please select a service");
            isValid = false;
        } else {
            clearError("service");
        }

        const message = document.getElementById("message").value.trim();
        if (message === "") {
            showError("message", "Message is required");
            isValid = false;
        } else if (message.length < 10) {
            showError("message", "Message must be at least 10 characters");
            isValid = false;
        } else {
            clearError("message");
        }

        return isValid;
    };

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        if (validateForm()) {
            successMsg.style.display = "block";
            form.style.opacity = "0.5";
            form.style.pointerEvents = "none";

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                successMsg.style.display = "none";
                form.style.opacity = "1";
                form.style.pointerEvents = "auto";
                form.reset();
            }, 3000);
        }
    });

    // Clear error on input
    ["name", "email", "phone", "service", "message"].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener("input", () => clearError(fieldId));
            field.addEventListener("change", () => clearError(fieldId));
        }
    });
}

// FAQ Toggle Functionality
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const faqHeader = item.querySelector(".faq-header");
    
    if (faqHeader) {
        faqHeader.addEventListener("click", () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains("active")) {
                    otherItem.classList.remove("active");
                }
            });
            
            // Toggle current item
            item.classList.toggle("active");
        });
    }
});

