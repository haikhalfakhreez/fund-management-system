<template>
  <section
    class="bg-gradient-radial from-[#a1bfff] to-[#f8fafc] dark:from-[#203053] dark:to-black border-b dark:border-gray-800"
  >
    <UContainer class="space-y-10 py-8">
      <div class="space-y-4">
        <FundHeaderBreadcrumb :page="fund.name" />

        <div class="flex flex-col md:flex-row justify-between gap-x-20 gap-y-4">
          <PageTitle :name="fund.name" :description="fund.description" />

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

        <FundHeaderDetail
          label="Launch Date"
          :value="formatDate(fund.inceptionDate)"
        />

        <FundHeaderDetail
          label="Launch Price"
          :value="`MYR ${fund.launchPrice}`"
        />
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { Fund } from "~/lib/types/fund"

defineProps<{
  fund: Fund
}>()
</script>
