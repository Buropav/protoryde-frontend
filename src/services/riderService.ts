import { apiGet } from "./apiClient";
import { RiderCalendarResponse } from "../types/api";

export const riderService = {
  getCalendar: async (riderId: string): Promise<RiderCalendarResponse> => {
    return apiGet<RiderCalendarResponse>(`/rider/${riderId}/calendar`);
  },
};
