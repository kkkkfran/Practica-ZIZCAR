<template>
  <div class="login-wrapper">
    <!-- Fondos decorativos con orbes de gradiente estilo SaaS moderno -->
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
    <div class="glow-orb orb-3"></div>

    <v-container class="fill-height py-8 px-4" fluid>
      <v-row align="center" justify="center" class="w-100 mx-auto" style="max-width: 1180px;">
        
        <!-- ============================================== -->
        <!-- COLUMNA IZQUIERDA: PRESENTACIÓN DE MARCA Y DEMO -->
        <!-- ============================================== -->
        <v-col cols="12" md="6" class="pr-md-6 mb-6 mb-md-0">
          <div class="brand-hero">
            <!-- Badge de estado -->
            <div class="d-inline-flex align-center demo-badge mb-4">
              <span class="pulse-dot mr-2"></span>
              <span class="text-caption font-weight-bold text-uppercase tracking-wider">
                Portfolio Showcase • Modo Demo Activo
              </span>
            </div>

            <!-- Título y Logotipo -->
            <div class="d-flex align-center mb-3">
              <div class="brand-icon-box mr-3">
                <v-icon icon="mdi-shield-crown-outline" color="white" size="28"></v-icon>
              </div>
              <div>
                <h1 class="text-h3 font-weight-black brand-title">ZIZCAR</h1>
                <p class="text-caption text-blue-grey-lighten-2 font-weight-medium">
                  Financial Data Intelligence & Ingestion Hub
                </p>
              </div>
            </div>

            <p class="text-body-1 text-blue-grey-lighten-1 mb-6 brand-description">
              Plataforma integral para ingesta automatizada de estados financieros vía PDF, 
              conciliación contable con normalización Idempotente (Upsert) y analítica con Power BI.
            </p>

            <!-- ========================================== -->
            <!-- TARJETA FLOTANTE DE ACCESO DE DEMOSTRACIÓN -->
            <!-- ========================================== -->
            <v-card class="demo-card glass-panel pa-5 mb-4" rounded="xl" elevation="0">
              <div class="d-flex align-center justify-space-between mb-3">
                <div class="d-flex align-center">
                  <v-avatar color="indigo-darken-3" size="36" class="mr-3">
                    <v-icon icon="mdi-lightning-bolt" color="cyan-accent-2" size="20"></v-icon>
                  </v-avatar>
                  <div>
                    <h2 class="text-subtitle-1 font-weight-bold text-white mb-0">
                      Acceso de Demostración
                    </h2>
                    <span class="text-caption text-blue-grey-lighten-2">
                      Sin necesidad de base de datos local
                    </span>
                  </div>
                </div>

                <v-chip size="x-small" color="teal-accent-3" variant="tonal" class="font-weight-bold">
                  INTERACTIVO
                </v-chip>
              </div>

              <p class="text-caption text-blue-grey-lighten-1 mb-3">
                Explora el dashboard, filtros, tablas financieras y simulación de carga PDF con datos precargados reales:
              </p>

              <!-- Credenciales visibles en texto claro con botón interactivo -->
              <div class="credential-box pa-3 mb-4 rounded-lg">
                <div class="d-flex align-center justify-space-between mb-2">
                  <div class="d-flex align-center text-truncate">
                    <v-icon icon="mdi-account-circle-outline" size="16" color="cyan-lighten-3" class="mr-2"></v-icon>
                    <span class="text-caption text-blue-grey-lighten-3 mr-2">Email:</span>
                    <code class="cred-code">{{ demoCredentials.email }}</code>
                  </div>
                  <v-btn
                    variant="text"
                    size="x-small"
                    color="cyan-accent-2"
                    icon="mdi-content-copy"
                    title="Copiar email"
                    @click="copyToClipboard(demoCredentials.email, 'Email copiado')"
                  ></v-btn>
                </div>

                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center text-truncate">
                    <v-icon icon="mdi-key-outline" size="16" color="indigo-lighten-3" class="mr-2"></v-icon>
                    <span class="text-caption text-blue-grey-lighten-3 mr-2">Pass:</span>
                    <code class="cred-code">{{ demoCredentials.password }}</code>
                  </div>
                  <v-btn
                    variant="text"
                    size="x-small"
                    color="cyan-accent-2"
                    icon="mdi-content-copy"
                    title="Copiar contraseña"
                    @click="copyToClipboard(demoCredentials.password, 'Contraseña copiada')"
                  ></v-btn>
                </div>
              </div>

              <!-- Botones de Acción Rápida -->
              <div class="d-flex flex-column flex-sm-row gap-2">
                <v-btn
                  color="cyan-accent-3"
                  class="text-indigo-darken-4 font-weight-black flex-grow-1 quick-btn"
                  prepend-icon="mdi-lightning-bolt"
                  rounded="lg"
                  variant="flat"
                  :loading="quickLoading"
                  @click="handleQuickGuestLogin"
                >
                  Ingresar como Invitado (1 Clic)
                </v-btn>

                <v-btn
                  variant="outlined"
                  color="blue-grey-lighten-2"
                  class="font-weight-bold autofill-btn"
                  prepend-icon="mdi-form-textbox"
                  rounded="lg"
                  @click="handleAutofill"
                >
                  Autocompletar
                </v-btn>
              </div>
            </v-card>

            <!-- Tags tecnológicos -->
            <div class="d-flex flex-wrap align-center mt-4 gap-1">
              <span class="text-caption text-blue-grey-lighten-3 mr-2">Stack:</span>
              <v-chip size="x-small" variant="outlined" color="blue-lighten-3" class="tech-chip">Vue 3</v-chip>
              <v-chip size="x-small" variant="outlined" color="blue-lighten-3" class="tech-chip">Vuetify 3</v-chip>
              <v-chip size="x-small" variant="outlined" color="blue-lighten-3" class="tech-chip">Pinia</v-chip>
              <v-chip size="x-small" variant="outlined" color="blue-lighten-3" class="tech-chip">NestJS</v-chip>
              <v-chip size="x-small" variant="outlined" color="blue-lighten-3" class="tech-chip">Power BI</v-chip>
            </div>
          </div>
        </v-col>

        <!-- ============================================== -->
        <!-- COLUMNA DERECHA: FORMULARIO GLASSMORPHISM     -->
        <!-- ============================================== -->
        <v-col cols="12" md="6" lg="5">
          <v-card class="login-card glass-panel pa-6 pa-sm-8" rounded="2xl" elevation="24">
            
            <div class="text-center mb-6">
              <h2 class="text-h5 font-weight-bold text-white mb-1">
                Iniciar Sesión
              </h2>
              <p class="text-caption text-blue-grey-lighten-2">
                Ingresa al panel de control financiero de ZIZCAR
              </p>
            </div>

            <!-- Feedback de autocompletado -->
            <v-slide-y-transition>
              <v-alert
                v-if="feedbackMsg"
                type="success"
                variant="tonal"
                density="compact"
                rounded="lg"
                class="mb-4"
                closable
                @click:close="feedbackMsg = ''"
              >
                {{ feedbackMsg }}
              </v-alert>
            </v-slide-y-transition>

            <v-form @submit.prevent="handleLogin" ref="loginForm">
              <!-- Campo Email -->
              <div class="input-group mb-4">
                <label class="input-label text-caption font-weight-bold text-blue-grey-lighten-2 mb-1 d-block">
                  CORREO ELECTRÓNICO
                </label>
                <v-text-field
                  v-model="email"
                  placeholder="ej: demo@zizcar.com"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  color="cyan-accent-2"
                  base-color="blue-grey-darken-1"
                  bg-color="rgba(15, 23, 42, 0.6)"
                  :rules="[rules.required, rules.email]"
                  hide-details="auto"
                  required
                ></v-text-field>
              </div>

              <!-- Campo Password -->
              <div class="input-group mb-5">
                <div class="d-flex justify-space-between align-center mb-1">
                  <label class="input-label text-caption font-weight-bold text-blue-grey-lighten-2">
                    CONTRASEÑA
                  </label>
                  <a
                    href="#"
                    class="text-caption text-cyan-accent-2 text-decoration-none"
                    @click.prevent="handleAutofill"
                  >
                    ¿Usar credencial demo?
                  </a>
                </div>
                <v-text-field
                  v-model="password"
                  placeholder="••••••••"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append-inner="showPassword = !showPassword"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  color="cyan-accent-2"
                  base-color="blue-grey-darken-1"
                  bg-color="rgba(15, 23, 42, 0.6)"
                  :rules="[rules.required]"
                  hide-details="auto"
                  required
                ></v-text-field>
              </div>

              <!-- Alerta de Error -->
              <v-slide-y-transition>
                <v-alert
                  v-if="error"
                  type="error"
                  variant="tonal"
                  density="compact"
                  rounded="lg"
                  class="mb-4"
                  closable
                  @click:close="error = ''"
                >
                  <div class="d-flex align-center justify-space-between">
                    <span>{{ error }}</span>
                    <v-btn
                      size="x-small"
                      variant="text"
                      color="white"
                      class="text-decoration-underline"
                      @click="handleAutofill"
                    >
                      Autocompletar Demo
                    </v-btn>
                  </div>
                </v-alert>
              </v-slide-y-transition>

              <!-- Botón Principal de Envío -->
              <v-btn
                type="submit"
                block
                size="large"
                rounded="lg"
                class="login-submit-btn font-weight-black text-white mb-4"
                :loading="loading"
                elevation="6"
              >
                <span>Acceder a la Plataforma</span>
                <v-icon icon="mdi-arrow-right" end class="ml-2"></v-icon>
              </v-btn>
            </v-form>

            <v-divider class="border-opacity-25 my-4" color="blue-grey-lighten-2">
              <span class="text-caption text-blue-grey-lighten-3 px-2">o bien</span>
            </v-divider>

            <!-- Acceso Directo Secundario -->
            <v-btn
              block
              variant="tonal"
              color="indigo-lighten-3"
              rounded="lg"
              class="font-weight-bold guest-btn"
              prepend-icon="mdi-account-check-outline"
              :loading="quickLoading"
              @click="handleQuickGuestLogin"
            >
              Explorar sin credenciales (Modo Invitado)
            </v-btn>

            <div class="text-center mt-6">
              <p class="text-caption text-blue-grey-lighten-3 mb-0">
                Desafío Técnico Full Stack • <strong>Francisco Jara</strong>
              </p>
            </div>
          </v-card>
        </v-col>

      </v-row>
    </v-container>

    <!-- Snackbar para avisos rápidos -->
    <v-snackbar
      v-model="snackbar"
      :timeout="2200"
      color="indigo-darken-3"
      rounded="lg"
      location="bottom right"
    >
      <div class="d-flex align-center">
        <v-icon icon="mdi-check-circle-outline" color="cyan-accent-2" class="mr-2"></v-icon>
        <span class="text-body-2 font-weight-medium text-white">{{ snackbarText }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore, DEMO_CREDENTIALS } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

