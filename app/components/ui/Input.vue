<script setup lang="ts">
// defineModel() gives this component v-model support: <UiInput v-model="name" />
const model = defineModel<string | number>()

// `class` is a prop so cn() can merge it: <UiInput class="pl-9" /> wins over the default px-3.
defineProps<{ invalid?: boolean; class?: string }>()
</script>

<template>
  <input
    v-model="model"
    :aria-invalid="invalid || undefined"
    :class="
      cn(
        'h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-ink shadow-xs transition-[border-color,box-shadow]',
        'placeholder:text-slate-400 hover:border-slate-300',
        'focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15 focus:outline-none',
        'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
        '[&::-webkit-search-cancel-button]:hidden',
        invalid && 'border-red-400 hover:border-red-400 focus:border-red-500 focus:ring-red-500/15',
        $props.class,
      )
    "
  />
</template>
