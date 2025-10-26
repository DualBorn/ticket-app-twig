import { auth, requireAuth } from './auth.js';
import { tickets, getStatusColor, getPriorityColor } from './tickets.js';
import { showToast } from './toast.js';

if (!requireAuth()) return;

if (auth.user) {
    document.getElementById('userName').textContent = `Welcome, ${auth.user.name}`;
}

let editingTicket = null;

async function loadTickets() {
    const ticketsList = tickets.getAll();
    const grid = document.getElementById('ticketsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (ticketsList.length === 0) {
        emptyState.classList.remove('hidden');
        grid.classList.add('hidden');
    } else {
        emptyState.classList.add('hidden');
        grid.classList.remove('hidden');
        grid.innerHTML = ticketsList.map(ticket => `
            <div class="card hover:shadow-xl transition-shadow">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">${ticket.title}</h3>
                    <div class="flex space-x-2">
                        <button onclick='editTicket("${ticket.id}")' class="text-primary-600 hover:text-primary-800">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button onclick='deleteTicket("${ticket.id}")' class="text-danger-600 hover:text-danger-800">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                ${ticket.description ? `<p class="text-gray-600 text-sm mb-4 line-clamp-3">${ticket.description}</p>` : ''}
                <div class="flex items-center justify-between mb-4">
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}">
                        ${ticket.status.replace('_', ' ')}
                    </span>
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}">
                        ${ticket.priority}
                    </span>
                </div>
                <div class="text-xs text-gray-500">
                    <p>Created: ${new Date(ticket.createdAt).toLocaleDateString()}</p>
                    <p>Updated: ${new Date(ticket.updatedAt).toLocaleDateString()}</p>
                </div>
            </div>
        `).join('');
    }
}

window.editTicket = (ticketId) => {
    editingTicket = tickets.getTicket(ticketId);
    document.getElementById('modalTitle').textContent = 'Edit Ticket';
    document.getElementById('submitBtn').textContent = 'Update Ticket';
    document.getElementById('ticketId').value = editingTicket.id;
    document.getElementById('title').value = editingTicket.title;
    document.getElementById('description').value = editingTicket.description;
    document.getElementById('status').value = editingTicket.status;
    document.getElementById('priority').value = editingTicket.priority;
    document.getElementById('ticketModal').classList.remove('hidden');
};

window.deleteTicket = (ticketId) => {
    if (confirm('Are you sure you want to delete this ticket?')) {
        tickets.deleteTicket(ticketId);
        showToast('Ticket deleted successfully!', 'success');
        loadTickets();
    }
};

window.openModal = () => {
    editingTicket = null;
    document.getElementById('modalTitle').textContent = 'Create New Ticket';
    document.getElementById('submitBtn').textContent = 'Create Ticket';
    document.getElementById('ticketForm').reset();
    document.getElementById('ticketId').value = '';
    document.getElementById('status').value = 'open';
    document.getElementById('priority').value = 'medium';
    document.getElementById('ticketModal').classList.remove('hidden');
};

window.resetForm = () => {
    document.getElementById('ticketForm').reset();
    document.getElementById('ticketId').value = '';
    document.getElementById('status').value = 'open';
    document.getElementById('priority').value = 'medium';
    editingTicket = null;
    document.getElementById('ticketModal').classList.add('hidden');
};

// Setup event listeners after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('ticketModal');
    const ticketForm = document.getElementById('ticketForm');
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'ticketModal') {
                resetForm();
            }
        });
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            resetForm();
        }
    });
    
    // Form submit handler
    if (ticketForm) {
        ticketForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const status = document.getElementById('status').value;
            const priority = document.getElementById('priority').value;
            
            if (!title.trim()) {
                showToast('Title is required', 'error');
                return;
            }
            
            const now = new Date().toISOString();
            
            if (editingTicket) {
                tickets.updateTicket(editingTicket.id, { title, description, status, priority, updatedAt: now });
                showToast('Ticket updated successfully!', 'success');
            } else {
                const ticketId = Date.now().toString(36) + Math.random().toString(36).substr(2);
                tickets.addTicket({ id: ticketId, title, description, status, priority, createdAt: now, updatedAt: now });
                showToast('Ticket created successfully!', 'success');
            }
            
            loadTickets();
            resetForm();
        });
    }
    
    // Load initial tickets
    loadTickets();
});