// Credenciales demo por defecto
const demoCredentials = DEMO_CREDENTIALS[0];

// Estado de inputs (pre-llenados con la cuenta demo recomendada para la mejor UX)
const email = ref(demoCredentials.email);
const password = ref(demoCredentials.password);

// Controles de interfaz
const showPassword = ref(false);
const loading = ref(false);
const quickLoading = ref(false);
const error = ref('');
const feedbackMsg = ref('');
const snackbar = ref(false);
const snackbarText = ref('');

// Reglas de validación
const rules = {
  required: (v: string) => !!v || 'Este campo es obligatorio',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Introduce un email válido',
};

// Autocompletar formulario
const handleAutofill = () => {
  email.value = demoCredentials.email;
  password.value = demoCredentials.password;
  error.value = '';
  feedbackMsg.value = '✓ Credenciales demo aplicadas en el formulario.';
  triggerSnackbar('Credenciales autocompletadas');
};

// Copiar al portapapeles
const copyToClipboard = async (text: string, msg: string) => {
  try {
    await navigator.clipboard.writeText(text);
    triggerSnackbar(msg);
  } catch {
    triggerSnackbar(`Copiado: ${text}`);
  }
};

const triggerSnackbar = (msg: string) => {
  snackbarText.value = msg;
  snackbar.value = true;
};

