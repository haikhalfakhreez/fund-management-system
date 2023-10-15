<template>
  <UCard>
    <PurchaseModal :fund="fund" />
  </UCard>
</template>

<script setup lang="ts">
import { Fund } from "~/lib/types/fund"

defineProps<{
  fund: Fund
}>()
</script>
