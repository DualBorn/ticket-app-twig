import { STORAGE_KEYS, DEMO_CREDENTIALS } from './constants.js';
import { showToast } from './toast.js';

class Auth {
  constructor() {
    this.user = null;
    this.initAuth();
  }

  initAuth() {
    const sessionToken = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (sessionToken) {
      try {
        this.user = JSON.parse(sessionToken);
      } catch (error) {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
      }
    }
  }

  async login(email, password) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    if (email === DEMO_CREDENTIALS.ADMIN.email && password === DEMO_CREDENTIALS.ADMIN.password) {
      const userData = {
        id: '1',
        email: email,
        name: 'Admin User'
      };
      
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userData));
      this.user = userData;
      showToast('Login successful!', 'success');
      return true;
    } else if (email === DEMO_CREDENTIALS.USER.email && password === DEMO_CREDENTIALS.USER.password) {
      const userData = {
        id: '2',
        email: email,
        name: 'Test User'
      };
      
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userData));
      this.user = userData;
      showToast('Login successful!', 'success');
      return true;
    } else {
      showToast('Invalid email or password', 'error');
      return false;
    }
  }

  async signup(name, email, password) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock signup
    if (password.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return false;
    }
    
    const userData = {
      id: Date.now().toString(),
      email: email,
      name: name
    };
    
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userData));
    this.user = userData;
    showToast('Account created successfully!', 'success');
    return true;
  }

  logout() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    this.user = null;
    showToast('Logged out successfully', 'success');
  }

  isAuthenticated() {
    return this.user !== null;
  }
}

export const auth = new Auth();
export const requireAuth = () => {
  if (!auth.isAuthenticated()) {
    window.location.href = './login.html';
    return false;
  }
  return true;
};

