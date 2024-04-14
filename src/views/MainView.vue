<script setup>
import { useElevatorsStore } from '@/stores/store';
import { useGeneralStore } from '@/stores/store';
import Shaft from '../components/Shaft.vue'
import ElevatorControllers from '@/components/ElevatorControllers.vue';

const elevatorsStore = useElevatorsStore();
const store = useGeneralStore();
</script>

<template>
  <main class="main">
    <Shaft v-for="elevator in elevatorsStore.elevators" :key="elevator.id" />
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