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
  <UiCard class="flex flex-col gap-3">
    <h1 class="text-xl font-bold text-ink">Sign in</h1>
    <UiAlert tone="info" title="TODO (Day 2)">
      Build the sign-in form here. Demo accounts: admin@inventory.test / admin123 ·
      viewer@inventory.test / viewer123
    </UiAlert>
  </UiCard>
</template>
