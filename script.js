document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerButton && navLinks) {
        hamburgerButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerButton.classList.toggle('active');
            
            // Update ARIA attribute
            const isExpanded = navLinks.classList.contains('active');
            hamburgerButton.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Optional: Close mobile menu when a link is clicked
    if (navLinks) {
       const links = navLinks.querySelectorAll('a');
       links.forEach(link => {
           link.addEventListener('click', () => {
               if (navLinks.classList.contains('active')) {
                   navLinks.classList.remove('active');
                   hamburgerButton.classList.remove('active');
                   hamburgerButton.setAttribute('aria-expanded', 'false');
               }
           });
       });
    }

    // Dynamic Year for Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        // Assuming subject is not mandatory for this example, but can be added.

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual submission for now
            let isValid = true;

            // Validate Name
            if (!validateRequired(nameInput)) {
                isValid = false;
            }

            // Validate Email
            if (!validateEmail(emailInput)) {
                isValid = false;
            }

            // Validate Message
            if (!validateRequired(messageInput)) {
                isValid = false;
            }

            if (isValid) {
                // If form is valid, you would typically submit it here
                // For now, just show a success message or clear the form
                alert('Form submitted successfully! (This is a demo)');
                contactForm.reset(); // Clear the form
                clearAllErrors(); // Clear any lingering error messages/styles
            }
        });

        function validateRequired(inputElement) {
            clearError(inputElement);
            if (inputElement.value.trim() === '') {
                setError(inputElement, `${inputElement.previousElementSibling.textContent.replace(':', '')} is required.`);
                return false;
            }
            return true;
        }

        function validateEmail(emailElement) {
            clearError(emailElement);
            const emailValue = emailElement.value.trim();
            if (emailValue === '') {
                setError(emailElement, 'Email is required.');
                return false;
            }
            // Basic email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                setError(emailElement, 'Please enter a valid email address.');
                return false;
            }
            return true;
        }

        function setError(inputElement, message) {
            inputElement.classList.add('invalid');
            const formGroup = inputElement.parentElement;
            let errorMessageElement = formGroup.querySelector('.error-message');
            if (!errorMessageElement) {
                errorMessageElement = document.createElement('div');
                errorMessageElement.className = 'error-message';
                formGroup.appendChild(errorMessageElement); // Append after the input
            }
            errorMessageElement.textContent = message;
            errorMessageElement.style.display = 'block'; // Show the error message
        }

        function clearError(inputElement) {
            inputElement.classList.remove('invalid');
            const formGroup = inputElement.parentElement;
            const errorMessageElement = formGroup.querySelector('.error-message');
            if (errorMessageElement) {
                errorMessageElement.textContent = '';
                errorMessageElement.style.display = 'none'; // Hide the error message
            }
        }
        
        function clearAllErrors() {
            const inputsWithErrors = contactForm.querySelectorAll('.invalid');
            inputsWithErrors.forEach(input => clearError(input));
        }

        // Optional: Real-time validation on blur or input
        [nameInput, emailInput, messageInput].forEach(input => {
            if(input) { // Check if element exists
                input.addEventListener('blur', () => {
                    if (input.id === 'name') validateRequired(input);
                    if (input.id === 'email') validateEmail(input);
                    if (input.id === 'message') validateRequired(input);
                });
            }
        });
    }

    // --- Scroll-triggered Fade-in Animations ---
    const sectionsToFade = document.querySelectorAll('section'); // Target all <section> elements

    const animationOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Unobserve after animation to save resources
                // observer.unobserve(entry.target); 
            } else {
                // Optional: Remove class to re-animate if user scrolls up and down
                // entry.target.classList.remove('is-visible'); 
            }
        });
    }, animationOptions);

    sectionsToFade.forEach(section => {
        if (section) { // Check if section exists
           section.classList.add('fade-in-section'); // Add the initial animation class
           sectionObserver.observe(section);
        }
    });
});
