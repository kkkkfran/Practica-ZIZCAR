<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
</script>

<style>
/* Tipografía global moderna: Plus Jakarta Sans y JetBrains Mono */
body,
.v-application,
.v-application .text-body-1,
.v-application .text-body-2,
.v-application .text-subtitle-1,
.v-application .text-subtitle-2,
.v-application .text-h1,
.v-application .text-h2,
.v-application .text-h3,
.v-application .text-h4,
.v-application .text-h5,
.v-application .text-h6,
.v-application .v-btn,
.v-application .v-card,
.v-application .v-input {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
}

code, kbd, samp, pre, .font-mono {
  font-family: 'JetBrains Mono', monospace !important;
}
</style>