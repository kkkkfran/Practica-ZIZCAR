import axios from 'axios';
import router from '../router';

// 1. Configuración base (La URL de tu backend)
const api = axios.create({
  baseURL: 'http://localhost:3001', // Asegúrate que este sea el puerto de tu NestJS
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor de SOLICITUD (Request)
// Antes de salir, le pegamos el Token en la frente al paquete
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Interceptor de RESPUESTA (Response)
// Si el backend nos dice "401 No autorizado", nos vamos al login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Sesión expirada o inválida');
      localStorage.removeItem('token');
      localStorage.removeItem('user_email');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;