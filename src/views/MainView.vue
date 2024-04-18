<script setup>
import { useElevatorsStore } from '@/stores/store';
import Shaft from '@/components/Shaft.vue'
import ElevatorControllers from '@/components/ElevatorControllers.vue';
import Options from '@/components/Options.vue'

const elevatorsStore = useElevatorsStore();
</script>

<template>
  <header class="header">
    <Options />
  </header>
  <main class="main">
    <Shaft v-for="elevator in elevatorsStore.elevators" :key="elevator.id" :elev-id="elevator.id" />
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