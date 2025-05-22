// Client-side validation for clfmweb

console.log("scripts.js loaded");

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            // Clear previous error/success messages
            clearMessages();

            // Get form field values
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');

            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const message = messageField.value.trim();

            let isValid = true;
            let errors = [];

            // Validate Name
            if (name === '') {
                isValid = false;
                errors.push({ field: nameField, message: 'Le nom est requis.' });
                nameField.classList.add('is-invalid');
            } else {
                nameField.classList.remove('is-invalid');
                nameField.classList.add('is-valid');
            }

            // Validate Email
            if (email === '') {
                isValid = false;
                errors.push({ field: emailField, message: 'L\'email est requis.' });
                emailField.classList.add('is-invalid');
            } else if (!isValidEmail(email)) {
                isValid = false;
                errors.push({ field: emailField, message: 'Veuillez entrer une adresse email valide.' });
                emailField.classList.add('is-invalid');
            } else {
                emailField.classList.remove('is-invalid');
                emailField.classList.add('is-valid');
            }

            // Validate Message
            if (message === '') {
                isValid = false;
                errors.push({ field: messageField, message: 'Le message est requis.' });
                messageField.classList.add('is-invalid');
            } else {
                messageField.classList.remove('is-invalid');
                messageField.classList.add('is-valid');
            }

            if (isValid) {
                // Display success message
                displayMessage('Merci pour votre message ! Nous vous recontacterons bientôt.', 'success');
                contactForm.reset(); // Clear form fields
                // Remove 'is-valid' classes after successful submission and reset
                nameField.classList.remove('is-valid');
                emailField.classList.remove('is-valid');
                messageField.classList.remove('is-valid');
            } else {
                // Display error messages
                let errorMessageText = 'Veuillez corriger les erreurs suivantes :<ul>';
                errors.forEach(function(error) {
                    errorMessageText += `<li>${error.message}</li>`;
                });
                errorMessageText += '</ul>';
                displayMessage(errorMessageText, 'danger');
            }
        });
    }
});

function isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayMessage(message, type) {
    const form = document.getElementById('contactForm');
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type} mt-3`;
    messageDiv.setAttribute('role', 'alert');
    messageDiv.innerHTML = message; // Use innerHTML to render list items for errors

    // Insert message before the form's first child (the first form group) or after the form
    form.parentNode.insertBefore(messageDiv, form);
}

function clearMessages() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function (alert) {
        alert.remove();
    });

    // Remove validation classes
    const fields = ['name', 'email', 'message'];
    fields.forEach(function(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.remove('is-invalid', 'is-valid');
        }
    });
}
