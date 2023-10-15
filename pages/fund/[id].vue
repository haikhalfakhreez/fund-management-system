<script setup lang="ts">
import { Fund } from "~/lib/types/fund"

definePageMeta({
  middleware: ["auth"],
})

const route = useRoute()
const id = route.params.id as string

const { data: fund } = await useFetch<Fund>(`/api/funds/${id}`)
</script>

<template>
  <template v-if="fund">
    <FundHeader :fund="fund" />
    <UContainer class="py-12 w-full space-y-20">
      <FundPerformance :fund="fund" />
      <FundChart :fund="fund" />
    </UContainer>
  </template>

  <template v-else>
    <Fund404 :id="id" />
  </template>
</template>
