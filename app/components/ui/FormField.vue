<script setup lang="ts">
/**
 * Label + control + error message, wired for accessibility.
 * The slot receives the generated `id` so the label points at the control:
 *
 * <UiFormField label="Name" :error="errors.name" v-slot="{ id }">
 *   <UiInput :id="id" v-model="name" />
 * </UiFormField>
 */
defineProps<{
  label: string
  error?: string
  hint?: string
  required?: boolean
}>()

const id = useId()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="id" class="text-sm font-medium text-slate-800">
      {{ label }}
      <span v-if="required" class="text-red-600" aria-hidden="true">*</span>
    </label>
    <slot :id="id" :invalid="Boolean(error)" />
    <p v-if="error" class="text-sm text-red-600" role="alert">{{ error }}</p>
    <p v-else-if="hint" class="text-sm text-slate-500">{{ hint }}</p>
  </div>
</template>
