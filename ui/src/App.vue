<script setup lang="ts">
const env = import.meta.env;
const API_URL = `http://${env.VITE_API_HOST}:${env.VITE_API_PORT}`

const countdownStateEndpoint = `${API_URL}/state`;

import Countdowns from './components/Countdowns.vue';
import DayIndexer from './components/DayIndexer/DayIndexer.vue';

</script>

<template>
                          <DayIndexer start-date="2023-10-18" :past-days-to-display=2 :future-days-to-display=7 />
  <Countdowns :api-state-endpoint="countdownStateEndpoint" />
</template>

<style scoped>
body {
  background-color: #333;
  color: #f5f5f5;
  font-family: Arial, sans-serif;
}
</style>
