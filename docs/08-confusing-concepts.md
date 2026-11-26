# 8. Confusing concepts, explained

Short answers to the questions people ask most when they start with this stack. The most confusing ones are explained step by step, with examples, in [In depth](#in-depth) below.

**Why `.value` in script but not in the template?**
A `ref` is a box around a value. In script you open the box (`count.value`). The template opens it for you.

**`ref` vs `reactive`?**
Both are reactive. `ref` works for any value and needs `.value`; `reactive` works only for objects and breaks if you replace or destructure it. Default to `ref`.

**`computed` vs `watch`?**
`computed` produces a value from other values. `watch` _does something_ when a value changes (API call, storage). If you're assigning inside a watch, you probably wanted `computed`.

**Why does destructuring break reactivity?**
`const { name } = props` copies the current value out of the reactive object; later changes don't reach the copy. Use `props.name`, `toRefs(props)`, or `storeToRefs(store)`.

**Props vs `v-model` vs emit?**
Props: parent → child data. Emit: child → parent "something happened". `v-model` is shorthand for a prop (`modelValue`) plus an emit (`update:modelValue`), written with `defineModel()`.

**Composable vs Pinia store?**
A composable gives each caller its **own** state. A store is **one** shared instance for the whole app.

**`useFetch` vs `useAsyncData` vs `$fetch`?**
`useFetch(url)` = `useAsyncData` + `$fetch` for a URL. `useAsyncData(key, fn)` runs your own function. Both give loading/error state and are for **loading page data**. `$fetch` is a plain request for **actions** like save and delete.

**Where did this component/function come from? There's no import.**
Nuxt auto-imports `app/components`, `app/composables`, `app/utils` and Vue/Nuxt APIs. Ctrl/Cmd + click it, or check `.nuxt/imports.d.ts` and `.nuxt/components.d.ts`.

**`pages/` at the root or in `app/`?**
Nuxt 3 → root. Nuxt 4 → `app/`. Same concepts.

**SSR vs SPA, and why does `window is not defined` happen?**
With SSR, your code also runs on the server, where there is no `window` or `localStorage`. Guard browser-only code (`import.meta.client`, `onMounted`). This repo is an SPA (`ssr: false`), so it doesn't hit that.

**`runtimeConfig` vs `runtimeConfig.public` vs `.env`?**
`.env` provides values locally. `runtimeConfig` keys stay on the server; `public` keys go to the browser, where anyone can read them.

**Is a value injected at build time secret?**
No. If it ends up in the JavaScript bundle, anyone can read it in DevTools.

**`interface` vs `type`?**
Almost interchangeable for objects. `type` is required for unions (`'a' | 'b'`) and mapped types. Pick a convention and stay consistent.

**`any` vs `unknown`?**
`any` disables checking. `unknown` forces you to check before use. Always prefer `unknown`.

**Tailwind `tailwind.config.js` or `@theme`?**
v3 uses the config file; v4 uses `@theme` in CSS. Same utilities in templates.

**Why validate on the server if the form already validates?**
Anyone can call the API directly, skipping your form. Frontend validation is for a good experience; backend validation is for correctness and security.

**Why is my list updating the wrong row after a delete?**
Your `v-for` key is the index or missing. Use a stable id: `:key="item.id"`.

## In depth

### `?.` and `??`

**`?.` (optional chaining) means "stop if there's nothing here".** Reading a property of `undefined` or `null` normally crashes. `?.` checks the value on its left: if it's `null` or `undefined`, the expression stops and returns `undefined`.

```ts
const user = undefined
user.name // 💥 TypeError: Cannot read properties of undefined
user?.name // ✅ undefined, no crash

product?.category?.name // nested: stops at the first missing piece
products?.[0] // first item, if the array exists
onSave?.() // call the function only if it was passed
```

You'll see it most with data that hasn't loaded yet: `useFetch` gives `data`, which is `undefined` until the request finishes, so you write `data.value?.items`.

Don't use `?.` to hide a bug. It says "missing is normal here". If missing would be a bug, let it crash so you find it.

**`??` (nullish coalescing) means "use this default only if the value is missing".**

```ts
const name = user?.name ?? 'Guest' // the user's name, or 'Guest' if there isn't one
```

The two usually go together: `?.` reaches safely, `??` gives a fallback. From `app/pages/products/index.vue`:

```ts
const products = computed(() => data.value?.items ?? [])
//                           reach safely ↑       ↑ fallback: empty list
```

The template can now loop over `products` without ever checking for `undefined`.

### `??` vs `||`

Both give a fallback. The difference is **what counts as missing**:

| Operator | Uses the fallback when the value is…                                |
| -------- | ------------------------------------------------------------------- |
| `\|\|`   | any **falsy** value: `false`, `0`, `''`, `NaN`, `null`, `undefined` |
| `??`     | only `null` or `undefined`                                          |

```ts
const stock = 0
stock || 10 // 10 ❌ 0 is a real stock count, but || treats it as missing
stock ?? 10 // 0  ✅

const showHelp = false
showHelp || true // true  ❌ the user turned it off, we turned it back on
showHelp ?? true // false ✅
```

Use `??` for defaults: numbers, booleans and settings are real values even when they are `0`, `false` or `''`. Use `||` only when you really mean "anything empty-looking", for example treating an empty search string as no search.

In one line: **`||` asks "is it truthy?", `??` asks "does it exist?".**

### `any` vs `unknown`, and `as`

**`any` turns the checker off.** Nothing is checked, and it spreads to everything you assign from it. ESLint in this repo makes `any` an error.

```ts
const data: any = JSON.parse(text)
data.foo.bar.baz() // no error while writing… a crash at runtime
```

**`unknown` means "could be anything, check before you use it".** You can store and pass it, but not use it until you **narrow** it:

```ts
const data: unknown = JSON.parse(text)
data.name // ❌ error: 'data' is of type 'unknown'

if (typeof data === 'object' && data !== null && 'name' in data) {
  data.name // ✅ you proved it has a name
}
```

| Check                   | After it, TypeScript knows…   |
| ----------------------- | ----------------------------- |
| `typeof x === 'string'` | it's a string                 |
| `Array.isArray(x)`      | it's an array                 |
| `x instanceof Error`    | it's an Error                 |
| `'name' in x`           | it has a `name` property      |
| `schema.parse(x)` (Zod) | it matches the schema exactly |

Errors in a `catch` are `unknown`, because anything can be thrown. That's why `getErrorMessage(error: unknown)` in `app/utils/errors.ts` checks what it got before reading `.message`.

Think of `any` as letting a stranger into the building without checking ID, and `unknown` as asking them to wait at reception until you've checked.

**`as` means "trust me, I know better".** A type assertion changes what TypeScript _believes_, not what the value _is_. Nothing is checked or converted at runtime:

```ts
const product = JSON.parse(text) as Product // if it's not a Product, the bug shows up later
```

`as` is fine when you genuinely know more than TypeScript (`as const`, a DOM element you know exists, tests). Never use it to make an error disappear, and never on data from outside the app (API, form, localStorage): **validate** that with Zod, which checks for real and gives you the right type.

| Tool      | Checking                  | Use                        |
| --------- | ------------------------- | -------------------------- |
| `any`     | none                      | avoid                      |
| `unknown` | you must check before use | prefer                     |
| `as`      | none, just your promise   | rarely, never outside data |

### `import type` and `z.infer`

**Types only exist while you write code.** When the app is built, TypeScript is removed and the browser runs plain JavaScript. So `import type` says "I only need this for type-checking; remove the import completely when building":

```ts
import type { Product } from '#shared/types/product' // type: erased at build
import { formatPrice } from '~/utils/format' // value: real code, kept
```

- A reader sees at once that it's only a type.
- It can never pull a file's code into the browser bundle by accident.
- Build tools that compile one file at a time don't have to guess whether `Product` is a type or a value.

If you try to use a type-only import as a value (`new Product()`), TypeScript stops you.

**`z.infer<typeof schema>` gets the type from the schema**, so you describe your data once instead of twice (a type _and_ validation rules that slowly drift apart):

```ts
export const productInputSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().positive(),
  status: z.enum(['active', 'archived']),
})

export type ProductInput = z.infer<typeof productInputSchema>
// → { name: string; price: number; status: 'active' | 'archived' }
```

- `productInputSchema` is a **value**: a real object that checks data at runtime.
- `typeof productInputSchema` asks TypeScript for **the type of that value**.
- `z.infer<…>` turns "a schema that checks X" into "the type X".

The schema is a mould; `z.infer` reads the shape off the mould. Change the mould and the type follows. In this repo, one schema in `shared/schemas/product.ts` drives the **form** (vee-validate), the **server** (`readValidatedBody`) and the **types** (`ProductInput`).

### Reactivity: `ref`, `computed`, `watch`

**Reactivity** means "when data changes, everything that depends on it updates automatically". You never tell Vue to re-render: you change the data. It works like a spreadsheet: change cell A1 and every formula using A1 recalculates.

**`ref` is a box Vue watches.**

```ts
const count = ref(0)
count.value++ // in <script>: open the box with .value
```

```vue
<p>{{ count }}</p>
<!-- in <template>: Vue opens the box for you -->
```

JavaScript can't notice when a plain variable changes, but Vue notices every read and write of `.value`: a **read** records who depends on the box, a **write** updates them. Forgetting `.value` in script is the most common first-week mistake (`count++`, `if (count > 5)`); TypeScript catches most of them. A `ref` of an array is deeply reactive: `items.value.push(x)` works, no copying needed.

**`computed` is a formula.**

```ts
const visibleProducts = computed(() =>
  products.value.filter((p) => p.name.toLowerCase().includes(search.value.toLowerCase())),
)
```

- It describes **how a value is derived** from other values.
- It recalculates **only when something it uses changes** (`products` or `search`).
- It is **cached**: read it ten times, it computes once.
- It is **read-only**: change its inputs, not the result.

Use it for filtered or sorted lists, totals, labels, "is the form valid", "can the user edit".

**`watch` is an alarm.** It runs _your code_ when a value changes, for **side effects** outside the state: saving to localStorage, calling an API, updating the URL, focusing an input.

```ts
watch(search, (value) => localStorage.setItem('lastSearch', value))
```

**The classic mistake** is a `watch` that keeps a copy in sync:

```ts
// ❌ extra state, briefly out of sync, needs `immediate: true` to run the first time
const visibleProducts = ref<Product[]>([])
watch([products, search], () => {
  visibleProducts.value = products.value.filter(/* … */)
})

// ✅ the same thing, correctly
const visibleProducts = computed(() => products.value.filter(/* … */))
```

Calculating a value → `computed`. Doing something → `watch`. **Derive, don't sync.**

| React                                 | Vue                                                       |
| ------------------------------------- | --------------------------------------------------------- |
| `useState`                            | `ref`                                                     |
| `useMemo`                             | `computed`: dependencies are tracked, no dependency array |
| `useEffect`                           | `watch` / `watchEffect`                                   |
| the component re-runs on every render | `<script setup>` runs **once**; only what changed updates |

### `toRef`, `toRefs` and `storeToRefs`

All three solve one problem: **destructuring breaks reactivity.**

```ts
const state = reactive({ count: 0 })
let { count } = state // copies the current number (0) out of the box
state.count++ // state.count is 1… but `count` is still 0
```

Destructuring takes a photo of a clock: right when you took it, never moving again. The same happens with a Pinia store, because a store is a reactive object: `const { user } = useAuthStore()` is a snapshot that never updates after login or logout.

**`toRef` makes one live link to one property**, like a video feed instead of a photo. It works both ways:

```ts
const count = toRef(state, 'count')
state.count++ // count.value is 1 ✅
count.value = 5 // state.count is 5 ✅
```

Useful for props too: `toRef(props, 'id')` gives a ref you can pass to a composable.

**`toRefs` does it for every property at once:**

```ts
const { count, name } = toRefs(state) // both are live refs
```

**`storeToRefs` is the Pinia version, and the one you'll use most:**

```ts
const auth = useAuthStore()
const { user, isAuthenticated } = storeToRefs(auth) // ✅ state and getters as live refs
const { login, logout } = auth // ✅ actions: destructure directly
```

Why not `toRefs(auth)`? A store also holds actions and internal Pinia properties. `storeToRefs` picks only the state and getters. Functions never change, so they don't need to be refs.

| You want…                                        | Use                  |
| ------------------------------------------------ | -------------------- |
| a single reactive value                          | `ref`                |
| a value calculated from others                   | `computed`           |
| to _do_ something when a value changes           | `watch`              |
| one property of a reactive object as a live ref  | `toRef(obj, 'key')`  |
| all properties of a reactive object as live refs | `toRefs(obj)`        |
| state and getters from a store, destructured     | `storeToRefs(store)` |
| actions from a store                             | destructure normally |

Or don't destructure at all: `auth.user` and `auth.login()` are always reactive. Most of this repo does exactly that.
