<template>
  <section
    class="bg-gradient-radial from-[#a1bfff] to-[#f8fafc] dark:from-[#203053] dark:to-black border-b dark:border-gray-800"
  >
    <UContainer class="space-y-10 py-8">
      <div class="space-y-4">
        <FundHeaderBreadcrumb :page="fund.id" />

        <div class="flex flex-col md:flex-row justify-between gap-x-20 gap-y-4">
          <div class="space-y-4">
            <h1 class="font-bold font-display text-3xl md:text-5xl">
              {{ fund.name }}
            </h1>
            <p class="text-secondary">
              {{ fund.description }}
            </p>
          </div>

          <div class="shrink-0">
            <div
              class="grid grid-cols-2 divide-x divide-gray-600 border rounded-md border-gray-600 bg-background backdrop-blur"
            >
              <FundHeaderStat
                label="YTD Return"
                :value="fund.currentYtd + '%'"
              />
              <FundHeaderStat
                label="Current NAV"
                :value="'MYR ' + fund.currentNav"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-4">
        <FundHeaderDetail label="Fund Type" :value="fund.investmentType" />

        <FundHeaderDetail label="Base Currency" value="MYR" />

        <FundHeaderDetail
          label="Shariah Compliant"
          :value="fund.isShariah ? 'Yes' : 'No'"
        />
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { Fund } from "@prisma/client"

defineProps<{
  fund: Fund
}>()
</script>
