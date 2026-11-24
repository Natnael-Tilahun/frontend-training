<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { productInputSchema } from '#shared/schemas/product'
import type { ProductInput } from '#shared/schemas/product'
import type { ProductStatus } from '#shared/types/product'

/**
 * Reusable for create AND edit: the page decides what "save" means (`action`),
 * the form owns validation and how errors are shown.
 */
const props = defineProps<{
  initialValues?: Partial<ProductInput>
  submitLabel: string
  action: (values: ProductInput) => Promise<void>
}>()

const toast = useToast()

const { handleSubmit, errors, defineField, isSubmitting, setFieldError } = useForm({
  validationSchema: toTypedSchema(productInputSchema),
  initialValues: { status: 'active', ...props.initialValues },
})

const [name, nameAttrs] = defineField('name')
const [sku, skuAttrs] = defineField('sku')
const [price, priceAttrs] = defineField('price')
const [stock, stockAttrs] = defineField('stock')
const [status, statusAttrs] = defineField('status')
const [description, descriptionAttrs] = defineField('description')

const statusOptions: { label: string; value: ProductStatus }[] = [
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
]

// `values` is fully typed as ProductInput: Zod already validated and coerced it.
const onSubmit = handleSubmit(async (values) => {
  try {
    await props.action(values)
  } catch (error) {
    // The server is the final judge. Show its answer where it belongs.
    if (getErrorStatus(error) === 409) {
      setFieldError('sku', getErrorMessage(error))
    } else {
      toast.error('Could not save the product', getErrorMessage(error))
    }
  }
})
</script>

<template>
  <form class="flex flex-col gap-5" novalidate @submit="onSubmit">
    <UiFormField v-slot="{ id, invalid }" label="Name" :error="errors.name" required>
      <UiInput :id="id" v-model="name" v-bind="nameAttrs" :invalid="invalid" />
    </UiFormField>

    <div class="grid gap-5 sm:grid-cols-2">
      <UiFormField
        v-slot="{ id, invalid }"
        label="SKU"
        :error="errors.sku"
        hint="e.g. WM-100"
        required
      >
        <UiInput :id="id" v-model="sku" v-bind="skuAttrs" :invalid="invalid" />
      </UiFormField>

      <UiFormField v-slot="{ id, invalid }" label="Status" :error="errors.status" required>
        <UiSelect
          :id="id"
          v-model="status"
          v-bind="statusAttrs"
          :options="statusOptions"
          :invalid="invalid"
        />
      </UiFormField>

      <UiFormField v-slot="{ id, invalid }" label="Price (ETB)" :error="errors.price" required>
        <UiInput
          :id="id"
          v-model="price"
          v-bind="priceAttrs"
          type="number"
          step="0.01"
          min="0"
          :invalid="invalid"
        />
      </UiFormField>

      <UiFormField v-slot="{ id, invalid }" label="Stock" :error="errors.stock" required>
        <UiInput
          :id="id"
          v-model="stock"
          v-bind="stockAttrs"
          type="number"
          step="1"
          min="0"
          :invalid="invalid"
        />
      </UiFormField>
    </div>

    <UiFormField v-slot="{ id, invalid }" label="Description" :error="errors.description">
      <UiTextarea :id="id" v-model="description" v-bind="descriptionAttrs" :invalid="invalid" />
    </UiFormField>

    <div class="flex justify-end gap-3">
      <UiButton variant="secondary" to="/products">Cancel</UiButton>
      <UiButton type="submit" :loading="isSubmitting">{{ submitLabel }}</UiButton>
    </div>
  </form>
</template>
