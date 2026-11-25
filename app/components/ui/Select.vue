<script setup lang="ts" generic="T extends string">
import { ChevronDown } from 'lucide-vue-next'

// A generic component: the option values decide the model's type.
interface SelectOption<V extends string> {
  label: string
  value: V
}

const model = defineModel<T>()

defineProps<{
  options: SelectOption<T>[]
  invalid?: boolean
  class?: string
}>()

// The id/aria attributes belong on the <select>, not on the wrapper div.
defineOptions({ inheritAttrs: false })
</script>

<template>
  <div :class="cn('relative', $props.class)">
    <select
      v-bind="$attrs"
      v-model="model"
      :aria-invalid="invalid || undefined"
      :class="
        cn(
          'h-9 w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white pr-9 pl-3 text-sm text-ink shadow-xs transition-[border-color,box-shadow]',
          'hover:border-slate-300 focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15 focus:outline-none',
          invalid && 'border-red-400 focus:border-red-500 focus:ring-red-500/15',
        )
      "
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <ChevronDown
      class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-400"
      aria-hidden="true"
    />
  </div>
</template>
