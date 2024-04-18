import { ref } from 'vue'
import { defineStore } from 'pinia'
import options from '@/options'

export const useElevatorsStore = defineStore('elevator', () => {
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('elevator-store#5151', JSON.stringify(elevators.value))
  })

  const getDefaultOptions = () => {
    const arr = [];
    for (let i = 0; i < options.elevators; i++) {
      arr.push({
        id: ref(i),
        prevLevel: ref(null),
        currentLevel: ref(1),
        isMoving: ref(false),
        targetLevel: ref(null),
        isReady: ref(true),
      })
    }
    return arr
  }

  const getOptions = () => {
    const options = localStorage.getItem('elevator-store#5151');
    if (!options) {
      return getDefaultOptions();
    }
    const elevators = JSON.parse(options);
    const result = elevators.map(elevator => {
      const elevatorObj = {
        ...elevator,
        currentLevel: ref(elevator.targetLevel ? elevator.targetLevel : elevator.currentLevel),
        targetLevel: ref(null),
        isMoving: ref(false),
        isReady: ref(true),
      }
      return elevatorObj
    });
    return result
  }

  const elevators = ref(getOptions());
  const timeouts = ref([]);

  function toggleIsMoving(id) {
    elevators.value[id].isMoving = !elevators.value[id].isMoving;
  }

  function setTargetLevel(id, level) {
    elevators.value[id].targetLevel = ref(level);
  }

  function setCurrentLevel(id, level) {
    elevators.value[id].currentLevel = ref(level);
  }

  function setPrevLevel(id, level) {
    elevators.value[id].prevLevel = ref(level);
  }

  function getPosDifference(id) {
    return Math.abs(elevators.value[id].prevLevel - elevators.value[id].targetLevel);
  }

  function getTargetLevels() {
    return elevators.value.map(elevator => elevator.targetLevel);
  }

  function getCurrentLevels() {
    return elevators.value.map(elevator => elevator.currentLevel);
  }

  function getPrevLevels() {
    return elevators.value.map(elevator => elevator.prevLevel);
  }

  function toggleIsReady(id) {
    elevators.value[id].isReady = !elevators.value[id].isReady
  }

  function resetElevators() {
    elevators.value = getDefaultOptions();
    timeouts.value.forEach(timeout => clearTimeout(timeout))
    timeouts.value = [];
  }

  function resetElevatorsPositions() {
    elevators.value = elevators.value.map(elevator => {
      const elevatorObj = {
        ...elevator,
        currentLevel: ref(1),
        prevLevel: ref(null)
      }
      return elevatorObj
    })
  }

  function setElevatorsNum(num) {
    if (num > elevators.value.length) {
      for (let i = elevators.value.length; i < num; i++) {
        elevators.value.push({
          id: ref(i),
          currentLevel: ref(1),
          isMoving: ref(false),
          targetLevel: ref(null),
          isReady: ref(true),
        })
      }
    } else {
      for (let i = elevators.value.length; i > num; i--) {
        elevators.value.pop()
      }
    }
  }

  function correctElevatorsPos(num) {
    elevators.value.forEach(elevator => {
      if (elevator.currentLevel > num) {
        elevator.currentLevel = num;
      }
    })
  }

  return {
    elevators,
    timeouts,
    toggleIsMoving,
    setCurrentLevel,
    setTargetLevel,
    setPrevLevel,
    getPosDifference,
    getTargetLevels,
    toggleIsReady,
    getCurrentLevels,
    getPrevLevels,
    setElevatorsNum,
    getDefaultOptions,
    resetElevators,
    resetElevatorsPositions,
    correctElevatorsPos
  }
})

export const useGeneralStore = defineStore('store', () => {
  window.addEventListener('beforeunload', (e) => {
    localStorage.setItem('elevator-settings#5151', JSON.stringify(levels.value))
  })

  const getSettings = () => {
    const storageSettings = localStorage.getItem('elevator-settings#5151');
    if (!storageSettings) {
      return options.levels
    }

    return JSON.parse(localStorage.getItem('elevator-settings#5151'));
  }

  const levels = ref(getSettings());
  const savedQueue = localStorage.getItem('call-queue#5151');
  const callQueue = savedQueue ? ref(JSON.parse(savedQueue)) : ref([]);

  function addCallToQueue(level) {
    if (!callQueue.value.includes(level)) {
      callQueue.value.push(level);
      localStorage.setItem('call-queue#5151', JSON.stringify(callQueue.value));
    }
    return
  }

  function removeCallFromQueue() {
    callQueue.value.shift();
    localStorage.setItem('call-queue#5151', JSON.stringify(callQueue.value));
  }

  function setLevelsNum(num) {
    if (num > 800) {
      num = 800;
    }
    levels.value = num;
  }

  function resetSettings() {
    levels.value = options.levels;
    callQueue.value = [];
  }

  return {
    callQueue,
    levels,
    addCallToQueue,
    removeCallFromQueue,
    setLevelsNum,
    resetSettings
  }
})