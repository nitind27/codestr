import apiClient from '@api/axios.config';
import type { ApiResponse } from '@/types/api.types';
import type { DashboardStats } from '@/types/common.types';

export interface ActivityItem {
  id: string;
  user: string;
  avatar?: string;
  action: string;
  target: string;
  time: string;
}

export const dashboardService = {
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    const { data } = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return data;
  },

  async getRecentActivity(): Promise<ApiResponse<ActivityItem[]>> {
    const { data } = await apiClient.get<ApiResponse<ActivityItem[]>>('/dashboard/activity');
    return data;
  },
};
