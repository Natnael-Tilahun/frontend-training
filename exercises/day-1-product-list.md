# Day 1 exercise: a typed, searchable product list

**Starts from:** `main` · **Topics:** TypeScript, template syntax, reactivity, components, composables
**Read first:** [01 TypeScript](../docs/01-typescript.md), [02 Vue essentials](../docs/02-vue-essentials.md)

You don't need to understand Nuxt yet. Work only in the files listed below; the data already loads.

## Files

- `app/pages/products/index.vue`: the list page (`TODO (Day 1)`)
- `app/components/product/ProductCard.vue`: create it
- `app/composables/useSearch.ts`: create it (stretch)
- `shared/types/product.ts`: the `Product` type you'll use everywhere

## Core

- [ ] Create `ProductCard.vue` with a **typed** prop `product: Product`. Show the name, SKU, price (`formatPrice`), stock (`<ProductStockLabel>`) and status (`<ProductStatusBadge>`). `<ProductCardSkeleton>` shows the card shape while loading.
- [ ] Give the card a **typed** event `select: [id: number]` and a "View" button that emits it. The page navigates to `/products/:id` when it hears the event.
- [ ] Render the list with `v-for` and a proper `:key`.
- [ ] Add a search box (`<UiInput v-model="search">`) that filters by name with `computed`, not `watch`.
- [ ] No `any` anywhere. `npm run typecheck` passes.

## Stretch

- [ ] Move search into a generic composable `useSearch<T>(items: Ref<T[]>, keys: (keyof T)[])` that searches name **and** SKU.
- [ ] Add a status filter (`<UiSelect>`) typed as `ProductStatus | 'all'`.
- [ ] Show "No products match your filters" with `<UiEmptyState>` when nothing matches.
- [ ] Write a unit test for `useSearch` in `tests/unit/useSearch.test.ts` (import `ref` from `'vue'`).

## Hints

- Hover `data` in the page to see its type: `Paged<Product> | undefined`. That's why there is a `?? []`.
- Derived list = `computed`. If you write `watch(search, …)` and assign something inside, stop and use `computed`.
- `defineEmits<{ select: [id: number] }>()` is the typed-event syntax.

## Done when

`npm run check` passes, search and filter work, and you can explain why `visibleProducts` is a `computed`.
