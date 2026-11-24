# 1. TypeScript

TypeScript describes the **shape** of your data so mistakes show up in the editor instead of in production.
Goal: read any type in a Vue codebase confidently, and write the common ones.

## Describing data

```ts
// shared/types/product.ts (simplified)
interface Product {
  id: number
  name: string
  price: number
  status: 'active' | 'archived' // union of literal types: only these values
  description?: string // optional: may be missing
}

type ProductStatus = Product['status'] // reuse a field's type
```

- `interface` and `type` both describe object shapes. Use one style consistently. This repo uses `interface` for objects and `type` for unions and derived types.
- A **union of literals** (`'active' | 'archived'`) is how you model a fixed set of values. Prefer it to plain `string`.
- `as const` keeps literal values: see `PERMISSIONS` in `shared/types/auth.ts`, which turns into the `Permission` union.

## Functions and inference

```ts
function formatPrice(price: number): string { … } // type the inputs
const count = 0 // inferred: number, no annotation needed
const names = products.map((p) => p.name) // inferred: string[]
```

**Rule:** always type function parameters and exported function return types. Let TypeScript infer local variables. Hover any variable in VS Code to see its type: this is the best way to understand unfamiliar code.

## Utility types

| Utility                         | Result                  | Example use         |
| ------------------------------- | ----------------------- | ------------------- |
| `Omit<Product, 'id'>`           | Product without `id`    | create payload      |
| `Partial<Product>`              | every field optional    | initial form values |
| `Pick<Product, 'id' \| 'name'>` | only those fields       | dropdown options    |
| `Record<string, number>`        | object with string keys | counts, lookups     |

One source of truth: change `Product` once and every derived type follows.

## Generics

A generic is a type with a placeholder. Read `<T>` as "of".

```ts
interface Paged<T> { items: T[]; total: number; page: number; size: number }

const page: Paged<Product> = … // "a page of products"
const list = ref<Product[]>([]) // "a ref of a product list"
```

In this repo: `Paged<T>` (`shared/types/api.ts`), `useSearch<T>()` (`app/composables/useSearch.ts`), the generic `<UiSelect>` component.

## Narrowing and `unknown`

```ts
try { … } catch (error: unknown) {
  if (error instanceof Error) console.error(error.message) // narrowed to Error
}
```

- `any` switches type checking **off**. `unknown` means "could be anything, check first". Prefer `unknown`.
- Narrow with `typeof`, `instanceof`, `'key' in obj`, or a type guard function (`value is X`). See `app/utils/errors.ts`.
- Avoid `as` casts. They tell the compiler to stop checking; the bug is still there.

## Types from schemas

```ts
export type ProductInput = z.infer<typeof productInputSchema>
```

Zod schemas produce TypeScript types, so the validation rules and the types can never drift apart (`shared/schemas/product.ts`).

## Common mistakes

- Using `any` to make an error go away. Find the real type instead (hover, or check the API response).
- Re-declaring the same shape in three places. Derive it with `Omit`, `Pick` or `z.infer`.
- Treating `status: string` as fine. If only two values are valid, say so in the type.
