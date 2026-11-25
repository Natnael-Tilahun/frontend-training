<script setup lang="ts">
/** "In stock", "Low stock" or "Out of stock", with a colour that matches. */
const props = defineProps<{ stock: number }>()

const level = computed(() => getStockLevel(props.stock))

const styles = {
  out: { dot: 'bg-red-500', text: 'text-red-700' },
  low: { dot: 'bg-amber-500', text: 'text-amber-700' },
  ok: { dot: 'bg-brand-500', text: 'text-slate-600' },
} as const
</script>

<template>
  <span :class="cn('inline-flex items-center gap-1.5 text-xs font-medium', styles[level].text)">
    <span :class="cn('size-1.5 rounded-full', styles[level].dot)" aria-hidden="true" />
    <template v-if="level === 'out'">Out of stock</template>
    <template v-else
      >{{ stock }} in stock<template v-if="level === 'low'"> · Low</template></template
    >
  </span>
</template>
