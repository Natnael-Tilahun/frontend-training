<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.statusCode === 404)

useHead({ title: () => (isNotFound.value ? 'Page not found' : 'Something went wrong') })

function goHome() {
  return clearError({ redirect: '/products' })
}
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
    <UiLogo />
    <p class="mt-12 text-sm font-semibold text-brand-600 tabular-nums">{{ error.statusCode }}</p>
    <h1 class="mt-2 text-3xl font-semibold tracking-tight">
      {{ isNotFound ? 'Page not found' : 'Something went wrong' }}
    </h1>
    <p class="mt-3 max-w-md text-slate-500">
      {{
        isNotFound
          ? "The page you're looking for doesn't exist or has moved."
          : 'An unexpected error happened. Try again, and tell the team if it keeps happening.'
      }}
    </p>
    <UiButton class="mt-8" @click="goHome">Back to products</UiButton>
  </main>
</template>
