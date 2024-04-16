<script setup>
import { useGeneralStore, useElevatorsStore } from '@/stores/store';

const store = useGeneralStore();
const elevatorsStore = useElevatorsStore();

const getClosestElevator = (targetLevel) => {
  let delay;
  const stationaryElevators = elevatorsStore.elevators.filter(elevator => !elevator.isMoving);
  if (stationaryElevators.length < 1) {
    return;
  }
  const closestElevator = stationaryElevators.reduce((acc, elevator) => {
    const difference = Math.abs(targetLevel - elevator.currentLevel);
    if (!acc) {
      acc = {
        difference,
        elevator
      }
    }
    if (difference < acc.difference) {
      acc = {
        difference,
        elevator
      }
    }
    delay = difference;
    return acc;
  }, null);

  return closestElevator;
}

const callElevator = (targetLevel) => {
  if (elevatorsStore.getTargetLevels().includes(targetLevel)) {
    return
  }
  const closestElevator = getClosestElevator(targetLevel);
  if (!closestElevator) {
    store.addCallToQueue(targetLevel);
    return
  }
  const elevator = closestElevator.elevator;
  const delay = closestElevator.difference * 1000;
  elevatorsStore.toggleIsMoving(elevator.id);
  elevatorsStore.setTargetLevel(elevator.id, targetLevel);
  if (store.callQueue.length > 0) {
    store.removeCallFromQueue();
  }
  setTimeout(() => {
    elevatorsStore.toggleIsMoving(elevator.id);
    elevatorsStore.setTargetLevel(elevator.id, null);
    elevatorsStore.setCurrentLevel(elevator.id, targetLevel);
    if (store.callQueue.length > 0) {
      callElevator(store.callQueue[0]);
    }
  }, delay + 3000);

}
</script>

<template>

  <div class="controllers">
    <ul class="controllers__list">
      <li class="controllers__item" v-for="(level, index) in store.levels">
        <span class="level" v-html="index + 1"></span>
        <button class="btn" @click="callElevator(index + 1)"></button>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.controllers {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.controllers__list {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;

  padding: 0;
  width: 100%;
  height: 100%;
}

.controllers__item {
  display: block;
  height: 100%;
  width: 100%;
}

.btn {
  display: block;
  height: 15px;
}
</style>
