import type { UserRole } from './auth.types';

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  phone?: string;
  department?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  phone?: string;
}

export interface UpdateUserPayload extends Partial<CreateUserPayload> {
  status?: UserStatus;
}

export interface UserFilters {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  department?: string;
}
