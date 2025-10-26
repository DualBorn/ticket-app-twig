import { auth, requireAuth } from './auth.js';
import { tickets } from './tickets.js';
import { showToast } from './toast.js';

if (!requireAuth()) return;

if (auth.user) {
    document.getElementById('userName').textContent = `Welcome, ${auth.user.name}`;
}

function loadStats() {
    const stats = tickets.getStats();
    document.getElementById('stats-total').textContent = stats.total;
    document.getElementById('stats-open').textContent = stats.open;
    document.getElementById('stats-inProgress').textContent = stats.inProgress;
    document.getElementById('stats-closed').textContent = stats.closed;
    
    if (stats.total === 0) {
        document.getElementById('emptyState').classList.remove('hidden');
        document.getElementById('activityContent').classList.add('hidden');
    } else {
        document.getElementById('emptyState').classList.add('hidden');
        document.getElementById('activityContent').classList.remove('hidden');
        document.getElementById('activity-total').textContent = `• ${stats.total} total tickets`;
        document.getElementById('activity-open').textContent = `• ${stats.open} open tickets`;
        document.getElementById('activity-inProgress').textContent = `• ${stats.inProgress} in progress`;
        document.getElementById('activity-closed').textContent = `• ${stats.closed} closed tickets`;
    }
}

loadStats();

