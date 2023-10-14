<script setup lang="ts">
definePageMeta({
  middleware: "guest-only",
  auth: { authenticatedRedirectTo: "/" },
  layout: false,
})

const { signIn } = useAuth()
</script>

<template>
  <main class="min-h-screen flex flex-col">
    <UContainer class="flex-1 flex items-center">
      <UCard class="min-w-[400px]">
        <h1 class="font-semibold mb-4 text-center">
          Login or register your account
        </h1>

        <UButton
          @click="signIn('github')"
          color="black"
          size="lg"
          icon="i-mdi-github"
          block
        >
          Sign in with GitHub
        </UButton>
      </UCard>
    </UContainer>
  </main>
</template>
