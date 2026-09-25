<template>
  <div class="login-page">
    <!-- Efectos de iluminación ambiental sutiles -->
    <div class="ambient-glow glow-top"></div>
    <div class="ambient-glow glow-bottom"></div>

    <v-container class="fill-height py-8 px-4" fluid>
      <div class="layout-container">
        
        <!-- ============================================== -->
        <!-- COLUMNA IZQUIERDA: FICHA TÉCNICA / SPECS README -->
        <!-- ============================================== -->
        <div class="specs-column">
          <!-- Encabezado del proyecto -->
          <div class="mb-5">
            <div class="d-inline-flex align-center badge-mono mb-3">
              <v-icon icon="mdi-code-braces" size="14" class="mr-1 text-cyan-400"></v-icon>
              <span>CHALLENGE TÉCNICO • FULL STACK</span>
            </div>

            <div class="d-flex align-center mb-2">
              <div class="brand-badge mr-3">
                <v-icon icon="mdi-finance" color="white" size="24"></v-icon>
              </div>
              <div>
                <h1 class="text-h4 font-weight-bold project-title">ZIZCAR</h1>
                <p class="text-caption text-slate-400 font-weight-medium mb-0">
                  Sistema de Gestión de Finanzas & BI
                </p>
              </div>
            </div>

            <p class="text-body-2 text-slate-300 project-desc">
              Solución integral para la ingesta y normalización de estados financieros a partir de archivos PDF, 
              conciliación con persistencia idempotente (Upsert) y visualización en dashboard interactivo.
            </p>
          </div>

          <!-- Stack Tecnológico Categorizado -->
          <div class="stack-card pa-4 mb-5 rounded-xl">
            <h3 class="text-caption font-weight-bold text-slate-400 uppercase tracking-wider mb-3">
              STACK TECNOLÓGICO
            </h3>

            <!-- Categoría: Frontend -->
            <div class="stack-row mb-3">
              <div class="category-label">
                <v-icon icon="mdi-monitor-dashboard" size="14" class="mr-1 text-indigo-300"></v-icon>
                <span>Frontend:</span>
              </div>
              <div class="tags-group">
                <span class="tech-tag">Vue 3</span>
                <span class="tech-tag">Vuetify 3</span>
                <span class="tech-tag">Pinia</span>
                <span class="tech-tag">Axios</span>
              </div>
            </div>

            <!-- Categoría: Backend & API -->
            <div class="stack-row mb-3">
              <div class="category-label">
                <v-icon icon="mdi-server" size="14" class="mr-1 text-cyan-300"></v-icon>
                <span>Backend & API:</span>
              </div>
              <div class="tags-group">
                <span class="tech-tag">NestJS (Node)</span>
                <span class="tech-tag">TypeORM</span>
                <span class="tech-tag">JWT Passport</span>
                <span class="tech-tag">PDF-Parse</span>
              </div>
            </div>

            <!-- Categoría: Base de Datos & BI -->
            <div class="stack-row mb-3">
              <div class="category-label">
                <v-icon icon="mdi-database" size="14" class="mr-1 text-emerald-300"></v-icon>
                <span>Datos & BI:</span>
              </div>
              <div class="tags-group">
                <span class="tech-tag">MySQL</span>
                <span class="tech-tag">Power BI Desktop</span>
              </div>
            </div>

            <!-- Arquitectura & Patrones -->
            <div class="stack-row">
              <div class="category-label">
                <v-icon icon="mdi-cogs" size="14" class="mr-1 text-violet-300"></v-icon>
                <span>Arquitectura:</span>
              </div>
              <div class="tags-group">
                <span class="tech-tag">Regex Parser</span>
                <span class="tech-tag">Upsert Idempotente</span>
                <span class="tech-tag">Auditoría CSV/JSON</span>
              </div>
            </div>
          </div>

          <!-- Enlace a Documentación del Repositorio -->
          <div class="d-flex align-center justify-space-between flex-wrap gap-2">
            <a
              href="https://github.com/kkkkfran/Practica-ZIZCAR"
              target="_blank"
              rel="noopener noreferrer"
              class="github-link-btn"
            >
              <v-icon icon="mdi-github" size="18" class="mr-2"></v-icon>
              <span>Ver README y código en GitHub</span>
              <v-icon icon="mdi-arrow-top-right" size="15" class="ml-1"></v-icon>
            </a>

            <span class="text-caption text-slate-500 font-mono">
              Branch: main
            </span>
          </div>
        </div>

        <!-- ============================================== -->
        <!-- COLUMNA DERECHA: FORMULARIO DE ACCESO DEMO     -->
        <!-- ============================================== -->
        <div class="form-column">
          <div class="login-card pa-6 pa-sm-8 rounded-2xl">
            
            <!-- Header del Formulario -->
            <div class="mb-5">
              <div class="d-flex align-center justify-space-between mb-2">
                <h2 class="text-h5 font-weight-bold text-slate-100">
                  Iniciar Sesión
                </h2>
                <div class="demo-live-badge">
                  <span class="pulse-dot mr-1"></span>
                  <span class="font-mono text-caption">MODO DEMO</span>
                </div>
              </div>
              <p class="text-caption text-slate-400 mb-0">
                Credenciales de prueba cargadas para ingresar directamente.
              </p>
            </div>

            <!-- Banner informativo sutil de credenciales precargadas -->
            <div class="demo-info-banner pa-3 mb-5 rounded-lg">
              <div class="d-flex align-center">
                <v-icon icon="mdi-shield-check-outline" size="18" class="mr-2 text-cyan-300"></v-icon>
                <div class="text-caption text-slate-300">
                  Entorno Portfolio: Pulsa <strong>Acceder a la plataforma</strong> para explorar la app en vivo.
                </div>
              </div>
            </div>

            <!-- Formulario -->
            <v-form @submit.prevent="handleLogin" ref="loginForm">
              
              <!-- Input: Email -->
              <div class="input-block mb-4">
                <label class="field-label text-slate-300 mb-1 d-block">
                  CORREO ELECTRÓNICO
                </label>
                <v-text-field
                  v-model="email"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  color="primary"
                  base-color="rgba(148, 163, 184, 0.4)"
                  bg-color="rgba(15, 23, 42, 0.6)"
                  :rules="[rules.required, rules.email]"
                  hide-details="auto"
                  required
                ></v-text-field>
              </div>

              <!-- Input: Contraseña -->
              <div class="input-block mb-5">
                <div class="d-flex justify-space-between align-center mb-1">
                  <label class="field-label text-slate-300">
                    CONTRASEÑA
                  </label>
                  <span class="text-caption text-cyan-400 font-mono" style="font-size: 0.72rem !important;">
                    demo1234
                  </span>
                </div>
                <v-text-field
                  v-model="password"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append-inner="showPassword = !showPassword"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  color="primary"
                  base-color="rgba(148, 163, 184, 0.4)"
                  bg-color="rgba(15, 23, 42, 0.6)"
                  :rules="[rules.required]"
                  hide-details="auto"
                  required
                ></v-text-field>
              </div>

              <!-- Mensaje de Error si las credenciales fallan -->
              <v-slide-y-transition>
                <v-alert
                  v-if="error"
                  type="error"
                  variant="tonal"
                  density="compact"
                  rounded="lg"
                  class="mb-4 text-caption"
                  closable
                  @click:close="error = ''"
                >
                  {{ error }}
                </v-alert>
              </v-slide-y-transition>

              <!-- Botón Principal: Acceder a la plataforma -->
              <v-btn
                type="submit"
                block
                size="large"
                class="btn-primary-action font-weight-bold text-white mb-3"
                :loading="loading"
                elevation="0"
              >
                <span>Acceder a la plataforma</span>
                <v-icon icon="mdi-arrow-right" end class="ml-2"></v-icon>
              </v-btn>

              <!-- Botón Secundario: Entrada Rápida 1 Clic -->
              <v-btn
                block
                variant="outlined"
                class="btn-secondary-action font-weight-medium text-slate-300"
                :loading="quickLoading"
                @click="handleQuickGuestLogin"
              >
                <v-icon icon="mdi-flash" start size="16" class="text-cyan-400"></v-icon>
                <span>Acceso Rápido Demo (1 Clic)</span>
              </v-btn>
            </v-form>

            <!-- Pie de página integrado en la tarjeta -->
            <div class="text-center mt-6 pt-4 border-top-subtle">
              <span class="text-caption text-slate-400">
                Autor: <strong class="text-slate-200">Francisco Javier Cartes Jara</strong>
              </span>
            </div>

          </div>
        </div>

      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore, DEMO_CREDENTIALS } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const demoAccount = DEMO_CREDENTIALS[0];

