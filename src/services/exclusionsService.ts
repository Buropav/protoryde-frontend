import { apiGet } from './apiClient';
import { ExclusionsResponse } from '../types/api';

export const exclusionsService = {
  getExclusions: async (): Promise<ExclusionsResponse> => {
    return apiGet<ExclusionsResponse>('/exclusions');
  }
};
