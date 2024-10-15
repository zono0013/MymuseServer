import axios from 'axios';
import { API_BASE_URL } from '../config';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// インターセプターの設定
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // 未認証の場合の処理
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);