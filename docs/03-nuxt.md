# 3. Nuxt

Nuxt is to Vue what Next.js is to React: routing, data fetching, a server and the build setup, driven by **folder conventions**.

## Folders (Nuxt 4)

| Folder                           | What it does                                                   |
| -------------------------------- | -------------------------------------------------------------- |
| `app/pages/`                     | each file is a route                                           |
| `app/layouts/`                   | page frames (sidebar, header)                                  |
| `app/components/`                | auto-imported components (`ui/Button.vue` → `<UiButton>`)      |
| `app/composables/`, `app/utils/` | auto-imported functions                                        |
| `app/middleware/`                | runs before navigation                                         |
| `app/plugins/`                   | runs once when the app starts                                  |
| `server/api/`                    | backend routes (`products/index.get.ts` → `GET /api/products`) |
| `shared/`                        | code used by both app and server                               |
| `nuxt.config.ts`                 | the main configuration                                         |

> **Nuxt 3 vs 4:** Nuxt 3 projects keep `pages/`, `components/`… at the project root. Nuxt 4 moves them into `app/`. The concepts are identical.

## Routing

| File                                    | URL                                            |
| --------------------------------------- | ---------------------------------------------- |
| `app/pages/index.vue`                   | `/`                                            |
| `app/pages/products/index.vue`          | `/products`                                    |
| `app/pages/products/new.vue`            | `/products/new`                                |
| `app/pages/products/[id].vue`           | `/products/42`                                 |
| `app/pages/products/(details)/[id].vue` | `/products/42`. A `(folder)` only groups files |

```ts
const route = useRoute()
const id = Number(route.params.id) // params are always strings
await navigateTo('/products')
```

`definePageMeta({ layout: 'auth', permission: 'product.create' })` attaches settings to a page.

## Middleware

`app/middleware/auth.global.ts` runs before **every** navigation (the `.global` suffix). It redirects signed-out users to `/login` and checks page permissions.

## Auto-imports: "where does this come from?"

`ref`, `computed`, `useFetch`, your composables and components work without import lines. To trace something:

1. Ctrl/Cmd + click the name in VS Code.
2. Look in `.nuxt/imports.d.ts` (functions) or `.nuxt/components.d.ts` (components).
3. A prefix such as `Ui` in `UiButton` maps to a folder: `components/ui/`.

## Data fetching

| Tool                    | Use it for                                                          |
| ----------------------- | ------------------------------------------------------------------- |
| `useFetch(url)`         | loading data for a page: gives `data`, `status`, `error`, `refresh` |
| `useAsyncData(key, fn)` | same, with your own function (e.g. `useProducts().list`)            |
| `$fetch(url)`           | requests in event handlers: save, delete                            |

Every screen that loads data handles **loading, error, empty and success**. See `app/pages/products/index.vue`.

## Rendering modes

| Mode          | Setting         | Good for                               |
| ------------- | --------------- | -------------------------------------- |
| SSR (default) | `ssr: true`     | public sites, SEO, fast first paint    |
| SPA           | `ssr: false`    | admin tools behind a login (this repo) |
| Static        | `nuxt generate` | sites that can be built ahead of time  |

## Config and environment variables

- `.env` holds local values and is **never committed**. `.env.example` documents them.
- `runtimeConfig` keys are server-only; `runtimeConfig.public` keys are sent to the browser.
- Override them with environment variables: `NUXT_MOCK_LATENCY_MS`, `NUXT_PUBLIC_APP_NAME`.

> **Golden rule:** anything that reaches the browser can be read by anyone, including values baked in at build time. Real secrets live on a server.
