<script setup lang="ts">
import { ref } from 'vue';
import Countdowns from './components/Countdowns.vue';
import DayIndexer from './components/DayIndexer/DayIndexer.vue';

const env = import.meta.env;
const API_URL = `http://${env.VITE_API_HOST}:${env.VITE_API_PORT}`;

const countdownStateEndpoint = `${API_URL}/state`;
const inProgressDay = ref<number>(1);
const updateInProgressDay = (day: number) => inProgressDay.value = day
</script>

<template>
  <DayIndexer start-date="2023-10-18" :inProgressDay="inProgressDay" />
  <Countdowns :api-state-endpoint="countdownStateEndpoint" :on-update-day="updateInProgressDay" />
</template>

<style scoped>
body {
  background-color: #333;
  color: #f5f5f5;
  font-family: Arial, sans-serif;
}
</style>
