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

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const pseudo = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

async function handleRegister() {
  error.value = null

  if (password.value !== confirmPassword.value) {
    error.value = t('register.errorMatch')
    return
  }

  if (password.value.length < 8) {
    error.value = t('register.errorLength')
    return
  }

  loading.value = true
  try {
    await auth.register({firstName: firstName.value, lastName: lastName.value,mail: email.value,pseudo: pseudo.value,password: password.value})
    router.push('/')
  } catch {
    error.value = t('register.error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900 px-4">
    <div class="w-full max-w-md">

      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">
          {{ t('app.name') }}
        </h1>
        <p class="mt-2 text-sm text-surface-500">
          {{ t('register.subtitle') }}
        </p>
      </div>

      <div class="bg-surface-0 dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-8">

        <Message v-if="error" severity="error" :closable="false" class="mb-6">
          {{ error }}
        </Message>

        <form class="space-y-5" @submit.prevent="handleRegister">

        <div class="flex flex-col gap-1.5">
        <label for="firstName" class="text-sm font-medium text-surface-700 dark:text-surface-300">
            {{ t('register.firstName') }}
        </label>
        <InputText
            id="firstName"
            v-model="firstName"
            required
            :placeholder="t('register.firstNamePlaceholder')"
            class="w-full"
        />
        </div>

        <div class="flex flex-col gap-1.5">
        <label for="lastName" class="text-sm font-medium text-surface-700 dark:text-surface-300">
            {{ t('register.lastName') }}
        </label>
        <InputText
            id="lastName"
            v-model="lastName"
            required
            :placeholder="t('register.lastNamePlaceholder')"
            class="w-full"
        />
        </div>

          <div class="flex flex-col gap-1.5">
            <label for="pseudo" class="text-sm font-medium text-surface-700 dark:text-surface-300">
              {{ t('register.pseudo') }}
            </label>
            <InputText
              id="pseudo"
              v-model="pseudo"
              required
              :placeholder="t('register.pseudoPlaceholder')"
              class="w-full"
            />
            <small class="text-surface-400 text-xs">
              {{ t('register.pseudoHint') }}
            </small>
          </div>

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

          <div class="flex flex-col gap-1.5">
            <label for="password" class="text-sm font-medium text-surface-700 dark:text-surface-300">
              {{ t('auth.password') }}
            </label>
            <Password
              id="password"
              v-model="password"
              toggleMask
              required
              :placeholder="t('auth.passwordPlaceholder')"
              :prompt-label="t('register.passwordPrompt')"
              :weak-label="t('register.passwordWeak')"
              :medium-label="t('register.passwordMedium')"
              :strong-label="t('register.passwordStrong')"
              class="w-full"
              input-class="w-full"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="confirm-password" class="text-sm font-medium text-surface-700 dark:text-surface-300">
              {{ t('register.confirmPassword') }}
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
            :label="loading ? t('register.loading') : t('register.submit')"
            :loading="loading"
            class="w-full"
          />

        </form>
      </div>

      <p class="mt-6 text-center text-sm text-surface-500">
        {{ t('register.alreadyAccount') }}
        <RouterLink to="/login" class="text-primary hover:underline font-medium">
          {{ t('register.loginLink') }}
        </RouterLink>
      </p>

    </div>
  </div>
</template>