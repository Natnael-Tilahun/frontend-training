# 2. Vue essentials

## Single File Components

A `.vue` file holds logic (`<script setup lang="ts">`), markup (`<template>`) and optional scoped styles.
Old code may use the **Options API** (`data()`, `methods`, `computed: {}`): learn to read it, but write `<script setup>`.

## Template syntax

| Syntax                          | Purpose                             | Example                             |
| ------------------------------- | ----------------------------------- | ----------------------------------- |
| `{{ }}`                         | show a value                        | `{{ product.name }}`                |
| `:attr`                         | bind an attribute or prop           | `:product="p"`                      |
| `@event`                        | listen to an event                  | `@click="save"`                     |
| `v-if` / `v-else-if` / `v-else` | conditional rendering               | `v-if="status === 'pending'"`       |
| `v-show`                        | toggle visibility with CSS          | `v-show="isOpen"`                   |
| `v-for` + `:key`                | lists (always a stable, unique key) | `v-for="p in products" :key="p.id"` |
| `v-model`                       | two-way binding                     | `v-model="search"`                  |

## Reactivity: the four rules

```ts
const search = ref('')
const products = ref<Product[]>([])

const results = computed(() => products.value.filter((p) => p.name.includes(search.value)))

watch(search, (value) => console.log('searching for', value))
```

1. **`ref` for state.** Use `.value` in `<script>`; the template unwraps it for you.
2. **`computed` for anything derived** (filtered lists, totals, labels). It is cached and always correct.
3. **`watch` only for side effects** (calling an API, writing to storage). Never use a watch to copy one value into another; that is a `computed`.
4. **Mutating is fine.** `products.value.push(p)` updates the screen.

`reactive({ … })` also exists, for objects without `.value`. Many teams use only `ref` so every piece of state looks the same.

### If you know React

| React habit                              | In Vue                                                           |
| ---------------------------------------- | ---------------------------------------------------------------- |
| `setItems([...items, x])`                | `items.value.push(x)`                                            |
| `useEffect` to compute a value           | `computed`                                                       |
| `useMemo`, `useCallback`                 | not needed: Vue tracks dependencies itself                       |
| destructuring props or a reactive object | loses reactivity → use `props.name`, `toRefs()`, `storeToRefs()` |
| `value` + `onChange`                     | `v-model`                                                        |
| custom hooks                             | composables (no "rules of hooks")                                |
| `children`                               | `<slot />`                                                       |

## Components

```vue
<!-- app/components/product/ProductCard.vue -->
<script setup lang="ts">
defineProps<{ product: Product }>()
const emit = defineEmits<{ select: [id: number] }>()
</script>
```

- **Props go down, events go up.** A child never changes its props; it emits an event and the parent decides.
- `defineModel()` gives your own component `v-model` support (see `app/components/ui/Input.vue`).
- **Slots** let the parent pass content in (see `UiCard`, `UiFormField`).
- Lifecycle: `onMounted` for things that need the DOM, `onUnmounted` to clean up timers and listeners.

## Composables

A composable is a function named `useX()` that bundles reactive state and logic so several components can reuse it.

```ts
const { search, results } = useSearch(products, ['name', 'sku'])
```

Each call gets **its own** state. For state shared by the whole app, use a Pinia store (doc 05).

## Common mistakes

- Missing or index-based `:key` in `v-for` → wrong items update after deletes.
- `watch` + assignment instead of `computed`.
- Forgetting `.value` in script (comparing the ref object instead of its value).
- Huge components. If a file scrolls for pages, extract components and composables.