// Inicio de sesión normal / formulario
const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Por favor completa todos los campos';
    return;
  }

  loading.value = true;
  error.value = '';
  feedbackMsg.value = '';

  try {
    await authStore.login(email.value, password.value);
    router.push('/records');
  } catch (e: any) {
    error.value = 'Credenciales no reconocidas. Usa las credenciales del panel demo.';
  } finally {
    loading.value = false;
  }
};

// Acceso rápido en 1 solo clic
const handleQuickGuestLogin = async () => {
  quickLoading.value = true;
  error.value = '';
  feedbackMsg.value = '';

  try {
    await authStore.loginAsDemo(0);
    router.push('/records');
  } catch (e) {
    error.value = 'No se pudo iniciar el modo demostración';
  } finally {
    quickLoading.value = false;
  }
};
</script>

<style scoped>
/* Contenedor general en pantalla completa */
.login-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(circle at 15% 20%, #111a36 0%, #080c16 60%, #03060d 100%);
  overflow-x: hidden;
  display: flex;
  align-items: center;
}

/* Orbes de luz de fondo con blur pronunciado */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.55;
  animation: floatOrb 14s ease-in-out infinite alternate;
}

.orb-1 {
  top: -80px;
  left: 5%;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.45) 0%, rgba(99, 102, 241, 0.2) 70%, transparent 100%);
}

