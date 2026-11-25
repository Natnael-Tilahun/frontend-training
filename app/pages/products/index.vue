<script setup lang="ts">
import { Plus, Search, SearchX, X } from 'lucide-vue-next'
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

const isFiltered = computed(() => search.value !== '' || statusFilter.value !== 'all')

function clearFilters() {
  search.value = ''
  statusFilter.value = 'all'
}

function openProduct(id: number) {
  return navigateTo(`/products/${id}`)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <UiPageHeader title="Products" description="Everything in the catalogue, with price and stock.">
      <template #actions>
        <!-- UI convenience only: the API rejects the request anyway without permission. -->
        <UiButton v-if="auth.can('product.create')" to="/products/new">
          <Plus /> Add product
        </UiButton>
      </template>
    </UiPageHeader>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div class="relative sm:w-80">
        <Search
          class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <UiInput
          v-model="search"
          type="search"
          placeholder="Search by name or SKU"
          aria-label="Search products"
          class="pr-9 pl-9"
        />
        <button
          v-if="search"
          type="button"
          class="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-700"
          aria-label="Clear search"
          @click="search = ''"
        >
          <X class="size-3.5" aria-hidden="true" />
        </button>
      </div>
      <UiSelect
        v-model="statusFilter"
        :options="statusOptions"
        aria-label="Filter by status"
        class="sm:w-44"
      />
      <p v-if="status === 'success'" class="text-sm text-slate-500 sm:ml-auto" aria-live="polite">
        <template v-if="isFiltered">
          {{ visibleProducts.length }} of {{ products.length }} products
        </template>
        <template v-else>{{ products.length }} products</template>
      </p>
    </div>

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
    >
      <UiButton v-if="auth.can('product.create')" to="/products/new">
        <Plus /> Add product
      </UiButton>
    </UiEmptyState>

    <UiEmptyState
      v-else-if="visibleProducts.length === 0"
      :icon="SearchX"
      title="No products match your filters"
      description="Try a different search term or status."
    >
      <UiButton variant="secondary" @click="clearFilters">Clear filters</UiButton>
    </UiEmptyState>

    <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <ProductCard
        v-for="product in visibleProducts"
        :key="product.id"
        :product="product"
        @select="openProduct"
      />
    </div>
  </div>
</template>
