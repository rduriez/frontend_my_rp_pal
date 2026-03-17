<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'

const { t } = useI18n()
const auth = useAuthStore()

const navItems = [
  {
    key: 'systemes',
    to: '/systemes',
    icon: 'pi pi-book',
  },
]


const router = useRouter()

async function handleLogout() {
  auth.logout()
  await router.push('/login')
}
</script>

<template>
  <aside class="flex flex-col w-64 h-screen bg-surface-0 dark:bg-surface-900 border-r border-surface-200 dark:border-surface-700 fixed left-0 top-0 z-20">

    <div class="h-16 flex items-center px-6 border-b border-surface-200 dark:border-surface-700 shrink-0">
      <RouterLink
        to="/"
        class="text-lg font-bold text-surface-900 dark:text-surface-0 hover:text-primary transition"
      >
        My RP Pal
      </RouterLink>
    </div>

    <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      <RouterLink
        v-for="item in navItems"
        :key="item.key"
        :to="item.to"
        v-slot="{ isActive }"
        custom
      >
        <Button
          :label="t(`nav.${item.key}`)"
          :icon="item.icon"
          :severity="isActive ? 'primary' : 'secondary'"
          :text="!isActive"
          class="w-full justify-start!"
          @click="$router.push(item.to)"
        />
      </RouterLink>
    </nav>

    <div class="px-3 py-4 border-t border-surface-200 dark:border-surface-700 shrink-0 space-y-1">
      <RouterLink to="/profil" v-slot="{ isActive }" custom>
        <Button
          :severity="isActive ? 'primary' : 'secondary'"
          :text="!isActive"
          class="w-full justify-start! gap-3"
          @click="$router.push('/profil')"
        >
          <Avatar
            :label="auth.user?.pseudo?.charAt(0).toUpperCase() ?? '?'"
            shape="circle"
            size="small"
          />
          <span class="truncate">{{ auth.user?.pseudo ?? t('nav.profile') }}</span>
        </Button>
      </RouterLink>

      <Button
        :label="t('nav.logout')"
        icon="pi pi-sign-out"
        severity="danger"
        text
        class="w-full justify-start!"
        @click="handleLogout"
      />
    </div>

  </aside>
</template>