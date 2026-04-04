import { API_BASE_URL } from '../config/api';

export class ApiError extends Error {
  status: number;
  code?: string;
  userMessage: string;
  
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.userMessage = mapErrorCodeToMessage(code, status, message);
  }
}

/**
 * Maps backend error codes to user-friendly messages
 */
function mapErrorCodeToMessage(code: string | undefined, status: number, fallbackMessage: string): string {
  // Backend 422 errors - validation/business logic
  if (code === 'UNSUPPORTED_ZONE' || fallbackMessage?.includes('UNSUPPORTED_ZONE')) {
    return 'This delivery zone is not yet supported.';
  }
  if (code === 'UNSUPPORTED_TRIGGER' || fallbackMessage?.includes('UNSUPPORTED_TRIGGER')) {
    return 'This trigger type is not recognized.';
  }
  if (code === 'EXCLUSIONS_NOT_ACKNOWLEDGED' || fallbackMessage?.includes('EXCLUSIONS_NOT_ACKNOWLEDGED')) {
    return 'You must accept the coverage exclusions first.';
  }
  
  // 404 errors - not found
  if (status === 404) {
    if (code === 'POLICY_NOT_FOUND' || fallbackMessage?.includes('POLICY_NOT_FOUND')) {
      return 'No active policy found. Please activate coverage first.';
    }
    if (code === 'RIDER_NOT_FOUND' || fallbackMessage?.includes('RIDER_NOT_FOUND')) {
      return 'Rider not found. Please complete onboarding.';
    }
    if (code === 'ZONE_NOT_FOUND' || fallbackMessage?.includes('ZONE_NOT_FOUND')) {
      return 'No data available for this zone.';
    }
    return 'The requested resource was not found.';
  }
  
  // Generic HTTP errors
  if (status === 500 || status >= 500) {
    return 'Server error. Please try again later.';
  }
  if (status === 422 || status === 400) {
    return 'Invalid request. Please check your input and try again.';
  }
  if (status === 401) {
    return 'You are not authenticated. Please log in again.';
  }
  if (status === 403) {
    return 'You do not have permission to perform this action.';
  }
  
  // Fallback to backend message or generic error
  return fallbackMessage || 'An unexpected error occurred. Please try again.';
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    let errorCode: string | undefined;
    
    try {
      const errorData = await response.json();
      
      // Extract error code if available
      // Backend sends: HTTPException(detail={"error": "CODE", "message": "..."})
      // FastAPI wraps this as: {"detail": {"error": "CODE", "message": "..."}}
      if (errorData.code) {
        errorCode = errorData.code;
      } else if (errorData.detail && typeof errorData.detail === 'object' && errorData.detail.error) {
        errorCode = errorData.detail.error;
      } else if (errorData.error) {
        errorCode = errorData.error;
      }
      
      // Extract error message
      if (errorData.detail) {
        if (typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
        } else if (typeof errorData.detail === 'object' && errorData.detail.message) {
          errorMessage = errorData.detail.message;
        } else {
          errorMessage = JSON.stringify(errorData.detail);
        }
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      // Fallback if unable to parse JSON
    }
    throw new ApiError(errorMessage, response.status, errorCode);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export async function apiGet<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Ensure endpoint starts with slash mapping
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const response = await fetch(url, {
    ...options,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  return handleResponse<T>(response);
}

export async function apiPost<T>(endpoint: string, body: any, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const response = await fetch(url, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(body),
  });
  
  return handleResponse<T>(response);
}
