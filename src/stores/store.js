import { ref } from 'vue'
import { defineStore } from 'pinia'
import options from '@/options'

export const useElevatorsStore = defineStore('elevator', () => {
  window.onbeforeunload = () => localStorage.setItem('elevator-store', JSON.stringify(elevators.value))
  const getDefaultOptions = () => {
    const arr = [];
    for (let i = 0; i < options.elevators; i++) {
      arr.push({
        id: ref(i),
        currentLevel: ref(1),
        isMoving: ref(false),
        targetLevel: ref(null)
      })
    }
    return arr
  }

  const getOptions = () => {
    const options = localStorage.getItem('elevator-store');
    if (!options) {
      return getDefaultOptions();
    }
    const elevators = JSON.parse(options);
    const result = elevators.map(elevator => {
      const elevatorObj = {
        ...elevator,
        currentLevel: ref(elevator.targetLevel ? elevator.targetLevel : elevator.currentLevel),
        targetLevel: ref(null),
        isMoving: ref(false)
      }
      return elevatorObj
    });
    return result
  }

  const elevators = ref(getOptions());

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
  const savedQueue = localStorage.getItem('callQueue');
  const callQueue = savedQueue ? JSON.parse(savedQueue) : [];

  function addCallToQueue(level) {
    if (!callQueue.includes(level)) {
      callQueue.push(level);
      localStorage.setItem('callQueue', JSON.stringify(callQueue));
    }
    return
  }

  function removeCallFromQueue() {
    callQueue.shift();
    localStorage.setItem('callQueue', JSON.stringify(callQueue));
  }

  return { callQueue, addCallToQueue, removeCallFromQueue, levels }
})

