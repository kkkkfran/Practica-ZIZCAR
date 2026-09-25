import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../services/api';

export interface DemoCredential {
  email: string;
  password: string;
  role: string;
  name: string;
}

export const DEMO_CREDENTIALS: DemoCredential[] = [
  {
    email: 'demo@zizcar.com',
    password: 'demo1234',
    role: 'Auditor Financiero (Demo)',
    name: 'Usuario Demo',
  },
  {
    email: 'admin@test.com',
    password: '123456',
    role: 'Administrador General',
    name: 'Admin Portfolio',
  },
];

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token') || null);
  const userEmail = ref<string | null>(localStorage.getItem('user_email') || null);
  const userName = ref<string | null>(localStorage.getItem('user_name') || null);
  const userRole = ref<string | null>(localStorage.getItem('user_role') || null);
  const isDemo = ref<boolean>(localStorage.getItem('is_demo') === 'true');

  // Acción de Login con soporte inteligente para Demo (GitHub Pages) y Backend Real (NestJS)
  const login = async (email: string, password: string): Promise<boolean> => {
    const trimmedEmail = email.trim().toLowerCase();
    const matchedDemo = DEMO_CREDENTIALS.find(
      (c) => c.email.toLowerCase() === trimmedEmail && c.password === password
    );

    // Si coincide con credenciales demo, simula autenticación exitosa inmediata (ideal para GitHub Pages)
    if (matchedDemo) {
      await new Promise((resolve) => setTimeout(resolve, 650)); // Simula latencia de red fluida
      const demoToken = `mock-jwt-token-${btoa(trimmedEmail)}-${Date.now()}`;
      
      token.value = demoToken;
      userEmail.value = matchedDemo.email;
      userName.value = matchedDemo.name;
      userRole.value = matchedDemo.role;
      isDemo.value = true;

      localStorage.setItem('token', demoToken);
      localStorage.setItem('user_email', matchedDemo.email);
      localStorage.setItem('user_name', matchedDemo.name);
      localStorage.setItem('user_role', matchedDemo.role);
      localStorage.setItem('is_demo', 'true');

      return true;
    }

    // Si no es demo o se usan otras credenciales, intenta comunicarse con el backend real
    try {
      const response = await api.post('/auth/login', { email, password });
      
      token.value = response.data.access_token;
      userEmail.value = response.data.user?.email || trimmedEmail;
      userName.value = response.data.user?.name || 'Usuario';
      userRole.value = response.data.user?.role || 'Usuario';
      isDemo.value = false;

      localStorage.setItem('token', token.value as string);
      localStorage.setItem('user_email', userEmail.value as string);
      localStorage.setItem('user_name', userName.value as string);
      localStorage.setItem('user_role', userRole.value as string);
      localStorage.setItem('is_demo', 'false');

      return true;
    } catch (error: any) {
      // Si la API no está disponible (ej: entorno estático sin backend local) y es un usuario conocido
      if (!error.response && matchedDemo) {
        const demoToken = `mock-jwt-token-${btoa(trimmedEmail)}-${Date.now()}`;
        token.value = demoToken;
        userEmail.value = matchedDemo.email;
        userName.value = matchedDemo.name;
        userRole.value = matchedDemo.role;
        isDemo.value = true;

        localStorage.setItem('token', demoToken);
        localStorage.setItem('user_email', matchedDemo.email);
        localStorage.setItem('user_name', matchedDemo.name);
        localStorage.setItem('user_role', matchedDemo.role);
        localStorage.setItem('is_demo', 'true');
        return true;
      }
      throw error;
    }
  };

  // Entrada directa en 1 clic
  const loginAsDemo = async (index = 0): Promise<boolean> => {
    const cred = DEMO_CREDENTIALS[index] || DEMO_CREDENTIALS[0];
    return login(cred.email, cred.password);
  };

  // Acción de Logout
  const logout = () => {
    token.value = null;
    userEmail.value = null;
    userName.value = null;
    userRole.value = null;
    isDemo.value = false;

    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_role');
    localStorage.removeItem('is_demo');
  };

  return {
    token,
    userEmail,
    userName,
    userRole,
    isDemo,
    login,
    loginAsDemo,
    logout,
  };
});