<template>
  <v-layout class="rounded rounded-md">
    
    <v-app-bar color="primary" density="compact">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Sistema de Finanzas</v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="d-flex align-center mr-4">
        <v-icon icon="mdi-account-circle" class="mr-2"></v-icon>
        <span class="text-subtitle-2">{{ userEmail }}</span>
      </div>

      <v-btn variant="text" icon="mdi-logout" @click="handleLogout" title="Cerrar Sesión"></v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item title="Menú Principal" subtitle="Navegación"></v-list-item>
        <v-divider></v-divider>
        
        <v-list-item 
          prepend-icon="mdi-table-large" 
          title="Registros" 
          value="records"
          active
          color="primary"
        ></v-list-item>

        </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <v-container fluid>
        <RecordsTable />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import RecordsTable from '../components/RecordsTable.vue';

const router = useRouter();
const drawer = ref(true); // Controla si el menú lateral está abierto
const userEmail = ref('');

onMounted(() => {
  // Recuperamos el email que guardamos en el login
  const storedEmail = localStorage.getItem('user_email');
  if (storedEmail) {
    userEmail.value = storedEmail;
  } else {
    // Si no hay email (entró directo sin login), lo mandamos fuera
    // router.push('/login'); // (Descomenta esto después para proteger la ruta)
    userEmail.value = 'Usuario Invitado';
  }
});

const handleLogout = () => {
  // 1. Borrar credenciales
  localStorage.removeItem('token');
  localStorage.removeItem('user_email');
  
  // 2. Redirigir al login
  router.push('/login');
};
</script>