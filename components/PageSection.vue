<template>
  <section class="space-y-8">
    <h2 class="font-semibold text-xl md:text-2xl text-display">{{ title }}</h2>
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
