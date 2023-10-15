<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types"

const isOpen = ref(false)
const loading = ref(false)

const state = ref({
  amount: undefined,
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.amount) errors.push({ path: "amount", message: "Required" })
  return errors
}

const toast = useToast()

async function submit(event: FormSubmitEvent<any>) {
  try {
    loading.value = true

    await $fetch("/api/account/balance", {
      method: "POST",
      body: JSON.stringify({
        amount: Number(event.data.amount),
      }),
    })

    await wait(500)
    await refreshNuxtData()

    isOpen.value = false
    loading.value = false
    state.value.amount = undefined
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

function onModalChange(value: boolean) {
  isOpen.value = value
  if (!value) {
    state.value.amount = undefined
  }
}
</script>

<template>
  <UButton
    size="xl"
    label="Add Money"
    block
    color="black"
    @click="isOpen = true"
  />

  <UModal :model-value="isOpen" @update:model-value="onModalChange">
    <UCard>
      <template #header>
        <div class="font-semibold text-sm">Add Money</div>
      </template>

      <div class="space-y-8">
        <UForm
          id="buy-form"
          :validate="validate"
          :state="state"
          @submit="submit"
          class="space-y-4"
          :validateOn="['submit']"
        >
          <UFormGroup label="Amount to Add" name="amount" class="flex-1">
            <UInput v-model="state.amount" type="number">
              <template #trailing>
                <span class="text-gray-500 dark:text-gray-400 text-xs">
                  MYR
                </span>
              </template>
            </UInput>
          </UFormGroup>
        </UForm>

        <div class="flex justify-end">
          <UButton
            type="submit"
            form="buy-form"
            size="lg"
            color="black"
            :loading="loading"
          >
            Add
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>
