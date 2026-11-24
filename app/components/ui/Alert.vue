<script setup lang="ts">
withDefaults(defineProps<{ title: string; tone?: 'error' | 'info' }>(), { tone: 'error' })
</script>

<template>
  <div
    role="alert"
    :class="
      cn(
        'rounded-xl border px-4 py-3 text-sm',
        tone === 'error'
          ? 'border-red-200 bg-red-50 text-red-800'
          : 'border-sky-200 bg-sky-50 text-sky-800',
      )
    "
  >
    <p class="font-semibold">{{ title }}</p>
    <div v-if="$slots.default" class="mt-1"><slot /></div>
  </div>
</template>
