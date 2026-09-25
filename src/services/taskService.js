import api from './api';

export const taskService = {
  async fetchTasks(params = {}) {
    const cleanParams = {};
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        cleanParams[key] = params[key];
      }
    });

    const response = await api.get('/tasks', { params: cleanParams });
    return response.data;
  },

  async fetchTaskById(id) {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  async createTask(taskData) {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  async updateTask(id, taskData) {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  async updateTaskStatus(id, status) {
    const response = await api.patch(`/tasks/${id}/status`, { status });
    return response.data;
  },

  async deleteTask(id) {
    await api.delete(`/tasks/${id}`);
  },
};

export default taskService;
