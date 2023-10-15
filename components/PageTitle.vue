<template>
  <div class="space-y-4">
    <h1 class="font-bold font-display text-3xl md:text-5xl">
      {{ name }}
    </h1>
    <p class="text-secondary">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  description: string
}>()
</script>
