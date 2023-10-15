<template>
  <UCard class="flex-1 bg-indigo-50">
    <div class="font-medium text-secondary md:text-lg">{{ label }}</div>
    <div class="text-2xl md:text-8xl font-bold tabular-nums">
      {{ value }}
    </div>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
}>()
</script>
