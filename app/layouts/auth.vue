<script setup lang="ts">
import { PackageSearch, ShieldCheck, Zap } from 'lucide-vue-next'

const highlights = [
  {
    icon: PackageSearch,
    title: 'Find anything fast',
    text: 'Search the catalogue by name or SKU.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe by default',
    text: 'Every action is checked against your role.',
  },
  { icon: Zap, title: 'Built to be changed', text: 'Typed from the database to the button.' },
]
</script>

<template>
  <div class="grid min-h-screen bg-white lg:grid-cols-[1fr_minmax(0,560px)]">
    <main class="flex flex-col px-6 py-8 sm:px-10">
      <UiLogo />
      <div class="flex flex-1 items-center justify-center py-10">
        <div class="w-full max-w-sm">
          <slot />
        </div>
      </div>
      <p class="text-xs text-slate-400">Training project · Demo data only</p>
    </main>

    <aside
      class="relative hidden overflow-hidden bg-brand-900 p-12 text-brand-100 lg:flex lg:flex-col lg:justify-end"
    >
      <!-- Decorative grid and glow -->
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        class="absolute -top-32 -right-32 size-96 rounded-full bg-brand-500/30 blur-3xl"
        aria-hidden="true"
      />

      <div class="relative">
        <h2 class="text-3xl font-semibold tracking-tight text-white">
          Your inventory, in one calm place.
        </h2>
        <ul class="mt-10 flex flex-col gap-6">
          <li v-for="item in highlights" :key="item.title" class="flex gap-4">
            <span
              class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15"
            >
              <component :is="item.icon" class="size-5 text-brand-200" aria-hidden="true" />
            </span>
            <div>
              <p class="font-medium text-white">{{ item.title }}</p>
              <p class="mt-0.5 text-sm text-brand-200/80">{{ item.text }}</p>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>
