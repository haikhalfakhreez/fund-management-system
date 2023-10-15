<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types"

definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } })

const { session } = useAuth()

const state = ref({
  name: "",
  email: "",
})

watchEffect(() => {
  const sesh = session.value
  if (sesh?.user) {
    state.value.name = sesh.user.name ?? ""
    state.value.email = sesh.user?.email ?? ""
  }
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: "name", message: "Required" })
  if (!state.email) errors.push({ path: "email", message: "Required" })
  return errors
}

const loading = ref(false)

async function submit(event: FormSubmitEvent<any>) {
  loading.value = true

  await $fetch("/api/user", {
    method: "PUT",
    body: JSON.stringify(event.data),
  })

  // Simulate delay to give loading state a chance to show
  await wait(1000)

  loading.value = false
}
</script>

<template>
  <UContainer class="py-8 w-full space-y-10">
    <PageTitle
      name="Account Settings"
      description="Manage your account settings."
    />

    <UForm
      :validate="validate"
      :state="state"
      @submit="submit"
      class="space-y-8"
    >
      <div class="grid md:grid-cols-2 md:gap-8 gap-4">
        <UFormGroup label="Name" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" disabled />
        </UFormGroup>
      </div>

      <div class="flex justify-end">
        <UButton type="submit" size="lg" :loading="loading"> Update </UButton>
      </div>
    </UForm>
  </UContainer>
</template>
