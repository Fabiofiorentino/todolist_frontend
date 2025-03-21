import api from "./apiService";
import authService from "./authService";

const taskService = {
  async getTasks(params = {}) {
    const token = authService.getToken();
    if (!token) {
      console.error("Token JWT não encontrado!");
      return Promise.reject(new Error("Token não encontrado!"));
    }    
    const res = await api.get('/tasks', {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async createTask(task: { title: string, description: string }) {
    const token = authService.getToken();
    if (!token) {
      console.error("Token JWT não encontrado!");
      return Promise.reject(new Error("Token não encontrado!"));
    }
    await api.post('/tasks', task, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async updateTask(id: number, updates: any) {
    const token = authService.getToken();
    if (!token) {
      console.error("Token JWT não encontrado!");
      return Promise.reject(new Error("Token não encontrado!"));
    }
    await api.patch(`/tasks/${id}`, updates, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async deleteTask(id: number) {
    const token = authService.getToken();
    if (!token) {
      console.error("Token JWT não encontrado!");
      return Promise.reject(new Error("Token não encontrado!"));
    }
    await api.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default taskService;
