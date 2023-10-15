<script setup lang="ts">
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } })

const { data } = await useFetch("/api/portfolio/transactions")

const columns = [
  {
    key: "createdAt",
    label: "DateTime",
    sortable: true,
  },
  {
    key: "fund",
    label: "Fund Name",
    sortable: true,
  },
  {
    key: "units",
    label: "Units",
    sortable: true,
  },
  {
    key: "amount",
    label: "Amount",
    sortable: true,
  },
  {
    key: "transactionType",
    label: "Type",
    sortable: true,
  },
]

const rows = computed(() => {
  if (!data.value) return []

  return data.value.map((item) => {
    return {
      ...item.transactions,
      amount: "MYR " + item.transactions.amount,
      fund: item.fund,
    }
  })
})

const total = computed(() => {
  if (!data.value) return 0

  return data.value.reduce((acc, item) => {
    return acc + item.transactions.amount
  }, 0)
})
</script>

<template>
  <UContainer class="py-8 w-full space-y-10">
    <PageTitle
      name="Portfolio"
      description="See and manage your current portfolio."
    />

    <NumberDisplay label="Total Investment (MYR)" :value="total.toFixed(2)" />

    <PageSection title="Transaction History">
      <div class="grid">
        <div
          class="border rounded-md border-gray-200 dark:border-gray-800 overflow-x-auto [&_table_th]:whitespace-nowrap"
        >
          <UTable :columns="columns" :rows="rows">
            <template #createdAt-data="{ getRowData }">
              {{ formatDate(getRowData(), { time: true }) }}
            </template>

            <template #fund-data="{ row, getRowData }">
              <UButton
                variant="link"
                :to="`/fund/${getRowData().id}`"
                color="black"
                class="px-0"
              >
                {{ getRowData().name }}
              </UButton>
            </template>
          </UTable>
        </div>
      </div>
    </PageSection>
  </UContainer>
</template>
