import api from "./apiService";

const authService = {
  async login(email: string, password: string) { 
    try {
      const response = await api.post('/auth/login', { email, password });      
      localStorage.setItem("token", response.data.token.access_token);      
      return response.data;
    } catch (error: any) {
      console.error("Erro no login:", error.response?.data || error.message || error);
      throw new Error(error.response?.data?.message || "Falha ao autenticar");
    }
  },
  

  async register(email: string, password: string) {
    console.log('register', email, password);
    
    try {
      await api.post('/auth/register', { email, password });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Falha ao registrar");
    }
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  },

  getToken() {
    return localStorage.getItem("token");
  },

  getAuthHeaders() {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

export default authService;
