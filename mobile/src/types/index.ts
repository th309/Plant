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

// User types
export enum UserRole {
  OWNER = 'OWNER',
  SITTER = 'SITTER',
  BOTH = 'BOTH',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePhotoUrl?: string;
  bio?: string;
  role: UserRole;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Plant types (will expand in Week 4)
export interface Plant {
  id: string;
  name: string;
  species?: string;
  photos: string[];
  ownerId: string;
}

// Booking types (will expand in Week 6)
export interface Booking {
  id: string;
  ownerId: string;
  sitterId: string;
  startDate: string;
  endDate: string;
  status: string;
  totalPrice: number;
}

// Navigation types (will expand as we add screens)
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
};
