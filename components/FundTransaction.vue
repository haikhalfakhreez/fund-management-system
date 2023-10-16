<template>
  <UCard>
    <div class="space-y-4">
      <ComparisonButton
        :fund="fund"
        block
        variant="solid"
        size="xl"
        color="gray"
        icon="i-heroicons-plus-20-solid"
      />
      <PurchaseModal :fund="fund" />
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { Fund } from "~/lib/types/fund"

defineProps<{
  fund: Fund
}>()
</script>