.orb-2 {
  bottom: -100px;
  right: 5%;
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(79, 70, 229, 0.25) 70%, transparent 100%);
  animation-duration: 18s;
}

.orb-3 {
  top: 40%;
  left: 45%;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%);
  animation-duration: 22s;
}

@keyframes floatOrb {
  0% {
    transform: translateY(0) scale(1);
  }
  100% {
    transform: translateY(-30px) scale(1.08);
  }
}

/* Efecto Glassmorphism */
.glass-panel {
  background: rgba(15, 23, 42, 0.72) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
}

/* Hero Branding */
.brand-hero {
  position: relative;
  z-index: 1;
}

.brand-icon-box {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.4);
}

.brand-title {
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, #ffffff 40%, #a5b4fc 80%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-description {
  line-height: 1.6;
  max-width: 520px;
}

/* Badge con pulso de estado */
.demo-badge {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(52, 211, 153, 0.3);
  padding: 5px 12px;
  border-radius: 9999px;
  color: #34d399;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: #34d399;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
  animation: pulseAnimation 2s infinite;
}

@keyframes pulseAnimation {
  0% {
    box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(52, 211, 153, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 211, 153, 0);
  }
}

/* Tarjeta flotante de Demo */
.demo-card {
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(79, 70, 229, 0.15) !important;
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.demo-card:hover {
  transform: translateY(-2px);
  border-color: rgba(99, 102, 241, 0.3) !important;
}

.credential-box {
  background: rgba(2, 6, 23, 0.6);
  border: 1px dashed rgba(148, 163, 184, 0.25);
}

.cred-code {
  background: rgba(30, 41, 59, 0.8);
  color: #38bdf8;
  padding: 2px 7px;
  border-radius: 5px;
  font-family: monospace;
  font-size: 0.82rem;
}

.quick-btn {
  letter-spacing: 0.02em;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 8px 20px -4px rgba(6, 182, 212, 0.45);
}

.quick-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px -4px rgba(6, 182, 212, 0.6);
}

.autofill-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}

.tech-chip {
  background: rgba(15, 23, 42, 0.8) !important;
  border-color: rgba(148, 163, 184, 0.2) !important;
}

/* Tarjeta de Formulario */
.login-card {
  position: relative;
  z-index: 1;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(59, 130, 246, 0.12) !important;
}

/* Botón de Submit */
.login-submit-btn {
  background: linear-gradient(135deg, #4f46e5 0%, #2563eb 50%, #0284c7 100%) !important;
  letter-spacing: 0.03em;
  transition: all 0.25s ease;
  box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.45);
}

.login-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px -5px rgba(37, 99, 235, 0.6);
}

.guest-btn {
  background: rgba(99, 102, 241, 0.1) !important;
  border: 1px solid rgba(129, 140, 248, 0.25);
  transition: all 0.2s ease;
}

.guest-btn:hover {
  background: rgba(99, 102, 241, 0.2) !important;
  transform: translateY(-1px);
}

.gap-1 {
  gap: 6px;
}

.gap-2 {
  gap: 10px;
}
</style>
