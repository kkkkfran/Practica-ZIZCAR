import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../services/api';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const userEmail = ref(localStorage.getItem('user_email') || null);

  // Acción de Login
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Actualizamos estado
      token.value = response.data.access_token;
      userEmail.value = response.data.user.email;
      
      // Persistencia
      localStorage.setItem('token', token.value);
      localStorage.setItem('user_email', userEmail.value);
      
      return true; // Login exitoso
    } catch (error) {
      throw error;
    }
  };

  // Acción de Logout
  const logout = () => {
    token.value = null;
    userEmail.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
  };

  return { token, userEmail, login, logout };
});