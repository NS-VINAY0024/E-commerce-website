export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null; // Parse the JSON string back to the original value
};

export const removeItem = (key) => {
    localStorage.removeItem(key);
};
