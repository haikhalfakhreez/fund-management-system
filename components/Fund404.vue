<template>
  <UContainer
    class="flex items-center justify-center flex-1 w-full flex-col gap-8"
  >
    <div class="text-7xl font-bold tabular-nums">404</div>
    <div class="text-4xl font-semibold font-display">Fund not found</div>
    <div class="text-xl font-mono">id: {{ id }}</div>
    <UButton to="/" size="lg">Go to Home</UButton>
  </UContainer>
</template>

<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>
