<script setup lang="ts">
// defineModel() gives this component v-model support: <UiInput v-model="name" />
const model = defineModel<string | number>()

defineProps<{ invalid?: boolean }>()
</script>

<template>
  <input
    v-model="model"
    :aria-invalid="invalid || undefined"
    :class="
      cn(
        'h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400',
        'focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none',
        invalid && 'border-red-500 focus:border-red-500 focus:ring-red-100',
      )
    "
  />
</template>
