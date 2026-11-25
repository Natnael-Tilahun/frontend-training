<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import type { RouteLocationRaw } from 'vue-router'

/**
 * The top of every page: optional back link, title, description and actions.
 * Using it everywhere keeps pages consistent without copying markup.
 */
defineProps<{
  title: string
  description?: string
  back?: { to: RouteLocationRaw; label: string }
}>()
</script>

<template>
  <header class="flex flex-col gap-4">
    <NuxtLink
      v-if="back"
      :to="back.to"
      class="inline-flex w-fit items-center gap-1.5 rounded text-sm font-medium text-slate-500 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-500"
    >
      <ArrowLeft class="size-4" aria-hidden="true" />
      {{ back.label }}
    </NuxtLink>

    <div class="flex flex-wrap items-start justify-between gap-4">
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-3">
          <h1 class="text-2xl font-semibold tracking-tight">{{ title }}</h1>
          <slot name="badge" />
        </div>
        <p v-if="description || $slots.description" class="mt-1 text-sm text-slate-500">
          <slot name="description">{{ description }}</slot>
        </p>
      </div>
      <div v-if="$slots.actions" class="flex shrink-0 flex-wrap items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>
