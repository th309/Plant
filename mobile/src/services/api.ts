import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
const API_URL = __DEV__
  ? 'http://localhost:3000/api/v1'
  : 'https://api.plantsitter.com/api/v1';

const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from storage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token (will implement in Week 2-3)
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken) {
          // Call refresh endpoint
          // const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
          // const { accessToken } = response.data;
          // await AsyncStorage.setItem('accessToken', accessToken);
          // return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        // Navigate to login (will implement in Week 2-3)
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API helper functions
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.get<T>(url, config);
  },

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.post<T>(url, data, config);
  },

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.put<T>(url, data, config);
  },

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.delete<T>(url, config);
  },

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.patch<T>(url, data, config);
  },
};

export default apiClient;
