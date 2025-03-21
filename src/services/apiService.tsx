import axios from "axios";

const API_URL = "http://localhost:3050";
const REFRESH_URL = `${API_URL}/auth/refresh`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Função para obter o token do localStorage
const getToken = () => localStorage.getItem("token");

// Função para salvar um novo token
const setToken = (token: string) => localStorage.setItem("token", token);

// Adiciona o token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Flag para evitar múltiplas chamadas de refresh token ao mesmo tempo
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Função para fazer o refresh token
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("Refresh token não encontrado");
    }

    const response = await axios.post(REFRESH_URL, { refreshToken });
    const newToken = response.data.accessToken;

    setToken(newToken);

    // Reexecuta todas as requisições que falharam durante o refresh
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];

    return newToken;
  } catch (error) {
    console.error("Erro ao renovar o token", error);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // Redireciona para login
    throw error;
  }
};

// Interceptor de resposta para tratar erro 401 e fazer refresh token
api.interceptors.response.use(
  (response) => response, // Retorna a resposta normal se não houver erro
  async (error) => {
    const originalRequest = error.config;

    // Se for erro 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // Reenvia a requisição original
      } catch (refreshError) {
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
