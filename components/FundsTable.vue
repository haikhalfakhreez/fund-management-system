<script setup lang="ts">
import type { Fund } from "@prisma/client"
import { FundInvestmentType } from "~/lib/types/fund"

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
  },
]

const fundsTable = computed(() => {
  return funds.value?.map((fund) => ({
    id: fund.id,
    name: fund.name,
    currentYtd: fund.currentYtd + "%",
    currentNav: fund.currentNav,
    navPercentageChange: getNavPercentageChange(
      fund.currentNav,
      JSON.parse(fund.navHistory),
    ),
    investmentType: fund.investmentType as FundInvestmentType,
    isShariah: fund.isShariah,
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
      placeholder="Search fund name, type, tags, etc..."
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

    <UTable
      :columns="columns"
      :rows="filteredRows"
      class="border rounded-md border-gray-200 dark:border-gray-800"
    >
      <template #name-data="{ row, getRowData }">
        <UButton variant="link" :to="`fund/${row.id}`" color="black">
          {{ getRowData() }}
        </UButton>
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
        <UBadge :color="row.isShariah ? 'emerald' : 'orange'" variant="outline">
          {{ row.isShariah ? "Shariah" : "Conventional" }}
        </UBadge>
      </template>

      <template #actions-data="{ row }">
        <UButton :to="`/fund/${row.id}`" variant="solid"> View Fund </UButton>
      </template>
    </UTable>
  </div>
</template>
