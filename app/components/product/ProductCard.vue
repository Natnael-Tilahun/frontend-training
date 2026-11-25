<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import type { Product } from '#shared/types/product'

defineProps<{ product: Product }>()

// Typed events: the parent gets `id: number`, nothing else is allowed.
const emit = defineEmits<{ select: [id: number] }>()
</script>

<template>
  <!-- The button's ::after covers the whole card, so the card is clickable
       while there is still one real, keyboard-focusable button inside. -->
  <UiCard
    class="group relative flex flex-col gap-5 p-5 transition-[border-color,box-shadow] hover:border-slate-300 hover:shadow-pop has-focus-visible:ring-2 has-focus-visible:ring-brand-500"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <h3 class="truncate text-[15px] font-semibold">{{ product.name }}</h3>
        <p class="mt-0.5 font-mono text-xs text-slate-500">{{ product.sku }}</p>
      </div>
      <ProductStatusBadge :status="product.status" />
    </div>

    <div class="mt-auto flex items-end justify-between gap-3">
      <div class="flex flex-col gap-1">
        <p class="text-lg font-semibold text-ink tabular-nums">{{ formatPrice(product.price) }}</p>
        <ProductStockLabel :stock="product.stock" />
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-0.5 rounded-md text-sm font-medium text-slate-500 transition-colors group-hover:text-brand-700 focus-visible:outline-none after:absolute after:inset-0 after:rounded-xl"
        :aria-label="`View ${product.name}`"
        @click="emit('select', product.id)"
      >
        View
        <ChevronRight
          class="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </button>
    </div>
  </UiCard>
</template>
