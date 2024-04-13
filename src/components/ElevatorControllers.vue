<script setup>

</script>

<template>
  <div class="controllers">
    <ul class="controllers__list">
      <li class="controllers__item">
        <span class="level">1</span>
        <button class="btn"></button>
      </li>
      <li class="controllers__item">
        <span class="level">2</span>
        <button class="btn"></button>
      </li>
      <li class="controllers__item">
        <span class="level">3</span>
        <button class="btn"></button>
      </li>
      <li class="controllers__item">
        <span class="level">4</span>
        <button class="btn"></button>
      </li>
      <li class="controllers__item">
        <span class="level">5</span>
        <button class="btn"></button>
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
