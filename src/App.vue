<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/default.vue'

const route = useRoute()

const noLayoutRoutes = ['/login', '/forgot-password', '/register']

const useLayout = computed(() =>
  noLayoutRoutes.includes(route.path) ? null : DefaultLayout
)
</script>

<template>
  <component :is="useLayout" v-if="useLayout">
    <RouterView />
  </component>
  <RouterView v-else />
</template>