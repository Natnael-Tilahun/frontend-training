<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'

defineProps<{ class?: string }>()
</script>

<template>
  <LoaderCircle
    :class="cn('size-4 animate-spin', $props.class)"
    role="status"
    aria-label="Loading"
  />
</template>
