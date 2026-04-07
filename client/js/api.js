const API_BASE = 'http://localhost:3000/api';

export const api = {
    async handleResponse(res) {
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || data.error || `HTTP error! status: ${res.status}`);
        }
        return data;
    },
    async post(endpoint, data) {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return this.handleResponse(res);
    },
    async get(endpoint) {
        const res = await fetch(`${API_BASE}${endpoint}`);
        return this.handleResponse(res);
    },
    async put(endpoint, data) {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return this.handleResponse(res);
    },
    async delete(endpoint) {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method: 'DELETE'
        });
        return this.handleResponse(res);
    }
};
