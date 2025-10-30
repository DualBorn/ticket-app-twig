import { STORAGE_KEYS } from './constants.js';

class TicketStore {
  constructor() {
    this.tickets = [];
    this.loadTickets();
  }

  loadTickets() {
    try {
      const savedTickets = localStorage.getItem(STORAGE_KEYS.TICKETS);
      this.tickets = savedTickets ? JSON.parse(savedTickets) : [];
    } catch (error) {
      console.error('Error loading tickets:', error);
      this.tickets = [];
    }
  }

  saveTickets() {
    try {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(this.tickets));
    } catch (error) {
      console.error('Error saving tickets:', error);
    }
  }

  getAll() {
    return this.tickets;
  }

  getStats() {
    return {
      total: this.tickets.length,
      open: this.tickets.filter(t => t.status === 'open').length,
      inProgress: this.tickets.filter(t => t.status === 'in_progress').length,
      closed: this.tickets.filter(t => t.status === 'closed').length
    };
  }

  addTicket(ticket) {
    this.tickets.push(ticket);
    this.saveTickets();
  }

  updateTicket(ticketId, updatedTicket) {
    this.tickets = this.tickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, ...updatedTicket } : ticket
    );
    this.saveTickets();
  }

  deleteTicket(ticketId) {
    this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId);
    this.saveTickets();
  }

  getTicket(ticketId) {
    return this.tickets.find(ticket => ticket.id === ticketId);
  }
}

export const tickets = new TicketStore();

export const getStatusColor = (status) => {
  switch (status) {
    case 'open':
      return 'status-open';
    case 'in_progress':
      return 'status-in-progress';
    case 'closed':
      return 'status-closed';
    default:
      return 'status-open';
  }
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'text-danger-600 bg-danger-100';
    case 'medium':
      return 'text-warning-600 bg-warning-100';
    case 'low':
      return 'text-success-600 bg-success-100';
    default:
      return 'text-warning-600 bg-warning-100';
  }
};

