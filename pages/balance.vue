<script setup lang="ts">
import { abbreviateNumber } from "js-abbreviation-number"

definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } })

const { data: balance } = await useFetch("/api/account/balance")
const { data: history } = await useFetch("/api/account/balance/history")

const columns = [
  {
    key: "createdAt",
    label: "DateTime",
    sortable: true,
  },
  {
    key: "change",
    label: "Amount",
    sortable: true,
  },
  {
    key: "changeType",
    label: "Type",
    sortable: true,
  },
]

const rows = computed(() => history.value ?? [])
</script>

<template>
  <UContainer class="py-8 w-full flex-1">
    <PageTitle
      name="Account Balance"
      description="Manage your account balance."
    />

    <div
      class="flex md:items-start justify-between py-8 gap-4 md:gap-12 flex-col md:flex-row"
    >
      <UCard class="flex-1 bg-indigo-50">
        <div class="font-medium text-secondary md:text-lg">MYR</div>
        <div class="text-2xl md:text-8xl font-bold tabular-nums">
          {{ abbreviateNumber(balance ?? 0) }}
        </div>
      </UCard>

      <div>
        <AddMoneyModal />
      </div>
    </div>

    <div class="grid">
      <div
        class="border rounded-md border-gray-200 dark:border-gray-800 overflow-x-auto [&_table_th]:whitespace-nowrap"
      >
        <UTable :columns="columns" :rows="rows">
          <template #createdAt-data="{ getRowData }">
            {{ formatDate(getRowData(), { time: true }) }}
          </template>
        </UTable>
      </div>
    </div>
  </UContainer>
</template>
