<script setup>
import { useGeneralStore, useElevatorsStore } from '@/stores/store';

const store = useGeneralStore();
const elevatorsStore = useElevatorsStore();

const isCalled = (index) => {
  const queue = store.callQueue
  const targetLevels = elevatorsStore.getTargetLevels();

  if (queue.includes(index) || targetLevels.includes(index)) {
    return true
  }

  return false;
}

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
  const targetLevels = elevatorsStore.getTargetLevels();
  const currentLevels = elevatorsStore.getCurrentLevels();
  if (targetLevels.includes(targetLevel) || currentLevels.includes(targetLevel)) {
    return
  }

  const closestElevator = getClosestElevator(targetLevel);
  if (!closestElevator) {
    store.addCallToQueue(targetLevel);
    return
  }

  const elevator = closestElevator.elevator;
  const delay = closestElevator.difference * 1000;

  elevatorsStore.setTargetLevel(elevator.id, targetLevel);
  elevatorsStore.setPrevLevel(elevator.id, elevator.currentLevel);
  elevatorsStore.setCurrentLevel(elevator.id, null);
  elevatorsStore.toggleIsMoving(elevator.id);

  if (store.callQueue.length > 0) {
    store.removeCallFromQueue();
  }

  const timeout = setTimeout(() => {
    elevatorsStore.setTargetLevel(elevator.id, null);
    elevatorsStore.setPrevLevel(elevator.id, null);
    elevatorsStore.setCurrentLevel(elevator.id, targetLevel);
    elevatorsStore.toggleIsReady(elevator.id);
    setTimeout(() => {
      elevatorsStore.toggleIsReady(elevator.id);
      elevatorsStore.toggleIsMoving(elevator.id);
      if (store.callQueue.length > 0) {
        callElevator(store.callQueue[0]);
      }
    }, 3000)
  }, delay);

  elevatorsStore.timeouts.push(timeout)
}

if (store.callQueue.length > 0) {
  const queue = store.callQueue;
  queue.forEach(call => setTimeout(() => callElevator(call)))
}
</script>

<template>

  <div class="controllers">
    <ul class="controllers__list">
      <li class="controllers__item" v-for="(level, index) in store.levels">
        <span class="level" v-html="index + 1"></span>
        <button :class="isCalled(index + 1) ? 'btn btn--active' : 'btn'" @click="callElevator(index + 1)"></button>
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

.btn--active {
  background-color: brown;
}
</style>
