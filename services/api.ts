import axios, { AxiosError, type AxiosInstance } from 'axios';
import type {
  ApiError,
  AuthResponse,
  AuthUser,
  Category,
  ContactPayload,
  LoginPayload,
  Paginated,
  Product,
  ProductFilters,
} from '@/types';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Injecte le token Sanctum si présent dans localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Une erreur est survenue. Veuillez réessayer.';
    return Promise.reject({
      message,
      errors: error.response?.data?.errors,
      status: error.response?.status,
    });
  },
);

export const productsApi = {
  list: async (filters: ProductFilters = {}): Promise<Paginated<Product>> => {
    const { data } = await api.get<Paginated<Product>>('/products', {
      params: filters,
    });
    return data;
  },
  show: async (slug: string): Promise<Product> => {
    const { data } = await api.get<{ data: Product }>(`/products/${slug}`);
    return data.data;
  },
};

export const categoriesApi = {
  list: async (): Promise<Category[]> => {
    const { data } = await api.get<{ data: Category[] }>('/categories');
    return data.data;
  },
};

export const contactApi = {
  send: async (payload: ContactPayload): Promise<{ message: string }> => {
    const { data } = await api.post<{ message: string }>('/contact', payload);
    return data;
  },
};

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data;
  },
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
  me: async (): Promise<AuthUser> => {
    const { data } = await api.get<AuthUser>('/auth/me');
    return data;
  },
};

export default api;
