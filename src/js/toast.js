// Toast notification system
const toastContainer = document.getElementById('toast-container') || createToastContainer();

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'fixed top-20 right-4 z-50 space-y-2';
  document.body.appendChild(container);
  return container;
}

export const showToast = (message, type = 'info', duration = 5000) => {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type} p-4 rounded-lg shadow-lg flex items-center justify-between min-w-[300px] max-w-md transform transition-all duration-300 translate-x-full`;
  
  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white'
  };
  
  toast.className += ` ${typeStyles[type] || typeStyles.info}`;
  
  toast.innerHTML = `
    <span>${message}</span>
    <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.remove()">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  `;
  
  toastContainer.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.remove('translate-x-full');
  }, 10);
  
  // Auto remove
  setTimeout(() => {
    toast.classList.add('translate-x-full');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
};

