export const STORAGE_KEYS = {
  SESSION: 'ticketapp_session',
  TICKETS: 'tickets'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login.html',
  SIGNUP: '/signup.html',
  DASHBOARD: '/dashboard.html',
  TICKETS: '/tickets.html'
};

export const DEMO_CREDENTIALS = {
  ADMIN: {
    email: 'admin@ticketapp.com',
    password: 'password123'
  },
  USER: {
    email: 'user@ticketapp.com',
    password: 'password123'
  }
};

export const TICKET_STATUSES = ['open', 'in_progress', 'closed'];
export const TICKET_PRIORITIES = ['low', 'medium', 'high'];

export const VALIDATION_RULES = {
  EMAIL_REGEX: /\S+@\S+\.\S+/,
  MIN_PASSWORD_LENGTH: 6,
  MIN_NAME_LENGTH: 2
};

