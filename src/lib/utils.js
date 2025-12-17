import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format currency IDR
export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format number with thousands separator
export function formatNumber(num) {
  return new Intl.NumberFormat('id-ID').format(num);
}

// Format merchant ID for display
export function formatMerchantId(mid) {
  // Format: 0000-0000-0001
  return mid.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
}

// Calculate percentage change
export function calculatePercentageChange(current, previous) {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

// Animate number counting
export function animateValue(start, end, duration, callback) {
  const startTime = Date.now();
  const endTime = startTime + duration;
  
  const step = () => {
    const now = Date.now();
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(start + (end - start) * progress);
    
    callback(value);
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  
  requestAnimationFrame(step);
}

// Get time-based greeting
export function getGreeting() {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

// Format date
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Generate random gradient for merchant cards
export function getMerchantGradient(mid) {
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-cyan-500 to-blue-600',
    'from-violet-500 to-purple-600',
    'from-emerald-500 to-green-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
    'from-sky-500 to-blue-600',
  ];
  
  const index = parseInt(mid.slice(-1)) % gradients.length;
  return gradients[index];
}
