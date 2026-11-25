<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { Eye, EyeOff } from 'lucide-vue-next'
import { loginSchema } from '#shared/schemas/auth'

definePageMeta({ layout: 'auth', public: true })
useHead({ title: 'Sign in' })

const auth = useAuthStore()
const route = useRoute()
const errorMessage = ref('')
const showPassword = ref(false)

const { handleSubmit, errors, defineField, isSubmitting, setValues } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const demoAccounts = [
  {
    label: 'Admin',
    description: 'Can add products',
    email: 'admin@inventory.test',
    password: 'admin123',
  },
  {
    label: 'Viewer',
    description: 'Read only',
    email: 'viewer@inventory.test',
    password: 'viewer123',
  },
]

function fillDemoAccount(account: (typeof demoAccounts)[number]) {
  errorMessage.value = ''
  setValues({ email: account.email, password: account.password })
}

const onSubmit = handleSubmit(async (credentials) => {
  errorMessage.value = ''
  try {
    await auth.login(credentials)
    // Go back to the page they wanted, but only to an internal path.
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : ''
    await navigateTo(redirect.startsWith('/') ? redirect : '/products')
  } catch (error) {
    errorMessage.value = getErrorMessage(error, 'Could not sign in')
  }
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">Sign in</h1>
      <p class="mt-1.5 text-sm text-slate-500">Welcome back. Enter your details to continue.</p>
    </div>

    <UiAlert v-if="errorMessage" :title="errorMessage" />

    <form class="flex flex-col gap-5" novalidate @submit="onSubmit">
      <UiFormField v-slot="{ id, invalid }" label="Email" :error="errors.email">
        <UiInput
          :id="id"
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          autocomplete="username"
          placeholder="you@company.com"
          class="h-10"
          :invalid="invalid"
        />
      </UiFormField>

      <UiFormField v-slot="{ id, invalid }" label="Password" :error="errors.password">
        <div class="relative">
          <UiInput
            :id="id"
            v-model="password"
            v-bind="passwordAttrs"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            class="h-10 pr-10"
            :invalid="invalid"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-slate-400 transition-colors hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-brand-500"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :aria-pressed="showPassword"
            @click="showPassword = !showPassword"
          >
            <component :is="showPassword ? EyeOff : Eye" class="size-4" aria-hidden="true" />
          </button>
        </div>
      </UiFormField>

      <UiButton type="submit" size="lg" class="mt-1 text-sm" :loading="isSubmitting">
        Sign in
      </UiButton>
    </form>

    <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p class="text-xs font-medium text-slate-500">Demo accounts: click one to fill the form</p>
      <div class="mt-3 grid grid-cols-2 gap-2">
        <button
          v-for="account in demoAccounts"
          :key="account.email"
          type="button"
          class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-left shadow-xs transition-colors hover:border-brand-300 hover:bg-brand-50/50 focus-visible:outline-2 focus-visible:outline-brand-500"
          @click="fillDemoAccount(account)"
        >
          <span class="block text-sm font-medium text-ink">{{ account.label }}</span>
          <span class="block text-xs text-slate-500">{{ account.description }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
