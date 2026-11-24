# Inventory Admin — Vue & Nuxt Training

A small, realistic admin app used to learn **TypeScript, Vue 3, Nuxt 4, Tailwind CSS, Pinia, Zod and vee-validate**.
It is built the way a professional team would build it, so you can use it as a reference long after the training.

> **Goal:** after the training you can open an unfamiliar Vue/Nuxt codebase, find your way around it, and ship a feature on your own.

## Quick start

```bash
# Node 22+ (see .nvmrc)
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000 and sign in with a demo account:

| Account | Email                   | Password    | Can        |
| ------- | ----------------------- | ----------- | ---------- |
| Admin   | `admin@inventory.test`  | `admin123`  | everything |
| Viewer  | `viewer@inventory.test` | `viewer123` | read only  |

The API is a mock that lives in `server/`. Changes are kept in memory and reset when you restart `npm run dev`.

## Scripts

| Command                             | What it does                           |
| ----------------------------------- | -------------------------------------- |
| `npm run dev`                       | Start the dev server with hot reload   |
| `npm run build` / `npm run preview` | Production build and preview           |
| `npm run lint` / `npm run lint:fix` | ESLint (Nuxt config)                   |
| `npm run format`                    | Prettier                               |
| `npm run typecheck`                 | Type-check everything with `vue-tsc`   |
| `npm test`                          | Unit tests with Vitest                 |
| `npm run check`                     | lint + typecheck + test (what CI runs) |

## How the training works

| Step                          | Where                               |
| ----------------------------- | ----------------------------------- |
| 1. Read the topic guide       | [`docs/`](docs)                     |
| 2. Do the exercise            | [`exercises/`](exercises)           |
| 3. Compare with the reference | the `solution/*` branches           |
| 4. Keep practising at home    | [`exercises/home/`](exercises/home) |

### Branches

| Branch           | Contains                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `main`           | **Starter.** Mock API, UI kit, types, schemas, product list and detail. Exercise files are marked `TODO`.                     |
| `solution/day-1` | Day 1 exercise solved: typed `ProductCard`, `useSearch`, filters.                                                             |
| `solution/day-2` | Day 2 capstone solved: auth store, middleware, API layer, validated create form, permissions. Start home exercises from here. |

```bash
git switch main                # start here
git switch -c my/day-1         # do your work on your own branch
git diff main solution/day-1   # compare with the reference when you're done
```

## Project map

```
app/                    # the Vue/Nuxt application (Nuxt 4 "app" directory)
  assets/css/main.css   # Tailwind v4 entry + theme (@theme)
  components/ui/        # small design-system components → <UiButton>, <UiInput>…
  components/product/   # feature components → <ProductCard>, <ProductForm>…
  composables/          # reusable logic: useApi, useProducts, useSearch, useToast
  layouts/              # page frames: default (sidebar), auth (centered)
  middleware/           # route guards (auth.global.ts runs on every navigation)
  pages/                # file-based routes: pages/products/[id].vue → /products/42
  stores/               # Pinia stores (auth)
  types/                # app-only type declarations
  utils/                # pure helpers: cn, formatPrice, getErrorMessage
server/                 # mock backend (Nitro): api routes, data, utils
shared/                 # code used by BOTH app and server
  schemas/              # Zod schemas: one source of truth for validation
  types/                # TypeScript types: Product, User, Paged<T>…
tests/unit/             # Vitest tests
docs/                   # topic guides (read these)
exercises/              # exercise briefs with acceptance criteria
```

## Topic guides

1. [TypeScript](docs/01-typescript.md)
2. [Vue essentials](docs/02-vue-essentials.md)
3. [Nuxt](docs/03-nuxt.md)
4. [Styling: Tailwind + UI kit](docs/04-styling.md)
5. [State, API layer and auth](docs/05-state-and-api.md)
6. [Forms and validation](docs/06-forms-and-validation.md)
7. [Thinking like a senior](docs/07-senior-mindset.md)
8. [Confusing concepts, explained](docs/08-confusing-concepts.md)
9. [Reading an unfamiliar codebase](docs/09-reading-a-codebase.md)

## Tech stack

Nuxt 4 · Vue 3.5 · TypeScript 5 (strict) · Tailwind CSS 4 · Pinia · Zod 3 · vee-validate 4 · class-variance-authority · Vitest · ESLint · Prettier.

Recommended VS Code extensions are listed in `.vscode/extensions.json` (VS Code offers to install them).
