<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('rounded-xl border border-slate-200 bg-white p-6 shadow-sm', $props.class)">
    <slot />
  </div>
</template>
