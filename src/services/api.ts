import axios from 'axios';
import { env } from '../environment';
import { useAuthStore } from '../stores/authStore';

const handleAuthError = () => {
  useAuthStore.getState().logout();
  window.location.href = '/login';
};

const createApi = (baseURL: string) => {
  const api = axios.create({ baseURL });

  api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        handleAuthError();
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const booksApi = createApi(env.API_URL);
export const pdfExtractorApi = createApi(env.PDF_EXTRACTOR_API_URL);
