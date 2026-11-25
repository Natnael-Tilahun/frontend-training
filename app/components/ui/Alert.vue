<script setup lang="ts">
import { CircleAlert, Info } from 'lucide-vue-next'

withDefaults(defineProps<{ title: string; tone?: 'error' | 'info' }>(), { tone: 'error' })
</script>

<template>
  <div
    role="alert"
    :class="
      cn(
        'flex gap-3 rounded-xl border px-4 py-3 text-sm',
        tone === 'error'
          ? 'border-red-200 bg-red-50 text-red-800'
          : 'border-sky-200 bg-sky-50 text-sky-800',
      )
    "
  >
    <component
      :is="tone === 'error' ? CircleAlert : Info"
      :class="cn('mt-0.5 size-4 shrink-0', tone === 'error' ? 'text-red-500' : 'text-sky-500')"
      aria-hidden="true"
    />
    <div class="min-w-0">
      <p class="font-semibold">{{ title }}</p>
      <div v-if="$slots.default" class="mt-1 opacity-90"><slot /></div>
    </div>
  </div>
</template>
