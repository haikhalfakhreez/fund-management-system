<script setup lang="ts">
definePageMeta({
  middleware: "fund",
})

const route = useRoute()
const id = route.params.id

const { data: fund } = await useFetch<Fund>(`/api/funds/${id}`)
</script>

<template>
  <template v-if="fund">
    <FundHeader :fund="fund" />
    <UContainer class="pt-12">
      <FundPerformance :fund="fund" />
      <div class="mt-20">{{ JSON.stringify(fund, null, 2) }}</div>
    </UContainer>
  </template>
</template>
