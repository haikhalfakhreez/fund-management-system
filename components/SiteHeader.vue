<template>
  <header
    class="sticky h-14 top-0 z-40 flex items-center justify-between gap-x-4 dark:border-b border-gray-800 px-4 py-4 shadow-sm sm:px-6 backdrop-blur"
  >
    <div class="flex items-center gap-x-2">
      <p class="font-semibold font-display tracking-wide">Fund Mgt</p>
    </div>

    <div class="flex items-center gap-x-1">
      <UButton
        external
        to="https://github.com/fayazara/feedbackjar"
        target="_blank"
        color="gray"
        variant="ghost"
        icon="i-mdi-github"
      />
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup lang="ts"></script>
