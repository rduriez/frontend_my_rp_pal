<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import Button from 'primevue/button'

const { locale } = useI18n()

function toggleLocale() {
  locale.value = locale.value === 'fr' ? 'en' : 'fr'
  localStorage.setItem('locale', locale.value)
}
</script>

<template>
  <header class="h-16 flex items-center justify-between px-6 bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 fixed top-0 left-64 right-0 z-10">

    <span class="text-sm font-medium text-surface-900 dark:text-surface-0">
      <slot />
    </span>

    <div class="flex items-center gap-1">
      <Button
        :label="locale === 'fr' ? 'EN' : 'FR'"
        severity="secondary"
        text
        size="small"
        @click="toggleLocale"
      />
      <ThemeToggle />
    </div>

  </header>
</template>