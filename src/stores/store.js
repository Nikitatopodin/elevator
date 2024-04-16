import { ref } from 'vue'
import { defineStore } from 'pinia'
import options from '@/options'

export const useElevatorsStore = defineStore('elevator', () => {
  const elevators = ref([]);

  for (let i = 0; i < options.elevators; i++) {
    elevators.value.push({
      id: ref(i),
      currentLevel: ref(1),
      isMoving: ref(false),
      targetLevel: null
    })
  }

  function toggleIsMoving(id) {
    elevators.value[id].isMoving = !elevators.value[id].isMoving;
  }

  function setTargetLevel(id, level) {
    elevators.value[id].targetLevel = ref(level);
  }

  function setCurrentLevel(id, level) {
    elevators.value[id].currentLevel = ref(level);
  }

  function getStartElevatorPos(id) {
    return Math.abs(elevators.value[id].currentLevel - elevators.value[id].targetLevel);
  }

  function getTargetLevels() {
    return elevators.value.map(elevator => elevator.targetLevel);
  }

  return { elevators, toggleIsMoving, setCurrentLevel, setTargetLevel, getStartElevatorPos, getTargetLevels }
})

export const useGeneralStore = defineStore('callQueue', () => {
  const levels = ref(options.levels);
  const callQueue = [];

  function addCallToQueue(level) {
    if (!callQueue.includes(level)) {
      callQueue.push(level);
    }
    return
  }

  function removeCallFromQueue() {
    callQueue.shift();
  }

  return { callQueue, addCallToQueue, removeCallFromQueue, levels }
})

