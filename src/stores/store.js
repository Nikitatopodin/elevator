import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useElevatorsStore = defineStore('elevator', () => {
  const elevators = [{
    id: ref(0),
    currentLevel: ref(1),
    isMoving: false,
    targetLevel: null
  }, {
    id: ref(1),
    currentLevel: ref(1),
    isMoving: false,
    targetLevel: null
  }, {
    id: ref(2),
    currentLevel: ref(1),
    isMoving: false,
    targetLevel: null
  }]

  function toggleIsMoving(id) {
    elevators[id].isMoving = !isMoving
  }

  function settargetLevel(id, level) {
    elevators[id].targetLevel = level;
  }

  function setCurrentLevel(id, level) {
    elevators[id].currentLevel = level;
  }

  return { elevators, toggleIsMoving, setCurrentLevel, settargetLevel }
})
export const useGeneralStore = defineStore('callQueue', () => {
  const levels = ref(5);
  const callQueue = [];

  function addCallToQueue(level) {
    if (!callQueue.includes(level)) {
      callQueue.push(level);
    }
    console.log(callQueue);
    return
  }

  function removeCallFromQueue() {
    callQueue.shift();
    console.log(callQueue)
  }

  return { callQueue, addCallToQueue, removeCallFromQueue, levels }
})

