document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle');
    const messageDiv = document.querySelector('.message');

    // Password Visibility Toggle
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
        });
    }

    // Clear error styling when user types
    [emailInput, passwordInput].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                const field = input.closest('.field');
                if (field) field.classList.remove('invalid');
                const errorSpan = field ? field.querySelector('.error') : null;
                if (errorSpan) errorSpan.textContent = '';
                if (messageDiv) {
                    messageDiv.textContent = '';
                    messageDiv.className = 'message';
                }
            });
        }
    });

    // Form Validation on Submit
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            clearErrors();

            // Email Validation
            const emailValue = emailInput.value.trim();
            if (!emailValue) {
                showError(emailInput, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            // Password Validation
            const passwordValue = passwordInput.value.trim();
            if (!passwordValue) {
                showError(passwordInput, 'Password is required.');
                isValid = false;
            } else if (passwordValue.length < 6) {
                showError(passwordInput, 'Password must be at least 6 characters.');
                isValid = false;
            }

            // Success Handling
            if (isValid) {
                if (messageDiv) {
                    messageDiv.textContent = 'Login successful!';
                    messageDiv.className = 'message ok';
                }
                form.reset();
                if (toggleBtn) toggleBtn.textContent = 'Show';
            }
        });
    }

    // Helper Functions
    function showError(inputElement, errorMessage) {
        const field = inputElement.closest('.field');
        if (field) {
            field.classList.add('invalid');
            const errorSpan = field.querySelector('.error');
            if (errorSpan) errorSpan.textContent = errorMessage;
        }
    }

    function clearErrors() {
        document.querySelectorAll('.field').forEach(field => {
            field.classList.remove('invalid');
            const errorSpan = field.querySelector('.error');