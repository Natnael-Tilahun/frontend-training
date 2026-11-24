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
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink">Products</h1>
        <p class="text-sm text-slate-500">{{ products.length }} products in the catalogue</p>
      </div>
      <!-- TODO (Day 2): "Add product" button, visible only with the product.create permission -->
    </div>

    <!-- Every data screen handles four states: loading, error, empty, success. -->
    <div v-if="status === 'pending'" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="n in 6" :key="n" class="h-36 animate-pulse rounded-xl bg-slate-200" />
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
    <ul v-else class="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      <li
        v-for="product in products"
        :key="product.id"
        class="flex items-center justify-between gap-4 px-4 py-3"
      >
        <div>
          <NuxtLink :to="`/products/${product.id}`" class="font-medium text-ink hover:underline">
            {{ product.name }}
          </NuxtLink>
          <p class="text-xs text-slate-500">{{ product.sku }}</p>
        </div>
        <span class="text-sm font-semibold text-ink">{{ formatPrice(product.price) }}</span>
      </li>
    </ul>
  </div>
</template>
