<script setup lang="ts">
import type { ProductInput } from '#shared/schemas/product'

// Checked by middleware/auth.global.ts before the page loads.
definePageMeta({ permission: 'product.create' })
useHead({ title: 'Add product' })

const { create } = useProducts()
const toast = useToast()

async function createProduct(values: ProductInput) {
  const product = await create(values)
  toast.success('Product created', product.name)
  await navigateTo(`/products/${product.id}`)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <NuxtLink to="/products" class="text-sm font-medium text-brand-700 hover:underline">
      ← Back to products
    </NuxtLink>

    <h1 class="text-2xl font-bold text-ink">Add product</h1>

    <UiCard>
      <ProductForm submit-label="Create product" :action="createProduct" />
    </UiCard>
  </div>
</template>
