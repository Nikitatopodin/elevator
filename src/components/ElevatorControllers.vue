<script setup>
import { useGeneralStore } from '@/stores/store';

const store = useGeneralStore();

</script>

<template>

  <div class="controllers">
    <ul class="controllers__list">
      <li class="controllers__item" v-for="(level, index) in store.levels">
        <span class="level" v-html="index + 1"></span>
        <button class="btn" @click="store.addCallToQueue(index + 1)"></button>
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
@/stores/store