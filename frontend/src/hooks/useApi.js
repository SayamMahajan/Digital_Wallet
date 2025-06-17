import { useState, useCallback } from 'react';
import { axiosInstance } from '../utils/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance(config);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((url, config = {}) => {
    return request({ method: 'GET', url, ...config });
  }, [request]);

  const post = useCallback((url, data, config = {}) => {
    return request({ method: 'POST', url, data, ...config });
  }, [request]);

  const put = useCallback((url, data, config = {}) => {
    return request({ method: 'PUT', url, data, ...config });
  }, [request]);

  const del = useCallback((url, config = {}) => {
    return request({ method: 'DELETE', url, ...config });
  }, [request]);

  return {
    loading,
    error,
    request,
    get,
    post,
    put,
    delete: del,
    clearError: () => setError(null)
  };
};