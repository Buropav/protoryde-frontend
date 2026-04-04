import { useState, useEffect, useCallback } from 'react';

interface ApiCallState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to manage the lifecycle of an API call.
 * 
 * @param apiFn - The async function to execute.
 * @param immediate - Whether to execute the function on mount.
 * @param dependencies - Dependencies that trigger re-execution if `immediate` is true.
 * @returns { data, loading, error, execute }
 */
export function useApiCall<T>(
  apiFn: () => Promise<T>,
  immediate = true,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFn();
      setData(result);
      setLoading(false);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      setLoading(false);
      // We don't re-throw here to prevent unhandled promise rejections in components, 
      // the 'error' state is intended for UI feedback.
    }
  }, [apiFn]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  return { 
    data, 
    loading, 
    error, 
    execute, // Also referred to as 'refetch' in the task list
    refetch: execute 
  };
}
