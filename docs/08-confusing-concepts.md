# 8. Confusing concepts, explained

Short answers to the questions people ask most when they start with this stack.

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
