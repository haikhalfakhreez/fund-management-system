<template>
  <PageSection title="Performance">
    <div class="grid">
      <div
        class="border rounded-md border-gray-600 overflow-x-auto [&_table_th]:whitespace-nowrap"
      >
        <UTable
          :columns="columns"
          :rows="rows"
          :ui="{
            td: {
              font: 'font-semibold',
              size: 'text-lg',
              color: 'text-gray-900 dark:text-gray-900',
            },
            th: {
              color: 'text-secondary',
            },
            tr: {
              base: 'divide-x divide-gray-600',
            },
            base: 'divide-gray-600',
          }"
        />
      </div>
    </div>
  </PageSection>
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
        ? "bg-red-300 dark:bg-red-400"
        : "bg-green-300 dark:bg-green-400",
  },
]
</script>
