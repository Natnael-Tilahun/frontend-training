<script setup lang="ts">
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      tone: {
        success: 'bg-brand-50 text-brand-700 ring-1 ring-brand-200',
        neutral: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
        warning: 'bg-amber-50 text-amber-800 ring-1 ring-amber-200',
        danger: 'bg-red-50 text-red-700 ring-1 ring-red-200',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
)

defineProps<{ tone?: VariantProps<typeof badgeVariants>['tone'] }>()
</script>

<template>
  <span :class="badgeVariants({ tone })"><slot /></span>
</template>
