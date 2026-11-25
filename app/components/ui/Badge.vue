<script setup lang="ts">
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset',
  {
    variants: {
      tone: {
        success: 'bg-brand-50 text-brand-700 ring-brand-600/20',
        neutral: 'bg-slate-50 text-slate-600 ring-slate-500/20',
        warning: 'bg-amber-50 text-amber-800 ring-amber-600/20',
        danger: 'bg-red-50 text-red-700 ring-red-600/20',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
)

const dotColors = {
  success: 'bg-brand-500',
  neutral: 'bg-slate-400',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
} as const

withDefaults(
  defineProps<{
    tone?: NonNullable<VariantProps<typeof badgeVariants>['tone']>
    /** Show a small coloured dot before the label. */
    dot?: boolean
  }>(),
  { tone: 'neutral' },
)
</script>

<template>
  <span :class="badgeVariants({ tone })">
    <span v-if="dot" :class="cn('size-1.5 rounded-full', dotColors[tone])" aria-hidden="true" />
    <slot />
  </span>
</template>
