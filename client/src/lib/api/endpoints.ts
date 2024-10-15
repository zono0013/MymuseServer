import { apiClient } from './client';
import { User } from '@/types/user';

export const userApi = {
    fetchUser: async (): Promise<User> => {
        const response = await apiClient.get<User>('/user');
        return response.data;
    },

    logout: async (): Promise<void> => {
        await apiClient.post('/logout');
    },
};

export const authApi = {
    googleLogin: () => {
        window.location.href = `http://localhost:8080/auth/google/login`;

    },
    logout: () => {
        window.location.href = `http://localhost:8080/logout`
    }
};