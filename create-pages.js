const fs = require('fs');
const path = require('path');

// Create remaining HTML pages
const signupHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - TicketApp</title>
    <link rel="stylesheet" href="./css/styles.css">
</head>
<body>
<div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="absolute">
        <div class="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-60 float"></div>
        <div class="absolute top-40 right-20 w-16 h-16 bg-warning-200 rounded-full opacity-50 float" style="animation-delay: 1s"></div>
    </div>
    <div class="max-w-md w-full space-y-8 relative z-10">
        <div class="text-center">
            <a href="./index.html" class="text-3xl font-bold text-primary-600">TicketApp</a>
            <h2 class="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
            <p class="mt-2 text-sm text-gray-600">
                Or <a href="./login.html" class="font-medium text-primary-600 hover:text-primary-500">sign in to your existing account</a>
            </p>
        </div>
        <div class="card">
            <form class="space-y-6" id="signupForm">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                    <input type="text" id="name" required class="input-field" placeholder="Enter your full name">
                    <p id="name-error" class="mt-1 text-sm text-danger-600 hidden"></p>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                    <input type="email" id="email" required class="input-field" placeholder="Enter your email">
                    <p id="email-error" class="mt-1 text-sm text-danger-600 hidden"></p>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" id="password" required class="input-field" placeholder="Create a password">
                    <p id="password-error" class="mt-1 text-sm text-danger-600 hidden"></p>
                </div>
                <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
                    <input type="password" id="confirmPassword" required class="input-field" placeholder="Confirm your password">
                    <p id="confirmPassword-error" class="mt-1 text-sm text-danger-600 hidden"></p>
                </div>
                <div class="flex items-center">
                    <input id="agree-terms" type="checkbox" required class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                    <label for="agree-terms" class="ml-2 block text-sm text-gray-900">I agree to the <a href="#" class="text-primary-600 hover:text-primary-500">Terms</a></label>
                </div>
                <div>
                    <button type="submit" class="btn-primary w-full" id="submitBtn">
                        <span id="submitText">Create account</span>
                        <span id="loadingSpinner" class="hidden">Creating...</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
<div id="toast-container" class="fixed top-20 right-4 z-50 space-y-2"></div>
<script type="module" src="./js/signup.js"></script>
</body>
</html>`;

// Write signup.html
fs.writeFileSync(path.join(__dirname, 'public/signup.html'), signupHTML);

// Create signup.js
const signupJS = `import { auth } from './auth.js';

const form = document.getElementById('signupForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        document.getElementById('confirmPassword-error').textContent = 'Passwords do not match';
        return;
    }
    
    submitBtn.disabled = true;
    const success = await auth.signup(name, email, password);
    if (success) {
        setTimeout(() => window.location.href = './dashboard.html', 100);
    } else {
        submitBtn.disabled = false;
    }
});`;

fs.writeFileSync(path.join(__dirname, 'public/js/signup.js'), signupJS);

console.log('✅ Created signup.html and signup.js');

