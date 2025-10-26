// Main entry point for the application
import { auth } from './auth.js';
import { showToast } from './toast.js';

// Initialize auth on page load
auth.initAuth();

// Export globals for inline scripts
window.auth = auth;
window.showToast = showToast;

