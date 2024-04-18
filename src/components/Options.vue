<script setup>
import { useElevatorsStore } from '@/stores/store';
import { useGeneralStore } from '@/stores/store';

const elevatorsStore = useElevatorsStore();
const store = useGeneralStore();
let elevators, levels;

const changeSettings = (elevatorsNum, levelsNum) => {
  if (elevatorsNum < 0) elevatorsNum = 0;
  if (levelsNum < 0) levelsNum = 0;
  if (levelsNum > 800) {
    levelsNum = 800;
    levels = 800;
  }

  if (elevatorsNum) {
    elevatorsStore.setElevatorsNum(elevatorsNum)
  }
  if (levelsNum) {
    elevatorsStore.correctElevatorsPos(levelsNum)
    store.setLevelsNum(levelsNum ? levelsNum : store.levels);
  }
}

const reset = () => {
  elevatorsStore.resetElevators();
  store.resetSettings();
}
</script>

<template>
  <div class="options">
    <ul class="options__list">
      <li class="options__item">
        <label for="elevatorsNum" class="label">Число лифтов</label>
        <input v-model="elevators" type="number" id="elevatorsNum">
      </li>
      <li class="options__item">
        <label for="levelsNum" class="label">Число этажей</label>
        <input v-model="levels" type="number" id="levelsNum">
      </li>
    </ul>
    <ul class="options__btn-list">
      <li class="options__btn-item">
        <button @click="elevatorsStore.resetElevatorsPositions()">Переместить в начало</button>
      </li>
      <li class="options__btn-item">
        <button @click="changeSettings(elevators, levels)">Применить</button>
      </li>
      <li class="options__btn-item">
        <button @click="reset">Сбросить</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.options {
  padding: 20px 40px;
}

.options__list {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 10px;
}

.options__btn-list {
  display: flex;
  justify-content: center;
  align-items: center;
}

.options__item,
.options__btn-item {
  margin-left: 10px;
}

.label {
  padding: 0 5px;
}
</style>