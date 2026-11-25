<script setup lang="ts">
import { PackageX } from 'lucide-vue-next'
import type { Product } from '#shared/types/product'

const route = useRoute()
const id = computed(() => Number(route.params.id))

// A getter as the URL: when the route id changes, useFetch fetches again.
const {
  data: product,
  status,
  error,
  refresh,
} = await useFetch<Product>(() => `/api/products/${id.value}`)

const notFound = computed(() => getErrorStatus(error.value) === 404)

const stockLevel = computed(() => getStockLevel(product.value?.stock ?? 0))
const stockValue = computed(() => (product.value ? product.value.price * product.value.stock : 0))

useHead({ title: () => product.value?.name ?? 'Product' })
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- Loading: a skeleton with the same shape as the page, so nothing jumps. -->
    <div v-if="status === 'pending'" class="flex flex-col gap-8" aria-busy="true">
      <div class="flex flex-col gap-4">
        <div class="h-4 w-20 animate-pulse rounded bg-slate-200" />
        <div class="h-7 w-64 animate-pulse rounded bg-slate-200" />
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="n in 4" :key="n" class="h-24 animate-pulse rounded-xl bg-slate-200/70" />
      </div>
      <div class="h-48 animate-pulse rounded-xl bg-slate-200/70" />
    </div>

    <template v-else-if="notFound">
      <UiPageHeader title="Product not found" :back="{ to: '/products', label: 'Products' }" />
      <UiEmptyState
        :icon="PackageX"
        title="This product doesn't exist"
        description="It may have been deleted, or the link is wrong."
      >
        <UiButton variant="secondary" to="/products">Back to products</UiButton>
      </UiEmptyState>
    </template>

    <template v-else-if="error">
      <UiPageHeader title="Product" :back="{ to: '/products', label: 'Products' }" />
      <UiAlert title="Could not load the product">
        {{ getErrorMessage(error) }}
        <UiButton variant="secondary" size="sm" class="mt-3" @click="refresh()">Try again</UiButton>
      </UiAlert>
    </template>

    <template v-else-if="product">
      <UiPageHeader :title="product.name" :back="{ to: '/products', label: 'Products' }">
        <template #badge>
          <ProductStatusBadge :status="product.status" />
        </template>
        <template #description>
          SKU <span class="font-mono text-slate-700">{{ product.sku }}</span>
        </template>
        <!-- Home exercises 01 and 02 add "Edit" and "Delete" here, in an #actions slot. -->
      </UiPageHeader>

      <dl class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UiCard class="p-5">
          <dt class="text-sm text-slate-500">Price</dt>
          <dd class="mt-2 text-2xl font-semibold text-ink tabular-nums">
            {{ formatPrice(product.price) }}
          </dd>
        </UiCard>
        <UiCard class="p-5">
          <dt class="text-sm text-slate-500">In stock</dt>
          <dd class="mt-2 flex items-baseline gap-2">
            <span class="text-2xl font-semibold text-ink tabular-nums">{{ product.stock }}</span>
            <UiBadge v-if="stockLevel === 'out'" tone="danger">Out of stock</UiBadge>
            <UiBadge v-else-if="stockLevel === 'low'" tone="warning">Low stock</UiBadge>
          </dd>
        </UiCard>
        <UiCard class="p-5">
          <dt class="text-sm text-slate-500">Stock value</dt>
          <dd class="mt-2 text-2xl font-semibold text-ink tabular-nums">
            {{ formatPrice(stockValue) }}
          </dd>
        </UiCard>
        <UiCard class="p-5">
          <dt class="text-sm text-slate-500">Added</dt>
          <dd class="mt-2 text-2xl font-semibold text-ink">{{ formatDate(product.createdAt) }}</dd>
        </UiCard>
      </dl>

      <UiCard class="p-0">
        <h2 class="border-b border-slate-100 px-6 py-4 text-base font-semibold">Description</h2>
        <p v-if="product.description" class="px-6 py-5 leading-relaxed text-slate-700">
          {{ product.description }}
        </p>
        <p v-else class="px-6 py-5 text-slate-400 italic">No description yet.</p>
      </UiCard>
    </template>
  </div>
</template>
