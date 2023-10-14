<template>
  <div class="p-4 px-6 md:px-8">
    <div class="space-y-1 flex flex-col items-center md:items-end">
      <div class="text-secondary text-xs font-medium">{{ label }}</div>
      <div class="font-bold text-2xl md:text-4xl whitespace-nowrap">
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
}>()
</script>
