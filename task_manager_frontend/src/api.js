const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

/**
 * Task/Authentication API utility methods. 
 */
const api = {
  // Task APIs
  async getTasks(token) {
    const resp = await fetch(`${API_BASE}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!resp.ok) throw new Error("Failed to fetch tasks");
    return resp.json();
  },
  async addTask(task, token) {
    const resp = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    if (!resp.ok) throw new Error("Failed to add task");
    return resp.json();
  },
  async updateTask(task, token) {
    const resp = await fetch(`${API_BASE}/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    if (!resp.ok) throw new Error("Failed to update task");
    return resp.json();
  },
  async deleteTask(taskId, token) {
    const resp = await fetch(`${API_BASE}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!resp.ok) throw new Error("Failed to delete task");
    return resp.json();
  },
  // Auth APIs
  async login(username, password) {
    const resp = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!resp.ok) {
      const data = await resp.json().catch(() => ({}));
      throw new Error(data.detail || "Login failed");
    }
    return resp.json();
  },
  async register(username, password) {
    const resp = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!resp.ok) {
      const data = await resp.json().catch(() => ({}));
      throw new Error(data.detail || "Registration failed");
    }
    return resp.json();
  },
};

export default api;
