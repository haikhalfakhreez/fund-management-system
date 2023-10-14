<template>
  <div class="space-y-1">
    <div class="text-sm text-secondary">
      {{ label }}
    </div>

    <div class="md:text-lg font-semibold">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
}>()
</script>
