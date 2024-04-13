<script setup>
import Elevator from '../components/Elevator.vue'
</script>

<template>
  <div class="shaft">
    <div class="levels">
      <ul class="levels__list">
        <li class="levels__item">1</li>
        <li class="levels__item">2</li>
        <li class="levels__item">3</li>
        <li class="levels__item">4</li>
        <li class="levels__item">5</li>
      </ul>
    </div>

    <Elevator />
  </div>
</template>
<style scoped>
.shaft {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  width: 100px;
  min-height: calc(120px*5);
  height: 100vh;
  border: 1px solid black;
}

.levels {
  width: 100%;
  height: 100%;
}

.levels__list {
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;

  height: 100%;
}

.levels__item {
  display: block;
  width: 100%;
  height: 100%;
  border-top: 1px solid black;
}

.levels__item:last-child {
  border-top: 0;
}
</style>
