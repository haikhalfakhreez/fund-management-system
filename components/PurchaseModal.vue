<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types"
import { Fund } from "~/lib/types/fund"

const { fund } = withDefaults(
  defineProps<{
    fund: Fund
    small?: boolean
  }>(),
  {
    small: false,
  },
)

const isOpen = ref(false)
const loading = ref(false)

const state = ref({
  units: undefined,
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.units) errors.push({ path: "units", message: "Required" })
  return errors
}

const toast = useToast()

async function submit(event: FormSubmitEvent<any>) {
  try {
    loading.value = true

    await $fetch("/api/funds/purchase", {
      method: "POST",
      body: JSON.stringify({
        units: Number(event.data.units),
        fundId: fund.id,
      }),
    })

    await wait(500)
    isOpen.value = false
    loading.value = false

    toast.add({
      title: "Success!",
      description: `You have successfully purchased ${event.data.units} units of ${fund.name}.`,
      icon: "i-heroicons-check-circle",
    })

    state.value.units = undefined
  } catch (error: any) {
    await wait(500)
    toast.add({
      title: "Error!",
      description: error.data.message,
      icon: "i-heroicons-x-circle",
    })
    loading.value = false
  }
}

const { data: balance } = await useFetch("/api/account/balance")

const details = computed(() => [
  {
    label: "Amount per Unit (NAV)",
    value: "MYR " + fund.currentNav,
  },
  {
    label: "Account Balance",
    value: "MYR " + balance.value,
  },
])

const balanceAfter = computed(() => {
  if (!state.value.units || !balance.value) return "0.00"
  return (balance.value - state.value.units * fund.currentNav).toFixed(2)
})

const total = computed(() => {
  if (!state.value.units) return "0.00"
  return (state.value.units * fund.currentNav).toFixed(2)
})

const isShariah = computed(() => fund.isShariah)

function onModalChange(value: boolean) {
  isOpen.value = value
  if (!value) {
    state.value.units = undefined
  }
}
</script>

<template>
  <UButton
    :size="small ? 'md' : 'xl'"
    label="Buy"
    :icon="small ? undefined : 'i-heroicons-shopping-cart-20-solid'"
    :block="!small"
    color="black"
    @click="isOpen = true"
  />

  <UModal :model-value="isOpen" @update:model-value="onModalChange">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center gap-4">
          <div class="font-semibold text-sm">Buy Fund</div>

          <div class="flex items-center gap-4">
            <UBadge
              color="gray"
              variant="solid"
              :label="`MYR ${fund.currentNav}`"
            />
            <div class="text-muted text-sm font-medium text-right">
              {{ fund.ticker }}
            </div>
          </div>
        </div>
      </template>

      <div class="space-y-8">
        <div>
          <div class="font-display text-xl">{{ fund.name }}</div>
          <div class="text-secondary text-xs mt-1">{{ fund.description }}</div>

          <div class="flex gap-2 flex-wrap items-center mt-2">
            <UBadge size="sm" color="orange" :label="fund.investmentType" />
            <UBadge
              size="sm"
              :color="isShariah ? 'green' : 'indigo'"
              :label="isShariah ? 'Shariah' : 'Conventional'"
            />
          </div>
        </div>

        <UForm
          id="buy-form"
          :validate="validate"
          :state="state"
          @submit="submit"
          class="space-y-4"
          :validateOn="['submit']"
        >
          <UFormGroup label="Units to purchase" name="units" class="flex-1">
            <UInput v-model="state.units" type="number" />
          </UFormGroup>
        </UForm>

        <div class="space-y-4">
          <div class="space-y-2">
            <div
              class="flex justify-between gap-4 items-center text-xs text-muted"
              v-for="detail in details"
            >
              <div>{{ detail.label }}</div>
              <div class="tabular-nums">{{ detail.value }}</div>
            </div>
          </div>

          <div class="h-px w-full bg-gray-300" />

          <div class="space-y-2">
            <div
              class="flex justify-between gap-4 items-center text-xs text-muted"
            >
              <div>Balance After</div>
              <div class="tabular-nums">RM {{ balanceAfter }}</div>
            </div>

            <div class="flex justify-between gap-4 items-start">
              <div class="text-secondary text-sm">Total</div>
              <div class="tabular-nums text-2xl font-bold">MYR {{ total }}</div>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-2">
          <UButton size="lg" color="white" to="/balance"> Add Money </UButton>
          <UButton
            type="submit"
            form="buy-form"
            size="lg"
            color="black"
            :loading="loading"
          >
            Purchase
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>
