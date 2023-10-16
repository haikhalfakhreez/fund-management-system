<script setup lang="ts">
import { Fund, FundInvestmentType } from "~/lib/types/fund"

const { data: funds } = await useFetch<Fund[]>("/api/funds")

const columns = [
  {
    key: "name",
    label: "Fund Name",
    sortable: true,
  },
  {
    key: "currentYtd",
    label: "Current YTD",
    sortable: true,
  },
  {
    key: "currentNav",
    label: "Current NAV",
    sortable: true,
  },
  {
    key: "investmentType",
    label: "Investment Type",
    sortable: true,
  },
  {
    key: "tags",
    label: "Tags",
  },
  {
    key: "actions",
    label: "Actions",
  },
]

const fundsTable = computed(() => {
  return funds.value?.map((fund) => ({
    ...fund,
    currentYtd: fund.currentYtd + "%",
    navPercentageChange: getFundTotalReturn(fund).sinceInception,
  }))
})

const q = ref("")

const filteredRows = computed(() => {
  const data = fundsTable.value
  if (!q.value || !data) {
    return data
  }
  return data.filter((fund) => {
    return Object.values(fund).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})
</script>

<template>
  <div class="space-y-6">
    <UInput
      v-model="q"
      name="q"
      placeholder="Search fund name or type"
      icon="i-heroicons-magnifying-glass-20-solid"
      :ui="{ icon: { trailing: { pointer: '' } } }"
    >
      <template #trailing>
        <UButton
          v-show="q !== ''"
          color="gray"
          variant="link"
          icon="i-heroicons-x-mark-20-solid"
          :padded="false"
          @click="q = ''"
        />
      </template>
    </UInput>

    <UTableWrapper class="[&_table_th]:whitespace-nowrap">
      <UTable :columns="columns" :rows="filteredRows">
        <template #name-data="{ row, getRowData }">
          <div class="max-w-[300px]">
            <UButton
              variant="link"
              :to="`/fund/${row.id}`"
              color="black"
              class="px-0 whitespace-pre-line"
            >
              {{ getRowData() }}
            </UButton>
          </div>
        </template>

        <template #currentNav-data="{ row, getRowData }">
          <div class="flex items-center gap-x-2">
            <div>MYR {{ getRowData() }}</div>
            <UBadge
              size="xs"
              variant="soft"
              :color="row.navPercentageChange < 0 ? 'red' : 'green'"
              class="text-[10px] leading-none tabular-nums p-1 min-w-[40px] justify-center"
            >
              {{ row.navPercentageChange }}%
            </UBadge>
          </div>
        </template>

        <template #tags-data="{ row }">
          <UBadge
            :color="row.isShariah ? 'green' : 'indigo'"
            variant="solid"
            class="w-full justify-center px-3"
          >
            {{ row.isShariah ? "Shariah" : "Conventional" }}
          </UBadge>
        </template>

        <template #actions-data="{ row }">
          <div class="flex items-stretch gap-2">
            <ComparisonButton :fund="row" />
            <UButton :to="`/fund/${row.id}`" color="white"> View Fund </UButton>
            <PurchaseModal :fund="row" small />
          </div>
        </template>
      </UTable>
    </UTableWrapper>
  </div>
</template>
