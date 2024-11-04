// src/utils/formatters/formatter.js

// Format price to Indian Rupees
export const formatPrice = (price) => {
    if (isNaN(price)) {
        console.error("Invalid price value:", price);
        return price; // Return the original value if it's invalid
    }
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
};

// Format a date to a readable string
export const formatDate = (date) => {
    if (!(date instanceof Date)) {
        console.error("Invalid date value:", date);
        return date; // Return the original value if it's invalid
    }
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};

// Format currency based on currency code
export const formatCurrency = (amount, currencyCode) => {
    if (isNaN(amount)) {
        console.error("Invalid amount value:", amount);
        return amount; // Return the original value if it's invalid
    }
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currencyCode,
    }).format(amount);
};

// Format phone number to a standard format
export const formatPhoneNumber = (phone) => {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{10})$/);
    if (match) {
        return `${match[1].substring(0, 5)}-${match[1].substring(5)}`; // Format as 12345-67890
    }
    console.error("Invalid phone number:", phone);
    return phone; // Return original value if invalid
};

// Format decimal to a percentage
export const formatPercentage = (value) => {
    if (isNaN(value)) {
        console.error("Invalid percentage value:", value);
        return value; // Return the original value if it's invalid
    }
    return `${(value * 100).toFixed(2)}%`; // Formats as "XX.XX%"
};
