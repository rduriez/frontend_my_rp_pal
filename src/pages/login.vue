<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

async function handleLogin() {
  error.value = null
  loading.value = true
  try {
    await auth.login({mail: email.value, password: password.value})
    router.push('/')
  } catch {
    error.value = t('auth.error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900 px-4">
    <div class="w-full max-w-md">

      <!-- Titre -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          {{ t('app.name') }}
        </h1>
        <p class="mt-2 text-sm text-surface-500">
          {{ t('auth.subtitle') }}
        </p>
      </div>

      <!-- Card -->
      <div class="bg-surface-0 dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-8 space-y-5">

        <!-- Erreur -->
        <Message v-if="error" severity="error" :closable="false">
          {{ error }}
        </Message>

        <form class="space-y-5" @submit.prevent="handleLogin">

          <!-- Email -->
          <div class="flex flex-col gap-1.5">
            <label for="email" class="text-sm font-medium text-surface-700 dark:text-surface-300">
              {{ t('auth.email') }}
            </label>
            <InputText
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              required
              :placeholder="t('auth.emailPlaceholder')"
              class="w-full"
            />
          </div>

          <!-- Mot de passe -->
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <label for="password" class="text-sm font-medium text-surface-700 dark:text-surface-300">
                {{ t('auth.password') }}
              </label>
              <RouterLink
                to="/forgot-password"
                class="text-xs text-primary hover:underline"
              >
                {{ t('auth.forgotPassword') }}
              </RouterLink>
            </div>
            <Password
              id="password"
              v-model="password"
              :feedback="false"
              toggleMask
              autocomplete="current-password"
              required
              :placeholder="t('auth.passwordPlaceholder')"
              class="w-full"
              input-class="w-full"
            />
          </div>

          <!-- Submit -->
          <Button
            type="submit"
            :label="loading ? t('auth.loading') : t('auth.submit')"
            :loading="loading"
            class="w-full"
          />

        </form>
      </div>
        <p class="mt-6 text-center text-sm text-surface-500">
        {{ t('auth.noAccount') }}
        <RouterLink to="/register" class="text-primary hover:underline font-medium">
          {{ t('auth.registerLink') }}
        </RouterLink>
      </p>
    </div>
  </div>
</template>