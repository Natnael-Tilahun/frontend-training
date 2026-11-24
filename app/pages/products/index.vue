<script setup lang="ts">
import type { Paged } from '#shared/types/api'
import type { Product, ProductStatus } from '#shared/types/product'

useHead({ title: 'Products' })

const auth = useAuthStore()

// Load the list once and filter in the browser (fine for ~100 items).
// Home exercise 03 moves search and pagination to the server.
const { data, status, error, refresh } = await useFetch<Paged<Product>>('/api/products', {
  query: { size: 100 },
})

const products = computed(() => data.value?.items ?? [])

const { search, results } = useSearch(products, ['name', 'sku'])

type StatusFilter = ProductStatus | 'all'

const statusFilter = ref<StatusFilter>('all')

const statusOptions: { label: string; value: StatusFilter }[] = [
  { label: 'All statuses', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
]

// Derived data → computed. Never a watch that copies values around.
const visibleProducts = computed(() =>
  statusFilter.value === 'all'
    ? results.value
    : results.value.filter((p) => p.status === statusFilter.value),
)

function openProduct(id: number) {
  return navigateTo(`/products/${id}`)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink">Products</h1>
        <p class="text-sm text-slate-500">{{ products.length }} products in the catalogue</p>
      </div>
      <!-- UI convenience only: the API rejects the request anyway without permission. -->
      <UiButton v-if="auth.can('product.create')" to="/products/new">Add product</UiButton>
    </div>

    <div class="flex flex-col gap-3 sm:flex-row">
      <UiInput
        v-model="search"
        type="search"
        placeholder="Search by name or SKU"
        aria-label="Search products"
        class="sm:max-w-sm"
      />
      <UiSelect
        v-model="statusFilter"
        :options="statusOptions"
        aria-label="Filter by status"
        class="sm:w-48"
      />
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

    <UiEmptyState
      v-else-if="visibleProducts.length === 0"
      title="No products match your filters"
      description="Try a different search or status."
    />

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ProductCard
        v-for="product in visibleProducts"
        :key="product.id"
        :product="product"
        @select="openProduct"
      />
    </div>
  </div>
</template>