// Campos prellenados con las credenciales demo para uso inmediato
const email = ref(demoAccount.email);
const password = ref(demoAccount.password);

const showPassword = ref(false);
const loading = ref(false);
const quickLoading = ref(false);
const error = ref('');

const rules = {
  required: (v: string) => !!v || 'Campo requerido',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Introduce un email válido',
};

// Envío del formulario
const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Por favor completa los campos';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    await authStore.login(email.value, password.value);
    router.push('/records');
  } catch (e: any) {
    error.value = 'Credenciales no válidas. Prueba con demo@zizcar.com / demo1234';
  } finally {
    loading.value = false;
  }
};

// Acceso rápido en 1 solo clic
const handleQuickGuestLogin = async () => {
  quickLoading.value = true;
  error.value = '';

  try {
    await authStore.loginAsDemo(0);
    router.push('/records');
  } catch (e) {
    error.value = 'Error al iniciar sesión de prueba';
  } finally {
    quickLoading.value = false;
  }
};
</script>

<style scoped>
/* Contenedor general en pantalla completa */
.login-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: #0b0f19;
  background-image: 
    radial-gradient(at 10% 15%, rgba(30, 58, 138, 0.28) 0px, transparent 55%),
    radial-gradient(at 90% 85%, rgba(14, 116, 144, 0.22) 0px, transparent 55%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
}

