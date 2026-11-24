<script setup lang="ts" generic="T extends string">
// A generic component: the option values decide the model's type.
interface SelectOption<V extends string> {
  label: string
  value: V
}

const model = defineModel<T>()

defineProps<{
  options: SelectOption<T>[]
  invalid?: boolean
}>()
</script>

<template>
  <select
    v-model="model"
    :aria-invalid="invalid || undefined"
    :class="
      cn(
        'h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900',
        'focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none',
        invalid && 'border-red-500',
      )
    "
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
