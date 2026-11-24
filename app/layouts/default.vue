<script setup lang="ts">
const { public: config } = useRuntimeConfig()

const navigation = [{ label: 'Products', to: '/products' }]

// TODO (Day 2): show the signed-in user's name and a "Sign out" button in the header.
</script>

<template>
  <div class="flex min-h-screen">
    <aside class="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
      <div class="px-6 py-5 text-lg font-bold text-ink">{{ config.appName }}</div>
      <nav class="flex flex-col gap-1 px-3" aria-label="Main">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          active-class="bg-brand-50 text-brand-700"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
      <header
        class="flex h-16 items-center justify-end gap-4 border-b border-slate-200 bg-white px-6"
      />

      <main class="mx-auto w-full max-w-6xl flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
