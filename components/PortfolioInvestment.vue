<script setup lang="ts">
const { data } = await useFetch("/api/portfolio/investment")

const columns = [
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
]

const rows = computed(() => {
  if (!data.value) return []

  return data.value.map((item) => {
    return {
      ...item.investment,
      amount: "MYR " + item.investment.amount,
      fund: item.fund,
    }
  })
})
</script>

<template>
  <PageSection title="Investment">
    <UTableWrapper class="[&_table_th]:whitespace-nowrap">
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
    </UTableWrapper>
  </PageSection>
</template>
