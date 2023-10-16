<template>
  <PageSection title="Historical Performance Data">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
      <UFormGroup label="Current View" class="col-span-2 md:col-span-1">
        <USelect v-model="view" :options="options" />
      </UFormGroup>

      <UFormGroup label="From">
        <UInput type="date" v-model="from" />
      </UFormGroup>

      <UFormGroup label="To">
        <UInput type="date" v-model="to" />
      </UFormGroup>
    </div>

    <LineChart :key="key" :series="series" :label="label" />
  </PageSection>
</template>

<script setup lang="ts">
import { nanoid } from "nanoid"
import { Fund } from "~/lib/types/fund"

const { fund } = defineProps<{
  fund: Fund
}>()

const options = ["Performance (YTD)", "Historical NAVs"]

const view = ref(options[0])
const from = ref("")
const to = ref("")

const series = computed(() => {
  let history = view.value === options[0] ? fund.ytdHistory : fund.navHistory

  if (from.value) {
    history = history.filter((h) => {
      const date = new Date(h[0]).getTime()
      const fromDate = new Date(from.value).getTime()

      return date >= fromDate
    })
  }

  if (to.value) {
    history = history.filter((h) => {
      const date = new Date(h[0]).getTime()
      const toDate = new Date(to.value).getTime()

      return date <= toDate
    })
  }

  return [
    {
      name: "MYR",
      data: history,
    },
  ]
})

const label = computed(() => {
  if (view.value === options[0]) {
    return "Performance (%)"
  }

  return "NAV"
})

const key = ref(nanoid())

watch([view, from, to], () => {
  key.value = nanoid()
})
</script>
