<script setup lang="ts">
useHead({ title: 'Add product' })

// TODO (Day 2): the create-product page.
// - protect it: definePageMeta({ permission: 'product.create' }) (needs the auth middleware)
// - render <ProductForm submit-label="Create product" :action="createProduct" />
// - createProduct: useProducts().create(values) → success toast → navigate to the new product
// See exercises/day-2-create-product.md
</script>

<template>
  <div class="flex flex-col gap-8">
    <UiPageHeader
      title="Add product"
      description="New products appear in the catalogue as soon as you save them."
      :back="{ to: '/products', label: 'Products' }"
    />

    <UiAlert tone="info" title="TODO (Day 2)">
      Build the product form here. Schema: shared/schemas/product.ts
    </UiAlert>
  </div>
</template>
