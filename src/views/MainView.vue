<script setup>
import Shaft from '../components/Shaft.vue'
import ElevatorControllers from '@/components/ElevatorControllers.vue';
</script>

<template>
  <main class="main">
    <Shaft />
    <ElevatorControllers />
  </main>
</template>
<style scoped>
.main {
  display: flex;
  gap: 20px;

  padding: 20px;
}
</style>