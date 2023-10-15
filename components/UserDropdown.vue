<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
    <UAvatar
      :src="session?.user?.image ?? undefined"
      :alt="session?.user?.name ?? undefined"
    />
  </UDropdown>
</template>

<script setup lang="ts">
const { signOut, session } = useAuth()

const items = [
  [
    {
      label: "Profile",
      avatar: {
        src: session.value?.user.image ?? undefined,
        alt: session.value?.user.name ?? undefined,
      },
      to: "/settings",
    },
  ],
  [
    {
      label: "Portfolio",
      icon: "i-heroicons-currency-dollar-20-solid",
      to: "/settings",
    },
    {
      label: "Account Balance",
      icon: "i-heroicons-wallet-20-solid",
      to: "/balance",
    },
  ],
  [
    {
      label: "Sign Out",
      icon: "i-heroicons-arrow-left-on-rectangle-20-solid",
      click: () => signOut(),
    },
  ],
]
</script>
