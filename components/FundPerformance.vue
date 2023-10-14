<template>
  <section class="space-y-8">
    <h2 class="font-semibold text-xl md:text-2xl text-display">Performance</h2>

    <UTable
      :columns="columns"
      :rows="rows"
      class="border rounded-md border-gray-200 dark:border-gray-800"
      :ui="{
        td: {
          font: 'font-semibold',
          size: 'text-lg',
          color: 'text-gray-900 dark:text-gray-900',
        },
        th: {
          color: 'text-secondary',
        },
      }"
    />
  </section>
</template>

<script setup lang="ts">
import { Fund } from "~/lib/types/fund"

const { fund } = defineProps<{
  fund: Fund
}>()

const columns = [
  {
    key: "totalReturn",
    label: "Total Return",
  },
  {
    key: "oneMonth",
    label: "1 Month",
  },
  {
    key: "oneYear",
    label: "1 Year",
  },
  {
    key: "threeYears",
    label: "3 Years",
  },
  {
    key: "sinceInception",
    label: "Since Inception",
  },
]

const { oneMonth, oneYear, threeYears, sinceInception } =
  getFundTotalReturn(fund)

const rows = [
  {
    totalReturn: "MYR",
    oneMonth: oneMonth + "%",
    oneYear: oneYear + "%",
    threeYears: threeYears + "%",
    sinceInception: sinceInception + "%",
    class:
      sinceInception < 0
        ? "bg-red-500 dark:bg-red-600"
        : "bg-green-300 dark:bg-green-400",
  },
]
</script>
