<template>
  <UButton
    @click="addToCompare(fund.id)"
    variant="link"
    color="gray"
    :disabled="loading"
    v-bind="$attrs"
  >
    Compare
  </UButton>
</template>

<script setup lang="ts">
import { Fund } from "~/lib/types/fund"

const { fund } = defineProps<{
  fund: Fund
}>()

const { data: comparisons } = await useFetch("/api/comparisons")

const loading = ref(false)

const toast = useToast()

async function addToCompare(fundId: string) {
  let fundIds = comparisons.value?.fundIds ?? []

  if (fundIds.length >= 3) {
    toast.add({
      title: "Error!",
      description: `You can only compare up to 3 funds.`,
      icon: "i-heroicons-x-circle",
      actions: [
        {
          variant: "solid",
          color: "gray",
          label: "Manage Comparison",
          to: "/comparison",
        },
      ],
    })
    return
  }

  loading.value = true
  fundIds = [...fundIds, fundId]

  await $fetch("/api/comparisons", {
    method: "PUT",
    body: JSON.stringify({ fundIds }),
  })

  await refreshNuxtData()

  loading.value = false

  toast.add({
    title: "Success!",
    description: `${fund.name} is added to comparison`,
    icon: "i-heroicons-check-circle",
    actions: [
      {
        variant: "solid",
        color: "gray",
        label: "Go to Comparison",
        to: "/comparison",
      },
    ],
  })
}
</script>
