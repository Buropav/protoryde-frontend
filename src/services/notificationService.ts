import { apiPost } from './apiClient';

export interface NotificationSendParams {
  rider_id: string;
  phone: string;
  message: string;
}

export const notificationService = {
  sendNotification: async (params: NotificationSendParams): Promise<any> => {
    return apiPost('/notifications/send', params);
  }
};
