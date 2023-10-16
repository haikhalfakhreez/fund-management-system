<template>
  <div class="grid" v-bind="$attrs">
    <div
      class="border rounded-md border-gray-200 dark:border-gray-800 overflow-x-auto"
    >
      <slot></slot>
    </div>
  </div>
</template>
