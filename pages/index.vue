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

    <!-- <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
          <h1>Welcome to Nuxt UI Starter</h1>

          <ColorScheme>
            <USelect
              v-model="$colorMode.preference"
              :options="['system', 'light', 'dark']"
            />
          </ColorScheme>
        </div>
      </template>

      <UButton
        icon="i-heroicons-book-open"
        to="https://ui.nuxt.com"
        target="_blank"
      >
        Sial
      </UButton>

      <button @click="signOut()">Sign Out</button>

      <div>
        <pre>{{ status }}</pre>
        <pre>{{ session?.user }}</pre>
        <pre>{{ cookies }}</pre>
      </div>
    </UCard> -->
  </UContainer>
</template>
