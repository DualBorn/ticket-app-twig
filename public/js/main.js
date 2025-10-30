// Main entry point for the application
import { auth } from './auth.js';
import { showToast } from './toast.js';

// Initialize auth on page load
auth.initAuth();

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuRef = document.querySelector('nav');

  if (!mobileMenuButton || !mobileMenu || !menuRef) return;

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    
    // Update button icon
    const hamburgerIcon = mobileMenuButton.querySelector('#hamburger-icon');
    const closeIcon = mobileMenuButton.querySelector('#close-icon');
    
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    }
  }

  mobileMenuButton.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (menuRef && !menuRef.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      const hamburgerIcon = mobileMenuButton.querySelector('#hamburger-icon');
      const closeIcon = mobileMenuButton.querySelector('#close-icon');
      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    }
  });

  // Close mobile menu when clicking on links
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      const hamburgerIcon = mobileMenuButton.querySelector('#hamburger-icon');
      const closeIcon = mobileMenuButton.querySelector('#close-icon');
      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  });
}

// Initialize mobile menu when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
  initMobileMenu();
}

// Export globals for inline scripts
window.auth = auth;
window.showToast = showToast;

