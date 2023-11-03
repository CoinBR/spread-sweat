<script setup lang="ts">
const env = import.meta.env;
const API_URL = `http://${env.VITE_API_HOST}:${env.VITE_API_PORT}`

const countdownStateEndpoint = `${API_URL}/state`;

import Countdowns from './components/Countdowns.vue';
</script>

<template>
  <Countdowns :api-state-endpoint="countdownStateEndpoint" />
</template>

<style scoped>
body {
  background-color: #333;
  color: #f5f5f5;
  font-family: Arial, sans-serif;
}
</style>
