import { auth } from './auth.js';

const form = document.getElementById('signupForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const loadingSpinner = document.getElementById('loadingSpinner');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation matching React/Vue
    const errors = {};
    
    // Name validation
    if (!name.trim()) {
        errors.name = 'Name is required';
    } else if (name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!email.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!password.trim()) {
        errors.password = 'Password is required';
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (!confirmPassword.trim()) {
        errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(errors).length > 0) {
        Object.keys(errors).forEach(key => {
            const errorEl = document.getElementById(`${key}-error`);
            if (errorEl) {
                errorEl.textContent = errors[key];
                errorEl.classList.remove('hidden');
            }
        });
        
        // Auto-clear errors after 5 seconds
        setTimeout(() => {
            document.querySelectorAll('[id$="-error"]').forEach(el => {
                el.classList.add('hidden');
                el.textContent = '';
            });
        }, 5000);
        
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitText.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    
    const success = await auth.signup(name, email, password);
    
    if (success) {
        setTimeout(() => {
            window.location.href = './dashboard.html';
        }, 100);
    } else {
        submitBtn.disabled = false;
        submitText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
    }
});

