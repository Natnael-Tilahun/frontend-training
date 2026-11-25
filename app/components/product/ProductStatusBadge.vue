<script setup lang="ts">
import type { ProductStatus } from '#shared/types/product'

const props = defineProps<{ status: ProductStatus }>()

const label = computed(() => (props.status === 'active' ? 'Active' : 'Archived'))
</script>

<template>
  <UiBadge :tone="status === 'active' ? 'success' : 'neutral'" dot>{{ label }}</UiBadge>
</template>
