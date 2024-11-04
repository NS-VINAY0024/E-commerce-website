// src/services/auth.js
import { api } from './api';
import { setItem } from '../utils/localStorage'; // Import the utility

export const authService = {
    async login(credentials) {
        const response = await api.post('/login', credentials); // Assuming you have a /login endpoint
        setItem("authToken", response.token); // Save token using utility function
        return response; // Return the user data
    },

    async validateToken(token) {
        const response = await api.get(`/validate-token?token=${token}`); // Assuming a token validation endpoint
        return response; // Return user data or status
    },
};
