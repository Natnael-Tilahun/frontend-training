<script setup lang="ts">
const model = defineModel<string>()

defineProps<{ invalid?: boolean; class?: string }>()
</script>

<template>
  <textarea
    v-model="model"
    rows="4"
    :aria-invalid="invalid || undefined"
    :class="
      cn(
        'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink shadow-xs transition-[border-color,box-shadow]',
        'placeholder:text-slate-400 hover:border-slate-300',
        'focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15 focus:outline-none',
        invalid && 'border-red-400 hover:border-red-400 focus:border-red-500 focus:ring-red-500/15',
        $props.class,
      )
    "
  />
</template>
