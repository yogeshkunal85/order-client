import { apiClient } from './client';

export const placeOrder = (payload) => apiClient.post('/orders', payload);

export const fetchOrder = (id) => apiClient.get(`/orders/${id}`);
