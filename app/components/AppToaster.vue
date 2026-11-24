<script setup lang="ts">
const { toasts, dismiss } = useToast()

const toneClasses = {
  success: 'border-brand-200 bg-brand-50 text-brand-900',
  error: 'border-red-200 bg-red-50 text-red-900',
  info: 'border-slate-200 bg-white text-slate-900',
} as const
</script>

<template>
  <div class="fixed right-4 bottom-4 z-50 flex w-80 flex-col gap-2" aria-live="polite">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="cn('rounded-xl border p-4 shadow-lg', toneClasses[toast.tone])"
    >
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-sm font-semibold">{{ toast.title }}</p>
          <p v-if="toast.description" class="mt-0.5 text-sm opacity-80">{{ toast.description }}</p>
        </div>
        <button
          type="button"
          class="text-sm opacity-60 hover:opacity-100"
          aria-label="Dismiss"
          @click="dismiss(toast.id)"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>
