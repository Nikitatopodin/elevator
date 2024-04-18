<script setup>
import Elevator from '../components/Elevator.vue';
import { useGeneralStore } from '@/stores/store';

const store = useGeneralStore();

const props = defineProps(['elevId']);
const id = props.elevId;
</script>

<template>
  <div class="shaft">
    <div class="levels">
      <ul class="levels__list">
        <li class="levels__item" v-for="(level, index) in store.levels" :key="index">{{ index + 1 }}</li>
      </ul>
    </div>

    <Elevator :elev-id="id" />
  </div>
</template>
<style scoped>
.shaft {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  width: 100px;
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
  min-height: 50px;
  border-top: 1px solid black;
}

.levels__item:last-child {
  border-top: 0;
}
</style>
