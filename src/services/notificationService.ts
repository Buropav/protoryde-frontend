import { apiGet } from './apiClient';

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: string;
  isRead?: boolean;
}

export interface NotificationsResponse {
  notifications: Notification[];
}

export const notificationService = {
  getNotifications: async (riderId: string): Promise<NotificationsResponse> => {
    return apiGet<NotificationsResponse>(`/notifications/${riderId}`);
  }
};
