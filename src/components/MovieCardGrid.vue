<template>
  <div class="grid justify-center q-ma-lg">
    <div class="column row-sm justify-sm-between items-sm-center">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 252px);
  gap: 24px;
}

.grid :first-child {
  /* Make fist child occupy all columns */
  grid-column: 1 / -1;
}
</style>
