<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const { t } = useI18n()

type Step = 'email' | 'password' | 'success'

const step = ref<Step>('email')
const email = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

async function handleEmailSubmit() {
  error.value = null
  loading.value = true
  try {
    // TODO : appel API /auth/forgot-password
    await new Promise(resolve => setTimeout(resolve, 500))
    step.value = 'password'
  } catch {
    error.value = t('forgotPassword.errorEmail')
  } finally {
    loading.value = false
  }
}

async function handlePasswordSubmit() {
  error.value = null

  if (newPassword.value !== confirmPassword.value) {
    error.value = t('forgotPassword.errorMatch')
    return
  }

  if (newPassword.value.length < 8) {
    error.value = t('forgotPassword.errorLength')
    return
  }

  loading.value = true
  try {
    // TODO : appel API /auth/reset-password
    await new Promise(resolve => setTimeout(resolve, 500))
    step.value = 'success'
  } catch {
    error.value = t('forgotPassword.errorReset')
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
          {{ t('forgotPassword.subtitle') }}
        </p>
      </div>

      <!-- Card -->
      <div class="bg-surface-0 dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-8">

        <!-- Étape 1 — Email -->
        <template v-if="step === 'email'">
          <div class="mb-6">
            <h2 class="text-base font-medium text-surface-900 dark:text-surface-0">
              {{ t('forgotPassword.emailTitle') }}
            </h2>
            <p class="mt-1 text-sm text-surface-500">
              {{ t('forgotPassword.emailHint') }}
            </p>
          </div>

          <Message v-if="error" severity="error" :closable="false" class="mb-6">
            {{ error }}
          </Message>

          <form class="space-y-5" @submit.prevent="handleEmailSubmit">
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

            <Button
              type="submit"
              :label="loading ? t('forgotPassword.loading') : t('forgotPassword.emailSubmit')"
              :loading="loading"
              class="w-full"
            />
          </form>
        </template>

        <!-- Étape 2 — Nouveau mot de passe -->
        <template v-else-if="step === 'password'">
          <div class="mb-6">
            <h2 class="text-base font-medium text-surface-900 dark:text-surface-0">
              {{ t('forgotPassword.passwordTitle') }}
            </h2>
            <p class="mt-1 text-sm text-surface-500">
              {{ t('forgotPassword.passwordHint', { email }) }}
            </p>
          </div>

          <Message v-if="error" severity="error" :closable="false" class="mb-6">
            {{ error }}
          </Message>

          <form class="space-y-5" @submit.prevent="handlePasswordSubmit">
            <div class="flex flex-col gap-1.5">
              <label for="new-password" class="text-sm font-medium text-surface-700 dark:text-surface-300">
                {{ t('forgotPassword.newPassword') }}
              </label>
              <Password
                id="new-password"
                v-model="newPassword"
                toggleMask
                :feedback="false"
                required
                :placeholder="t('auth.passwordPlaceholder')"
                class="w-full"
                input-class="w-full"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="confirm-password" class="text-sm font-medium text-surface-700 dark:text-surface-300">
                {{ t('forgotPassword.confirmPassword') }}
              </label>
              <Password
                id="confirm-password"
                v-model="confirmPassword"
                toggleMask
                :feedback="false"
                required
                :placeholder="t('auth.passwordPlaceholder')"
                class="w-full"
                input-class="w-full"
              />
            </div>

            <Button
              type="submit"
              :label="loading ? t('forgotPassword.loading') : t('forgotPassword.passwordSubmit')"
              :loading="loading"
              class="w-full"
            />
          </form>
        </template>

        <!-- Étape 3 — Succès -->
        <template v-else-if="step === 'success'">
          <div class="text-center space-y-4">
            <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
              <i class="pi pi-check text-green-600 dark:text-green-400 text-xl" />
            </div>
            <h2 class="text-base font-medium text-surface-900 dark:text-surface-0">
              {{ t('forgotPassword.successTitle') }}
            </h2>
            <p class="text-sm text-surface-500">
              {{ t('forgotPassword.successHint') }}
            </p>
            <Button
              :label="t('forgotPassword.backToLogin')"
              icon="pi pi-arrow-left"
              class="mt-2"
              @click="$router.push('/login')"
            />
          </div>
        </template>

      </div>

      <!-- Retour login -->
      <div v-if="step !== 'success'" class="mt-6 text-center">
        <Button
          :label="t('forgotPassword.backToLogin')"
          icon="pi pi-arrow-left"
          severity="secondary"
          text
          @click="$router.push('/login')"
        />
      </div>

    </div>
  </div>
</template>