/* Luces ambientales difuminadas */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(120px);
  z-index: 0;
}

.glow-top {
  top: -120px;
  left: 15%;
  width: 380px;
  height: 380px;
  background: rgba(59, 130, 246, 0.22);
}

.glow-bottom {
  bottom: -120px;
  right: 15%;
  width: 420px;
  height: 420px;
  background: rgba(6, 182, 212, 0.18);
}

/* Layout equilibrado de dos columnas */
.layout-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: center;
}

@media (min-width: 960px) {
  .layout-container {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 48px;
  }
}

/* Columna Izquierda: Specs */
.specs-column {
  color: #f1f5f9;
}

.badge-mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.25);
  padding: 4px 10px;
  border-radius: 6px;
  color: #38bdf8;
}

.brand-badge {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px -4px rgba(37, 99, 235, 0.4);
}

.project-title {
  letter-spacing: -0.03em;
  color: #f8fafc;
  line-height: 1.1;
}

.project-desc {
  line-height: 1.6;
  color: #94a3b8;
  max-width: 480px;
}

/* Tarjeta de Stack Tecnológico */
.stack-card {
  background: rgba(17, 24, 39, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.stack-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

@media (min-width: 600px) {
  .stack-row {
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }
}

.category-label {
  display: flex;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 600;
  color: #94a3b8;
  min-width: 110px;
}

.tags-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  background: rgba(30, 41, 59, 0.75);
  color: #e2e8f0;
  border: 1px solid rgba(148, 163, 184, 0.2);
  padding: 2px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.tech-tag:hover {
  border-color: rgba(56, 189, 248, 0.4);
  color: #38bdf8;
}

/* Enlace a GitHub */
.github-link-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 8px;
  color: #cbd5e1;
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.github-link-btn:hover {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(56, 189, 248, 0.4);
  color: #f8fafc;
  transform: translateY(-1px);
}

/* Columna Derecha: Tarjeta de Login */
.login-card {
  background: rgba(17, 24, 39, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.09);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.demo-live-badge {
  display: flex;
  align-items: center;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 3px 8px;
  border-radius: 6px;
  color: #34d399;
  font-size: 0.72rem;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background-color: #34d399;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
  animation: pulseDot 2s infinite;
}

@keyframes pulseDot {
  0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
  70% { box-shadow: 0 0 0 6px rgba(52, 211, 153, 0); }
  100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
}

.demo-info-banner {
  background: rgba(6, 182, 212, 0.08);
  border: 1px solid rgba(6, 182, 212, 0.2);
}

.field-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

/* Botón Principal */
.btn-primary-action {
  height: 48px !important;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
  border-radius: 10px !important;
  font-size: 0.92rem !important;
  letter-spacing: 0.01em;
  transition: all 0.2s ease;
  box-shadow: 0 6px 16px -2px rgba(37, 99, 235, 0.45) !important;
}

.btn-primary-action:hover {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
  transform: translateY(-1px);
  box-shadow: 0 10px 20px -2px rgba(37, 99, 235, 0.6) !important;
}

/* Botón Secundario */
.btn-secondary-action {
  height: 44px !important;
  border-radius: 10px !important;
  border-color: rgba(148, 163, 184, 0.25) !important;
  font-size: 0.85rem !important;
  transition: all 0.2s ease;
}

.btn-secondary-action:hover {
  background: rgba(255, 255, 255, 0.04) !important;
  border-color: rgba(148, 163, 184, 0.4) !important;
}

.border-top-subtle {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

/* Tipografía Mono */
.font-mono {
  font-family: 'JetBrains Mono', monospace !important;
}

/* Utility colors */
.text-slate-100 { color: #f1f5f9; }
.text-slate-200 { color: #e2e8f0; }
.text-slate-300 { color: #cbd5e1; }
.text-slate-400 { color: #94a3b8; }
.text-slate-500 { color: #64748b; }
.text-cyan-300 { color: #67e8f9; }
.text-cyan-400 { color: #22d3ee; }
.text-indigo-300 { color: #a5b4fc; }
.text-emerald-300 { color: #6ee7b7; }
.text-violet-300 { color: #c4b5fd; }
</style>
