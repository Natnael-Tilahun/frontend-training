<script setup lang="ts">
import { CircleAlert, CircleCheck, Info, X } from 'lucide-vue-next'

const { toasts, dismiss } = useToast()

const tones = {
  success: { icon: CircleCheck, color: 'text-brand-600' },
  error: { icon: CircleAlert, color: 'text-red-600' },
  info: { icon: Info, color: 'text-sky-600' },
} as const
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-end gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6"
    aria-live="polite"
  >
    <TransitionGroup
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 translate-x-2"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex w-full animate-toast-in items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-pop sm:w-96"
        :role="toast.tone === 'error' ? 'alert' : 'status'"
      >
        <component
          :is="tones[toast.tone].icon"
          :class="cn('mt-0.5 size-5 shrink-0', tones[toast.tone].color)"
          aria-hidden="true"
        />
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-ink">{{ toast.title }}</p>
          <p v-if="toast.description" class="mt-0.5 text-sm text-slate-500">
            {{ toast.description }}
          </p>
        </div>
        <button
          type="button"
          class="-m-1 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Dismiss notification"
          @click="dismiss(toast.id)"
        >
          <X class="size-4" aria-hidden="true" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
