export type ProductStatus = 'available' | 'out_of_stock' | 'coming_soon';

export interface Category {
  id: number;
  name: string;
  slug: string;
  products_count?: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description?: string | null;
  image: string | null;
  status: ProductStatus;
  price?: number | null;
  category: Pick<Category, 'id' | 'name' | 'slug'> | null;
  created_at: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  status?: ProductStatus | '';
  page?: number;
  per_page?: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
