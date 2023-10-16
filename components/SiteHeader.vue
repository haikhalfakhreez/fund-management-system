<template>
  <header
    class="sticky h-14 top-0 z-40 dark:border-b border-gray-800 shadow-sm backdrop-blur"
  >
    <UContainer class="h-full w-full flex items-center justify-between gap-x-4">
      <div class="flex items-center gap-12">
        <div class="flex items-center gap-x-2">
          <UButton
            class="font-semibold font-display tracking-wide"
            variant="ghost"
            color="black"
            to="/"
            :padded="false"
          >
            <span>
              📈 Fund <span class="hidden md:inline">Management</span
              ><span class="md:hidden">Mgt</span> System
            </span>
          </UButton>
        </div>

        <nav class="space-x-6 hidden md:block">
          <ULink to="/portfolio" class="text-xs text-muted">Portfolio</ULink>
          <ULink to="/balance" class="text-xs text-muted"
            >Account Balance</ULink
          >
          <ULink to="/comparison" class="text-xs text-muted">Comparison</ULink>
        </nav>
      </div>

      <div class="flex items-center gap-x-1">
        <UButton
          external
          to="https://github.com/haikhalfakhreez/fund-management-system"
          target="_blank"
          color="gray"
          variant="ghost"
          icon="i-mdi-github"
        />
        <ThemeToggle />

        <div class="ml-2 flex">
          <UserDropdown />
        </div>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts"></script>
