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
  <form novalidate @submit="onSubmit">
    <UiCard class="divide-y divide-slate-100 p-0">
      <section class="grid gap-6 p-6 lg:grid-cols-3 lg:gap-10">
        <div>
          <h2 class="text-base font-semibold">Basic information</h2>
          <p class="mt-1 text-sm text-slate-500">How the product is named and found.</p>
        </div>
        <div class="flex flex-col gap-5 lg:col-span-2">
          <UiFormField v-slot="{ id, invalid }" label="Name" :error="errors.name" required>
            <UiInput
              :id="id"
              v-model="name"
              v-bind="nameAttrs"
              placeholder="e.g. Wireless Mouse"
              :invalid="invalid"
            />
          </UiFormField>

          <UiFormField
            v-slot="{ id, invalid }"
            label="SKU"
            :error="errors.sku"
            hint="3–20 capital letters, digits or dashes. Must be unique."
            required
          >
            <UiInput
              :id="id"
              v-model="sku"
              v-bind="skuAttrs"
              placeholder="WM-100"
              autocapitalize="characters"
              spellcheck="false"
              class="font-mono sm:max-w-60"
              :invalid="invalid"
            />
          </UiFormField>

          <UiFormField
            v-slot="{ id, invalid }"
            label="Description"
            :error="errors.description"
            hint="Optional. Shown on the product page."
          >
            <UiTextarea
              :id="id"
              v-model="description"
              v-bind="descriptionAttrs"
              placeholder="What is it, and what is it for?"
              :invalid="invalid"
            />
          </UiFormField>
        </div>
      </section>

      <section class="grid gap-6 p-6 lg:grid-cols-3 lg:gap-10">
        <div>
          <h2 class="text-base font-semibold">Price and inventory</h2>
          <p class="mt-1 text-sm text-slate-500">
            Archived products stay in the catalogue but can't be sold.
          </p>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:col-span-2">
          <UiFormField v-slot="{ id, invalid }" label="Price" :error="errors.price" required>
            <div class="relative">
              <span
                class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-400"
                aria-hidden="true"
                >ETB</span
              >
              <UiInput
                :id="id"
                v-model="price"
                v-bind="priceAttrs"
                type="number"
                inputmode="decimal"
                step="0.01"
                min="0"
                placeholder="0.00"
                class="pl-12 tabular-nums"
                :invalid="invalid"
              />
            </div>
          </UiFormField>

          <UiFormField v-slot="{ id, invalid }" label="Stock" :error="errors.stock" required>
            <UiInput
              :id="id"
              v-model="stock"
              v-bind="stockAttrs"
              type="number"
              inputmode="numeric"
              step="1"
              min="0"
              placeholder="0"
              class="tabular-nums"
              :invalid="invalid"
            />
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
        </div>
      </section>

      <footer
        class="flex flex-col-reverse gap-3 rounded-b-xl bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end"
      >
        <UiButton variant="secondary" to="/products">Cancel</UiButton>
        <UiButton type="submit" :loading="isSubmitting">{{ submitLabel }}</UiButton>
      </footer>
    </UiCard>
  </form>
</template>
