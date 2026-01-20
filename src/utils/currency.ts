const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

// Formats numbers as Indian Rupee currency (e.g., ₹1,234.50)
export const formatCurrency = (amount: number): string => formatter.format(amount);
export const formatPrice = formatCurrency; // Alias for backward compatibility
