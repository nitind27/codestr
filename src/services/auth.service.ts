import apiClient from '@api/axios.config';
import type { ApiResponse } from '@/types/api.types';
import type {
  AuthUser,
  AuthTokens,
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from '@/types/auth.types';

interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
    return data;
  },

  async register(payload: RegisterCredentials): Promise<ApiResponse<LoginResponse>> {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>('/auth/register', payload);
    return data;
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<ApiResponse<null>> {
    const { data } = await apiClient.post<ApiResponse<null>>('/auth/forgot-password', payload);
    return data;
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<ApiResponse<null>> {
    const { data } = await apiClient.post<ApiResponse<null>>('/auth/reset-password', payload);
    return data;
  },

  async getMe(): Promise<ApiResponse<AuthUser>> {
    const { data } = await apiClient.get<ApiResponse<AuthUser>>('/auth/me');
    return data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthTokens>> {
    const { data } = await apiClient.post<ApiResponse<AuthTokens>>('/auth/refresh', {
      refreshToken,
    });
    return data;
  },
};
