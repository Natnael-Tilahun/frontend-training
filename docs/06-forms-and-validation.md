# 6. Forms and validation

## One schema, three jobs

```ts
// shared/schemas/product.ts
export const productInputSchema = z.object({
  name: z.string().trim().min(2, 'Name must have at least 2 characters'),
  price: z.coerce.number().positive('Price must be more than 0'),
  status: z.enum(['active', 'archived']),
})
export type ProductInput = z.infer<typeof productInputSchema>
```

The same schema gives you:

1. **validation rules and messages** for the form (`app/components/product/ProductForm.vue`),
2. **request validation** on the server (`server/api/products/index.post.ts`),
3. **the TypeScript type** (`ProductInput`).

`z.coerce.number()` turns the string from an `<input>` into a number before checking it.

## Wiring a form with vee-validate

```ts
const { handleSubmit, errors, defineField, isSubmitting, setFieldError } = useForm({
  validationSchema: toTypedSchema(productInputSchema),
  initialValues: { status: 'active' },
})

const [name, nameAttrs] = defineField('name')

const onSubmit = handleSubmit(async (values) => {
  // values: ProductInput, already validated and coerced
})
```

```vue
<UiFormField v-slot="{ id, invalid }" label="Name" :error="errors.name">
  <UiInput :id="id" v-model="name" v-bind="nameAttrs" :invalid="invalid" />
</UiFormField>
```

If you know React: the same idea as react-hook-form + zod (`useForm`, `handleSubmit`).

## Rules for good forms

- **One schema per form**, kept in `shared/schemas/` (or `validations/` in other projects).
- **The server validates again.** Anyone can call the API without your form.
- **Show server errors where they belong:** a field error for a field problem (`setFieldError('sku', …)`), a toast for everything else.
- **Disable submit while submitting** (`isSubmitting`) to prevent double posts.
- **Reuse one form for create and edit.** The page decides what "save" means (the `action` prop on `ProductForm`).
- Labels on every field; errors announced with `role="alert"`.

> **Zod 3 vs 4:** Zod 4 exists, but `@vee-validate/zod` still targets Zod 3, so this repo (and many real projects) use Zod 3.25. The schema API you write is almost the same.
