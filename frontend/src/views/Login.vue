<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="Email"
                prepend-icon="mdi-account"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                required
              ></v-text-field>
            </v-form>
            <v-alert v-if="error" type="error" dense class="mt-3">
              {{ error }}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="handleLogin" :loading="loading">Entrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// CAMBIO: Importamos nuestra instancia configurada en lugar de axios directo
import api from '../services/api'; 

const email = ref('admin@test.com'); 
const password = ref('123456');
const loading = ref(false);
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    // CAMBIO: Usamos 'api.post' y la ruta relativa
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });

    console.log("LOGIN EXITOSO:", response.data);
    
    // Guardamos el token y el email
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user_email', response.data.user.email);
    
    // Redirigimos al panel
    router.push('/records');

  } catch (e: any) {
    console.error(e);
    // Mensaje de error amigable
    if (e.response && e.response.status === 401) {
       error.value = 'Usuario o contraseña incorrectos';
    } else {
       error.value = 'Error de conexión con el servidor';
    }
  } finally {
    loading.value = false;
  }
};
</script>