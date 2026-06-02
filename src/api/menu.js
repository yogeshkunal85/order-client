import { apiClient } from './client';

export const fetchMenu = () => apiClient.get('/menu');
