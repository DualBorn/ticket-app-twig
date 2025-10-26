import { auth } from './auth.js';
import { showToast } from './toast.js';

function validateLoginForm(email, password) {
    const errors = {};
    
    if (!email.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid';
    }
    
    if (!password.trim()) {
        errors.password = 'Password is required';
    }
    
    return errors;
}

function displayErrors(errors) {
    Object.keys(errors).forEach(key => {
        const errorEl = document.getElementById(`${key}-error`);
        if (errorEl) {
            errorEl.textContent = errors[key];
            errorEl.classList.remove('hidden');
        }
    });
    
    setTimeout(() => {
        document.querySelectorAll('[id$="-error"]').forEach(el => {
            el.classList.add('hidden');
            el.textContent = '';
        });
    }, 5000);
}

const form = document.getElementById('loginForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const loadingSpinner = document.getElementById('loadingSpinner');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const errors = validateLoginForm(email, password);
    displayErrors(errors);
    
    if (Object.keys(errors).length === 0) {
        submitBtn.disabled = true;
        submitText.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
        
        const success = await auth.login(email, password);
        
        if (success) {
            setTimeout(() => {
                window.location.href = './dashboard.html';
            }, 100);
        } else {
            submitBtn.disabled = false;
            submitText.classList.remove('hidden');
            loadingSpinner.classList.add('hidden');
        }
    }
});

