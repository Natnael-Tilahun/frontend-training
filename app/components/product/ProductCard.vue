<script setup lang="ts">
import type { Product } from '#shared/types/product'

defineProps<{ product: Product }>()

// Typed events: the parent gets `id: number`, nothing else is allowed.
const emit = defineEmits<{ select: [id: number] }>()
</script>

<template>
  <UiCard class="flex flex-col gap-3 p-5">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <h3 class="truncate font-semibold text-ink">{{ product.name }}</h3>
        <p class="text-xs text-slate-500">{{ product.sku }}</p>
      </div>
      <ProductStatusBadge :status="product.status" />
    </div>

    <div class="flex items-end justify-between">
      <div>
        <p class="text-lg font-semibold text-ink">{{ formatPrice(product.price) }}</p>
        <p :class="cn('text-xs', product.stock === 0 ? 'text-red-600' : 'text-slate-500')">
          {{ product.stock === 0 ? 'Out of stock' : `${product.stock} in stock` }}
        </p>
      </div>
      <UiButton variant="secondary" size="sm" @click="emit('select', product.id)">View</UiButton>
    </div>
  </UiCard>
</template>
