import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request interceptor: attach auth token placeholder ───
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor: handle common errors ───
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Clear token and redirect to login (placeholder)
          localStorage.removeItem('auth_token');
          // window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden: You do not have permission to access this resource.');
          break;
        case 500:
          console.error('Server error: Please try again later.');
          break;
      }
    } else if (error.request) {
      console.error('Network error: Unable to reach the server.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
