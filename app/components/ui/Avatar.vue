<script setup lang="ts">
const props = defineProps<{ name: string; class?: string }>()

// "Admin User" → "AU"
const initials = computed(() =>
  props.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join(''),
)
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-800 ring-1 ring-brand-600/10',
        $props.class,
      )
    "
    aria-hidden="true"
  >
    {{ initials }}
  </span>
</template>
