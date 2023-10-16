<script setup lang="ts">
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } })

const { signOut, session, status, cookies } = useAuth()
</script>

<template>
  <UContainer class="py-8 w-full">
    <div class="space-y-2 mb-8">
      <h1 class="font-bold font-display text-4xl md:text-6xl">List of Funds</h1>

      <p class="text-secondary">
        Manage your funds and track their performance.
      </p>
    </div>

    <FundsTable />
  </UContainer>
</template>
