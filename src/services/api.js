import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para normalização padronizada de erros da API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let normalizedError = {
      message: 'Ocorreu um erro inesperado ao se comunicar com o servidor.',
      code: 'UNKNOWN_ERROR',
      status: 500,
      fieldErrors: [],
    };

    if (error.response) {
      const data = error.response.data;
      normalizedError = {
        message: data?.message || 'Erro na resposta do servidor.',
        code: data?.code || `HTTP_${error.response.status}`,
        status: error.response.status,
        fieldErrors: data?.fieldErrors || [],
      };
    } else if (error.request) {
      normalizedError = {
        message: 'Servidor indisponível. Verifique se a API REST está em execução.',
        code: 'NETWORK_ERROR',
        status: 0,
        fieldErrors: [],
      };
    }

    return Promise.reject(normalizedError);
  }
);

export default api;
