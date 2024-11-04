// src/utils/validators/validators.js

// Validate email format
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(email);
    if (!isValid) {
        console.error("Invalid email format:", email);
    }
    return isValid;
};

// Validate password strength
export const validatePassword = (password) => {
    // Criteria: at least 8 characters, at least one letter, one number, and one special character
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = re.test(password);
    if (!isValid) {
        console.error("Invalid password format:", password);
    }
    return isValid;
};

// Validate phone number format
export const validatePhoneNumber = (phone) => {
    // Example: Validate Indian phone numbers (10 digits)
    const re = /^\d{10}$/;
    const isValid = re.test(phone);
    if (!isValid) {
        console.error("Invalid phone number format:", phone);
    }
    return isValid;
};

// Check if a field is empty
export const validateRequired = (value) => {
    const isValid = value.trim() !== '';
    if (!isValid) {
        console.error("Field is required:", value);
    }
    return isValid;
};
