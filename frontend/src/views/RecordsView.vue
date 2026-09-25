<template>
  <v-layout class="rounded rounded-md">
    
    <v-app-bar color="indigo-darken-3" density="compact" elevation="2">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-app-bar-title class="font-weight-bold d-flex align-center">
        <v-icon icon="mdi-chart-timeline-variant-shimmer" class="mr-2" size="20"></v-icon>
        ZIZCAR Finanzas
      </v-app-bar-title>

      <v-chip
        v-if="authStore.isDemo"
        size="small"
        color="teal-accent-3"
        variant="tonal"
        class="ml-3 font-weight-bold d-none d-sm-flex"
      >
        <v-icon start icon="mdi-shield-check" size="14"></v-icon>
        DEMO PORTFOLIO
      </v-chip>

      <v-spacer></v-spacer>

      <div class="d-flex align-center mr-4">
        <v-avatar color="indigo-darken-1" size="28" class="mr-2">
          <v-icon icon="mdi-account" size="18"></v-icon>
        </v-avatar>
        <div class="d-none d-sm-block text-left mr-2">
          <div class="text-caption font-weight-bold" style="line-height: 1.1;">
            {{ authStore.userName || 'Usuario Invitado' }}
          </div>
          <div class="text-caption text-blue-grey-lighten-2" style="font-size: 0.72rem !important; line-height: 1.1;">
            {{ authStore.userRole || authStore.userEmail }}
          </div>
        </div>
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
        <v-list-item
          title="Consola Financiera"
          subtitle="ZIZCAR Intelligence"
        ></v-list-item>
        <v-divider></v-divider>

        <v-list-item
          prepend-icon="mdi-table-large"
          title="Transacciones"
          value="records"
          active
          color="indigo"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="min-height: 100vh; background-color: #f8fafc;">
      <v-container fluid class="pa-4 pa-sm-6">
        <v-alert
          v-if="authStore.isDemo"
          type="info"
          variant="tonal"
          density="compact"
          rounded="lg"
          class="mb-4"
        >
          <div class="d-flex align-center justify-space-between flex-wrap gap-2">
            <span>
              <strong>Entorno de Demostración:</strong> Estás navegando con datos de prueba interactivos. Puedes crear, editar o simular la ingesta de archivos PDF sin necesidad de backend local.
            </span>
            <v-chip size="x-small" color="info" variant="flat">Portfolio Live Demo</v-chip>
          </div>
        </v-alert>

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

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
