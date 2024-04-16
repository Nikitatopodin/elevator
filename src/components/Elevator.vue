<script setup>
import { useElevatorsStore, useGeneralStore } from '@/stores/store';

const props = defineProps(['elevId']);
const id = props.elevId;
const elevatorsStore = useElevatorsStore();
const store = useGeneralStore();
const levels = store.levels;

</script>

<template>
  <div class="elevator" :style="{
    transform: `translateY(-${(elevatorsStore.elevators[id].targetLevel ? elevatorsStore.elevators[id].targetLevel - 1 : elevatorsStore.elevators[id].currentLevel - 1) * 100}%)`,
    transition: `all ${elevatorsStore.getStartElevatorPos(id)}s`
  }">
  </div>
</template>

<style scoped>
.elevator {
  position: absolute;

  width: 100%;
  height: calc(100%/v-bind(levels));
  background-color: aqua;
}
</style>
