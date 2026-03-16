<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import Button from 'primevue/button'

const { isDark, toggle } = useTheme()
</script>

<template>
  <Button
    :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
    severity="secondary"
    text
    rounded
    :aria-label="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
    @click="toggle"
  />
</template>