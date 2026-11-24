<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { loginSchema } from '#shared/schemas/auth'

definePageMeta({ layout: 'auth', public: true })
useHead({ title: 'Sign in' })

const auth = useAuthStore()
const route = useRoute()
const errorMessage = ref('')

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

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
  <UiCard class="flex flex-col gap-6">
    <div>
      <h1 class="text-xl font-bold text-ink">Sign in</h1>
      <p class="mt-1 text-sm text-slate-500">
        Demo accounts: admin@inventory.test / admin123 · viewer@inventory.test / viewer123
      </p>
    </div>

    <UiAlert v-if="errorMessage" :title="errorMessage" />

    <form class="flex flex-col gap-4" novalidate @submit="onSubmit">
      <UiFormField v-slot="{ id, invalid }" label="Email" :error="errors.email">
        <UiInput
          :id="id"
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          autocomplete="username"
          :invalid="invalid"
        />
      </UiFormField>

      <UiFormField v-slot="{ id, invalid }" label="Password" :error="errors.password">
        <UiInput
          :id="id"
          v-model="password"
          v-bind="passwordAttrs"
          type="password"
          autocomplete="current-password"
          :invalid="invalid"
        />
      </UiFormField>

      <UiButton type="submit" :loading="isSubmitting">Sign in</UiButton>
    </form>
  </UiCard>
</template>
