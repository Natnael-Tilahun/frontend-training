<script setup lang="ts">
import type { Paged } from '#shared/types/api'
import type { Product } from '#shared/types/product'

useHead({ title: 'Products' })

// The data already loads. You don't need to understand useFetch until Day 2.
const { data, status, error, refresh } = await useFetch<Paged<Product>>('/api/products', {
  query: { size: 100 },
})

const products = computed(() => data.value?.items ?? [])

// TODO (Day 1): add a search box and filter the list with `computed`.
// Stretch: move the search into a generic `useSearch<T>()` composable and add a status filter.
// See exercises/day-1-product-list.md
</script>

<template>
  <div class="flex flex-col gap-6">
    <UiPageHeader title="Products" description="Everything in the catalogue, with price and stock.">
      <!-- TODO (Day 2): an "Add product" button in an #actions slot, visible only with the product.create permission -->
    </UiPageHeader>

    <!-- TODO (Day 1): a search box (and, as a stretch, a status filter) goes here. -->

    <!-- Every data screen handles four states: loading, error, empty, success. -->
    <div v-if="status === 'pending'" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <ProductCardSkeleton v-for="n in 6" :key="n" />
    </div>

    <UiAlert v-else-if="error" title="Could not load products">
      {{ getErrorMessage(error) }}
      <UiButton variant="secondary" size="sm" class="mt-3" @click="refresh()">Try again</UiButton>
    </UiAlert>

    <UiEmptyState
      v-else-if="products.length === 0"
      title="No products yet"
      description="Products you add will show up here."
    />

    <!-- TODO (Day 1): replace this plain list with a grid of <ProductCard> components. -->
    <ul
      v-else
      class="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-card"
    >
      <li
        v-for="product in products"
        :key="product.id"
        class="flex items-center justify-between gap-4 px-5 py-3.5"
      >
        <div class="min-w-0">
          <NuxtLink :to="`/products/${product.id}`" class="font-medium text-ink hover:underline">
            {{ product.name }}
          </NuxtLink>
          <p class="font-mono text-xs text-slate-500">{{ product.sku }}</p>
        </div>
        <span class="font-semibold text-ink tabular-nums">{{ formatPrice(product.price) }}</span>
      </li>
    </ul>
  </div>
</template>
