<script setup lang="ts">
const model = defineModel<string>()

defineProps<{ invalid?: boolean }>()
</script>

<template>
  <textarea
    v-model="model"
    rows="4"
    :aria-invalid="invalid || undefined"
    :class="
      cn(
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400',
        'focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none',
        invalid && 'border-red-500 focus:border-red-500 focus:ring-red-100',
      )
    "
  />
</template>
