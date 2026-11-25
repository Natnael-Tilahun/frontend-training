<script setup lang="ts">
import { Boxes } from 'lucide-vue-next'

const { public: config } = useRuntimeConfig()

withDefaults(defineProps<{ inverted?: boolean }>(), { inverted: false })
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <span
      :class="
        cn(
          'flex size-8 items-center justify-center rounded-lg',
          inverted
            ? 'bg-white/15 text-white ring-1 ring-white/20'
            : 'bg-brand-600 text-white shadow-xs',
        )
      "
    >
      <Boxes class="size-[18px]" aria-hidden="true" />
    </span>
    <span
      :class="cn('text-[15px] font-semibold tracking-tight', inverted ? 'text-white' : 'text-ink')"
    >
      {{ config.appName }}
    </span>
  </span>
</template>
