<template>
  <UPopover class="flex">
    <UAvatar
      :src="session?.user?.image ?? undefined"
      :alt="session?.user?.name ?? undefined"
    />
    <template #panel>
      <UCard :ui="{ body: { padding: 'p-1 md:p-1' } }">
        <div class="flex flex-col">
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-heroicons-currency-dollar"
          >
            Portfolio
          </UButton>
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-heroicons-cog"
            to="/settings"
          >
            Settings
          </UButton>
          <div class="h-px w-full bg-gray-200 my-1"></div>
          <UButton
            color="red"
            variant="soft"
            size="sm"
            icon="i-heroicons-arrow-left-on-rectangle"
            @click="signOut()"
          >
            Sign Out
          </UButton>
        </div>
      </UCard>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const { signOut, session } = useAuth()
</script>
