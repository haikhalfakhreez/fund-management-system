<template>
  <ClientOnly>
    <div
      class="border rounded-md border-gray-200 dark:border-gray-800 px-3 py-4"
    >
      <VueApexCharts
        type="area"
        height="350"
        :options="options"
        :series="series"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts"
import { FundHistory } from "~/lib/types/fund"

const { data, label } = defineProps<{
  data: FundHistory[]
  label: string
}>()

const isNav = computed(() => label === "NAV")

const series = [
  {
    name: "MYR",
    data,
  },
]

const options = {
  yaxis: {
    title: {
      text: label,
    },
    labels: {
      formatter: (value: number) => value.toFixed(isNav.value ? 2 : 0),
    },
  },
  xaxis: {
    type: "datetime",
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  tooltip: {
    x: {
      format: "dd MMM yyyy",
    },
    y: {
      formatter: (value: string) => value + "%",
    },
    custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
      const date = formatDate(
        new Date(w.globals.seriesX[seriesIndex][dataPointIndex]),
      )

      return (
        '<div class="px-3 border-0 py-2 rounded shadow bg-white flex flex-col space-y-1">' +
        `<span class="text-xs">${date}</span>` +
        `<span class="font-semibold text-sm">MYR: <span class="tabular-nums">${
          series[seriesIndex][dataPointIndex]
        }${isNav.value ? "" : "%"}</span></span>` +
        "</div>"
      )
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.75,
    },
  },
}
</script>
