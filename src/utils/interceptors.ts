import { AxiosInstance } from "axios";

export const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => {
      // Exemplo: Adicionar token de autenticação
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Exemplo: Tratamento global de erros
      if (error.response?.status === 401) {
        // Redirecionar para login ou exibir mensagem
      }
      return Promise.reject(error);
    }
  );
};
