# Day 2 capstone: create product, end to end

**Starts from:** `solution/day-1` (or your Day 1 branch) · **Topics:** Nuxt, Pinia, API layer, auth, Zod + vee-validate
**Read first:** [03 Nuxt](../docs/03-nuxt.md), [05 State and API](../docs/05-state-and-api.md), [06 Forms](../docs/06-forms-and-validation.md)

**Warm-up (10 min):** answer the practice questions in [09 Reading a codebase](../docs/09-reading-a-codebase.md) for this repo before writing code.

## What exists already

- The mock API: `POST /api/auth/login`, `GET/POST /api/products`, `GET/PUT/DELETE /api/products/:id` (see `server/api/`).
- Schemas and types: `shared/schemas/auth.ts`, `shared/schemas/product.ts`, `shared/types/*`.
- UI kit: `UiFormField`, `UiInput`, `UiSelect`, `UiTextarea`, `UiButton`, `UiAlert`, toasts via `useToast()`.
- Stub pages marked `TODO (Day 2)`: `app/pages/login.vue`, `app/pages/products/new.vue`.

## Core

- [ ] **Auth store** `app/stores/auth.ts`: `user`, `token`, `isAuthenticated`, `can(permission)`, `login(credentials)`, `logout()`. Keep the session in `sessionStorage`.
- [ ] **Login page:** a vee-validate form using `loginSchema`; shows field errors and the server's "Wrong email or password".
- [ ] **Middleware** `app/middleware/auth.global.ts`: signed-out users go to `/login?redirect=…`; after login they return there.
- [ ] **API layer:** `useApi()` (base URL, `Authorization` header, logout on 401) and a typed `useProducts()` with `list`, `get`, `create`.
- [ ] **Product form** `app/components/product/ProductForm.vue` using `productInputSchema`, with an `action` prop so it can be reused for editing later.
- [ ] **Create page:** submit → API → success toast → go to the new product's page.
- [ ] **Permissions:** "Add product" visible only with `product.create`; `/products/new` protected by `definePageMeta({ permission: 'product.create' })`.
- [ ] Show the sign-in name and a "Sign out" button in the layout header.

## Stretch

- [ ] Show the server's duplicate-SKU error (409) **under the SKU field** with `setFieldError`.
- [ ] Sign in as the viewer and prove the API returns 403 even if you call it from the console.
- [ ] Type the custom page meta (`app/types/page-meta.d.ts`) so `permission` autocompletes.

## Hints

- `$fetch.create({ baseURL, onRequest, onResponseError })` builds a configured fetch function once.
- `const { user } = storeToRefs(useAuthStore())` keeps reactivity.
- `handleSubmit(async (values) => …)`: `values` is already typed as `ProductInput`.

## Done when

Both demo users behave correctly, `npm run check` passes, and you can draw the request path: page → `useProducts` → `useApi` → `/api/products`.
