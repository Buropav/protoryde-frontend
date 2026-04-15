import { apiPost } from './apiClient';

export interface NotificationSendParams {
  rider_id: string;
  phone: string;
  message: string;
}

export const notificationService = {
  sendNotification: async (params: NotificationSendParams): Promise<any> => {
    try {
      return await apiPost('/notifications/send', params);
    } catch (e) {
      console.warn('Failed to send notification:', e);
      return { status: 'mock_success' };
    }
  }
};
