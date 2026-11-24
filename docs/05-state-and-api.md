# 5. State, API layer and auth

## Where does state live?

| Kind of state                    | Where                  | Example in this repo                         |
| -------------------------------- | ---------------------- | -------------------------------------------- |
| used by one component            | `ref` in the component | `statusFilter` in `pages/products/index.vue` |
| reusable logic, separate per use | composable             | `useSearch`                                  |
| shared by the whole app          | Pinia store            | `stores/auth.ts` (user, token, permissions)  |
| tiny app-wide UI state           | `useState`             | toasts in `useToast`                         |
| server data for one page         | fetched by the page    | the product list via `useFetch`              |

**Most data does not belong in a global store.** Server data belongs to the server: fetch it where you need it and refetch when it changes. Copying it into a store means keeping two versions in sync.

## Pinia

```ts
// app/stores/auth.ts (setup style)
export const useAuthStore = defineStore('auth', () => {
  const session = ref<Session | null>(null) // state
  const isAuthenticated = computed(() => Boolean(session.value)) // getter
  function logout() {
    session.value = null
  } // action
  return { isAuthenticated, logout }
})
```

- **Setup style** (above) and **options style** (`state`, `getters`, `actions` objects) are the same concepts written differently. You will meet both.
- Destructure with `storeToRefs(store)` to keep reactivity; call actions directly (`auth.logout()`).

If you know React: Pinia replaces Redux or Zustand, with no reducers or boilerplate.

## The API layer

Every request follows one path:

```
page / component  →  domain composable  →  API wrapper  →  network
products/new.vue  →  useProducts()      →  useApi()      →  POST /api/products
```

- **`useApi()`** (`app/composables/useApi.ts`) is the ONE place that knows the base URL, adds the `Authorization` header and handles `401`.
- **`useProducts()`** holds every product call, fully typed. Pages call `create(values)` and never see headers or URLs.
- Debugging a broken page? Trace it in that order, with the Network tab open.

## Auth concepts

- **Token:** proof of who you are, sent with each request (`Authorization: Bearer …`). Real apps use short-lived access tokens plus a refresh token; this repo uses a fake token.
- **Route guard:** `middleware/auth.global.ts` keeps signed-out users on `/login`.
- **Permission UI:** `v-if="auth.can('product.create')"` hides what the user can't do.
- **Hiding a button is not security.** The server checks every permission again (`server/utils/auth.ts`). Try it: sign in as the viewer and call `POST /api/products`; you get `403`.

### Where to keep the token

| Storage                      | Survives reload | Shared across tabs | Readable by JS (XSS risk) |
| ---------------------------- | --------------- | ------------------ | ------------------------- |
| memory only                  | no              | no                 | yes, briefly              |
| `sessionStorage` (this repo) | yes             | no                 | yes                       |
| `localStorage`               | yes             | yes                | yes                       |
| `httpOnly` cookie            | yes             | yes                | **no**                    |

There is no perfect answer; it's a trade-off. Know which one your project uses and why.

## Errors

- The server is the final judge. Show its answer: a field error (`409` duplicate SKU → under the SKU field) or a toast.
- Turn unknown errors into messages in one place: `getErrorMessage(error)` in `app/utils/errors.ts`.
