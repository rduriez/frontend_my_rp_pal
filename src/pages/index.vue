<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppSidebar from '@/components/layout/AppSideBar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'

const { t } = useI18n()
const route = useRoute()

const pageTitles: Record<string, string> = {
  '/': 'nav.home',
  '/systemes': 'nav.systemes',
  '/sorts': 'nav.sorts',
  '/regles': 'nav.regles',
  '/profil': 'nav.profile',
}

const pageTitle = computed(() => {
  const key = pageTitles[route.path]
  return key ? t(key) : ''
})
</script>

<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-900">
    <AppSidebar />
    <div class="pl-64 flex flex-col min-h-screen">
      <AppHeader>{{ pageTitle }}</AppHeader>
      <main class="flex-1 pt-16 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>