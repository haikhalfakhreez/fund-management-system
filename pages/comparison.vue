<script setup lang="ts">
import { nanoid } from "nanoid"

definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } })

const { data: funds } = await useFetch("/api/comparisons/funds")

const disabledColumnIndex = ref<number[]>([])

function updateSelectedColumns(columnIndex: number) {
  if (disabledColumnIndex.value.includes(columnIndex)) {
    disabledColumnIndex.value = disabledColumnIndex.value.filter(
      (idx) => idx !== columnIndex,
    )
  } else {
    disabledColumnIndex.value = [...disabledColumnIndex.value, columnIndex]
  }
}

function hasSelected(columnIndex: number) {
  return !disabledColumnIndex.value.includes(columnIndex)
}

const columns = computed(() => {
  if (!funds.value) {
    return []
  }

  const initial: any[] = [
    {
      key: "category",
    },
  ]

  for (let i = 0; i < funds.value.length; i++) {
    initial.push({
      key: `fund${i}`,
      label: funds.value[i].name,
    })
  }

  // Filter based on selectedColumnIndex
  return initial.filter(
    (_, index) => !disabledColumnIndex.value.includes(index - 1),
  )
})

/**
 * 1. Description
 * 2. Ticker
 * 3. Current NAV
 * 4. Current YTD
 * 5. Investment Type
 * 6. Is Shariah
 * 7. Inception Date
 */
const rows = computed(() => {
  if (!funds.value) {
    return []
  }

  const initial: any = [
    { category: "Description" },
    { category: "Ticker" },
    { category: "Current NAV (MYR)" },
    { category: "Current YTD (%)" },
    { category: "Investment Type" },
    { category: "Is Shariah" },
    { category: "Inception Date" },
  ]

  for (let i = 0; i < funds.value.length; i++) {
    const key = `fund${i}`

    initial[0][key] = funds.value[i].description
    initial[1][key] = funds.value[i].ticker
    initial[2][key] = funds.value[i].currentNav
    initial[3][key] = funds.value[i].currentYtd
    initial[4][key] = funds.value[i].investmentType
    initial[5][key] = funds.value[i].isShariah
    initial[6][key] = formatDate(funds.value[i].inceptionDate)
  }

  return initial
})

const toast = useToast()

async function removeFromComparison(index: number) {
  const fundIds = funds.value
    ?.filter((_, i) => i !== index)
    .map((fund) => fund.id)

  await $fetch("/api/comparisons", {
    method: "PUT",
    body: JSON.stringify({ fundIds }),
  })

  await refreshNuxtData()

  toast.add({
    title: "Fund Removed",
    icon: "i-heroicons-check-circle",
  })
}

const options = ["Performance (YTD)", "Historical NAVs"]

const view = ref(options[0])
const key = ref(nanoid())

const series = computed(() => {
  if (!funds.value) {
    return []
  }

  const initial: any[] = []
  const history = view.value === options[0] ? "ytdHistory" : "navHistory"

  for (let i = 0; i < funds.value.length; i++) {
    initial.push({
      name: funds.value[i].name,
      data: funds.value[i][history],
    })
  }

  // Filter based on selectedColumnIndex
  return initial.filter(
    (_, index) => !disabledColumnIndex.value.includes(index),
  )
})

watch(view, () => {
  key.value = nanoid()
})

const label = computed(() => {
  if (view.value === options[0]) {
    return "Performance (%)"
  }

  return "NAV"
})
</script>

<template>
  <UContainer class="py-8 w-full space-y-10">
    <PageTitle
      name="Funds Comparison"
      description="Get an overview of the funds you are interested in."
    />

    <template v-if="funds && funds.length > 0">
      <div class="space-y-8">
        <UFormGroup label="Current View" class="col-span-2 md:col-span-1">
          <USelect v-model="view" :options="options" />
        </UFormGroup>

        <LineChart :key="key" :series="series" :label="label" />
      </div>

      <UTableWrapper>
        <div
          class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700 flex-col gap-2"
        >
          <div class="flex items-center gap-2" v-for="(fund, index) in funds">
            <UButton
              icon="i-heroicons-trash-20-solid"
              size="2xs"
              variant="soft"
              color="gray"
              @click="removeFromComparison(index)"
            />
            <UCheckbox
              :name="fund.id"
              :label="fund.name"
              :model-value="hasSelected(index)"
              @update:model-value="updateSelectedColumns(index)"
            />
          </div>
        </div>

        <UTable
          :columns="columns"
          :rows="rows"
          :ui="{ td: { base: 'whitespace-normal' } }"
        >
          <template #category-data="{ getRowData }">
            <div
              class="text-gray-900 dark:text-white font-semibold whitespace-nowrap"
            >
              {{ getRowData() }}
            </div>
          </template>
        </UTable>
      </UTableWrapper>
    </template>

    <div v-else class="flex flex-col items-center justify-center gap-6 py-10">
      <div class="text-4xl text-secondary font-medium text-center font-display">
        No Funds Added For Comparison
      </div>

      <UButton color="white" size="xl" to="/"> Add Funds to Compare </UButton>
    </div>
  </UContainer>
</template>
