<script setup lang="ts">
import type { ProductInput } from '#shared/schemas/product'

// Checked by middleware/auth.global.ts before the page loads.
definePageMeta({ permission: 'product.create' })
useHead({ title: 'Add product' })

const { create } = useProducts()
const toast = useToast()

async function createProduct(values: ProductInput) {
  const product = await create(values)
  toast.success('Product created', `${product.name} is now in the catalogue.`)
  await navigateTo(`/products/${product.id}`)
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <UiPageHeader
      title="Add product"
      description="New products appear in the catalogue as soon as you save them."
      :back="{ to: '/products', label: 'Products' }"
    />

    <ProductForm submit-label="Create product" :action="createProduct" />
  </div>
</template>
