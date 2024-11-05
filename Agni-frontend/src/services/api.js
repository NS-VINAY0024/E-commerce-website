const BASE_URL = process.env.REACT_APP_API_URL;

const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const api = {
    get: async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        return handleResponse(response);
    },
    post: async (endpoint, data) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
};

// Fetch data for the smart cart
export const fetchSmartCartData = async () => {
    return await api.get('/api/smartcart'); // Use the api.get method
};

// Process payment
export const processPayment = async (items) => {
    return await api.post('/api/payment', { items }); // Use the api.post method
};
