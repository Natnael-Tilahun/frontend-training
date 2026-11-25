<script setup lang="ts">
import { PackageSearch } from 'lucide-vue-next'
import type { Component } from 'vue'

withDefaults(defineProps<{ title: string; description?: string; icon?: Component }>(), {
  icon: () => PackageSearch,
})
</script>

<template>
  <div
    class="flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"
  >
    <div class="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
      <component :is="icon" class="size-6" aria-hidden="true" />
    </div>
    <p class="mt-4 text-base font-semibold text-ink">{{ title }}</p>
    <p v-if="description" class="mt-1 max-w-sm text-sm text-slate-500">{{ description }}</p>
    <div v-if="$slots.default" class="mt-5 flex flex-wrap justify-center gap-3">
      <slot />
    </div>
  </div>
</template>
