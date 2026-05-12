import apiClient from '@api/axios.config';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api.types';
import type { User, CreateUserPayload, UpdateUserPayload, UserFilters } from '@/types/user.types';

export const userService = {
  async getUsers(params?: PaginationParams & UserFilters): Promise<PaginatedResponse<User>> {
    const { data } = await apiClient.get<PaginatedResponse<User>>('/users', { params });
    return data;
  },

  async getUserById(id: string): Promise<ApiResponse<User>> {
    const { data } = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return data;
  },

  async createUser(payload: CreateUserPayload): Promise<ApiResponse<User>> {
    const { data } = await apiClient.post<ApiResponse<User>>('/users', payload);
    return data;
  },

  async updateUser(id: string, payload: UpdateUserPayload): Promise<ApiResponse<User>> {
    const { data } = await apiClient.patch<ApiResponse<User>>(`/users/${id}`, payload);
    return data;
  },

  async deleteUser(id: string): Promise<ApiResponse<null>> {
    const { data } = await apiClient.delete<ApiResponse<null>>(`/users/${id}`);
    return data;
  },

  async uploadAvatar(id: string, file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('avatar', file);
    const { data } = await apiClient.post<ApiResponse<{ url: string }>>(
      `/users/${id}/avatar`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data;
  },
};
