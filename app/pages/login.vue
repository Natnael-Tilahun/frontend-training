<script setup lang="ts">
definePageMeta({ layout: 'auth', public: true })
useHead({ title: 'Sign in' })

// TODO (Day 2): build the sign-in form.
// - vee-validate + `loginSchema` from '#shared/schemas/auth'
// - call `useAuthStore().login(credentials)`, show the server error on failure
// - on success, go to `route.query.redirect` (internal paths only) or /products
// See exercises/day-2-create-product.md
</script>

<template>
  <div class="flex flex-col gap-8">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">Sign in</h1>
      <p class="mt-1.5 text-sm text-slate-500">Welcome back. Enter your details to continue.</p>
    </div>

    <UiAlert tone="info" title="TODO (Day 2)">
      Build the sign-in form here. Demo accounts: admin@inventory.test / admin123 ·
      viewer@inventory.test / viewer123
    </UiAlert>
  </div>
</template>
