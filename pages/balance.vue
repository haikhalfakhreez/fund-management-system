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
  <UContainer class="py-8 w-full flex-1 space-y-10">
    <PageTitle
      name="Account Balance"
      description="Manage your account balance."
    />

    <div class="space-y-4">
      <NumberDisplay
        label="Wallet Balance (MYR)"
        :value="abbreviateNumber(balance ?? 0)"
      />

      <AddMoneyModal />
    </div>

    <PageSection title="Transaction History">
      <UTableWrapper class="[&_table_th]:whitespace-nowrap">
        <UTable :columns="columns" :rows="rows">
          <template #createdAt-data="{ getRowData }">
            {{ formatDate(getRowData(), { time: true }) }}
          </template>
        </UTable>
      </UTableWrapper>
    </PageSection>
  </UContainer>
</template>
