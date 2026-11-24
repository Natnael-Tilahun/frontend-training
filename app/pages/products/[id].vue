<script setup lang="ts">
import type { Product } from '#shared/types/product'

const route = useRoute()
const id = computed(() => Number(route.params.id))

// A getter as the URL: when the route id changes, useFetch fetches again.
const { data: product, status, error } = await useFetch<Product>(() => `/api/products/${id.value}`)

const notFound = computed(() => getErrorStatus(error.value) === 404)

useHead({ title: () => product.value?.name ?? 'Product' })
</script>

<template>
  <div class="flex flex-col gap-6">
    <NuxtLink to="/products" class="text-sm font-medium text-brand-700 hover:underline">
      ← Back to products
    </NuxtLink>

    <div v-if="status === 'pending'" class="h-64 animate-pulse rounded-xl bg-slate-200" />

    <UiEmptyState
      v-else-if="notFound"
      title="Product not found"
      description="It may have been deleted."
    >
      <UiButton variant="secondary" to="/products">Back to products</UiButton>
    </UiEmptyState>

    <UiAlert v-else-if="error" title="Could not load the product">
      {{ getErrorMessage(error) }}
    </UiAlert>

    <UiCard v-else-if="product" class="flex flex-col gap-6">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-ink">{{ product.name }}</h1>
          <p class="text-sm text-slate-500">SKU {{ product.sku }}</p>
        </div>
        <ProductStatusBadge :status="product.status" />
      </div>

      <dl class="grid gap-4 sm:grid-cols-3">
        <div>
          <dt class="text-sm text-slate-500">Price</dt>
          <dd class="text-lg font-semibold text-ink">{{ formatPrice(product.price) }}</dd>
        </div>
        <div>
          <dt class="text-sm text-slate-500">Stock</dt>
          <dd class="text-lg font-semibold text-ink">{{ product.stock }}</dd>
        </div>
        <div>
          <dt class="text-sm text-slate-500">Added</dt>
          <dd class="text-lg font-semibold text-ink">{{ formatDate(product.createdAt) }}</dd>
        </div>
      </dl>

      <p v-if="product.description" class="text-slate-700">{{ product.description }}</p>
    </UiCard>
  </div>
</template>
