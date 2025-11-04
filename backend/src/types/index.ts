import { Request } from 'express';

// Extend Express Request to include user
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: {
    page?: number;
    perPage?: number;
    total?: number;
  };
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

// Filter types
export interface FilterParams {
  [key: string]: any;
}
