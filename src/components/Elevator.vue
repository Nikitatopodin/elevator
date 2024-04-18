<script setup>
import { useElevatorsStore, useGeneralStore } from '@/stores/store';

const props = defineProps(['elevId']);
const id = props.elevId;
const elevatorsStore = useElevatorsStore();
const store = useGeneralStore();

const getDirection = () => {
  if (!elevatorsStore.elevators[id].targetLevel) {
    return ''
  }
  return elevatorsStore.elevators[id].targetLevel <
    elevatorsStore.elevators[id].currentLevel && elevatorsStore.elevators[id].targetLevel ? '↓' : '↑'
}

const getCurrentPos = () => {
  if (elevatorsStore.elevators[id].currentLevel) {
    return elevatorsStore.elevators[id].currentLevel;
  }

  if (!elevatorsStore.elevators[id].targetLevel && !elevatorsStore.elevators[id].prevLevel) {
    return elevatorsStore.elevators[id].currentLevel;
  }

  if (!elevatorsStore.elevators[id].targetLevel) {
    return elevatorsStore.elevators[id].prevLevel;
  }

  return elevatorsStore.elevators[id].targetLevel;
}

</script>

<template>
  <div class="elevator" :style="{
    transform: `translateY(-${(getCurrentPos() - 1) * 100}%)`,
    transition: `linear ${elevatorsStore.getPosDifference(id)}s`,
    height: `${100 / store.levels}%`
  }">
    <div
      :class="elevatorsStore.elevators[id].isReady ? 'elevator__indicator' : 'elevator__indicator elevator__indicator--blocked'">
    </div>
    <span class="elevator__target"> {{ elevatorsStore.elevators[id].targetLevel }}</span>
    <span class="elevator__direction">{{ getDirection() }}</span>
  </div>
</template>

<style scoped>
@keyframes blinker {
  from {
    background-color: rgb(230, 230, 230)
  }

  to {
    background-color: rgb(255, 54, 47)
  }
}

.elevator {
  position: absolute;

  width: 100%;

  text-align: center;

  background-color: rgb(230, 230, 230);
  border: 3px solid rgb(130, 130, 130)
}

.elevator__indicator {
  width: 15px;
  height: 15px;
  margin: 0 auto;

  background-color: rgb(0, 227, 65);
}

.elevator__indicator--blocked {
  animation-name: blinker;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(1.0, 0, 0, 1.0);
  animation-duration: 0.5s;
}
</style>
