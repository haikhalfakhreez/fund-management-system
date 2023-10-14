<template>
  <div class="text-muted flex items-center gap-2 text-xs">
    <NuxtLink
      to="/"
      class="focus:outline-none hover:underline underline-offset-2"
    >
      Funds
    </NuxtLink>

    <UIcon name="i-heroicons-chevron-right" />
    <div>{{ page }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  page: string
}>()
</script>
