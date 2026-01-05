<template>
  <v-layout class="rounded rounded-md">
    
    <v-app-bar color="primary" density="compact">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-app-bar-title>Sistema de Finanzas</v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="d-flex align-center mr-4">
        <v-icon icon="mdi-account-circle" class="mr-2"></v-icon>
        <span class="text-subtitle-2">
          {{ authStore.userEmail || 'Usuario Invitado' }}
        </span>
      </div>

      <v-btn
        variant="text"
        icon="mdi-logout"
        title="Cerrar Sesión"
        @click="handleLogout"
      ></v-btn>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RecordsTable from '../components/RecordsTable.vue';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const drawer = ref(true);

// Store de autenticación
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout(); // Limpia token + email desde el store
  router.push('/login');
};
</script>
