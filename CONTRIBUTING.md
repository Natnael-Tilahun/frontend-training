# Working in this repo

- **Branches:** `my/<topic>` for your work, e.g. `my/day-1`, `my/home-01-edit`. Never commit to `main` or `solution/*`.
- **Commits:** small and descriptive, in the imperative: "Add product status filter".
- **Before pushing:** `npm run check` (lint + typecheck + tests). CI runs the same plus a build.
- **Pull requests:** fill in the template. One exercise per PR.

## Conventions

| Thing                  | Convention                                         | Example                                                |
| ---------------------- | -------------------------------------------------- | ------------------------------------------------------ |
| Components             | PascalCase, grouped by feature                     | `components/product/ProductCard.vue`                   |
| UI kit                 | `components/ui/`, used with the `Ui` prefix        | `<UiButton>`                                           |
| Composables            | `useX`, one concern each                           | `useProducts`, `useSearch`                             |
| Stores                 | `useXStore`, only for app-wide state               | `useAuthStore`                                         |
| Types                  | `interface` for objects, `type` for unions/derived | `Product`, `ProductStatus`                             |
| Schemas                | `shared/schemas/`, `xSchema`, type via `z.infer`   | `productInputSchema`                                   |
| Server routes          | `name.<method>.ts`                                 | `products/index.post.ts`                               |
| Imports from `shared/` | explicit, via `#shared`                            | `import type { Product } from '#shared/types/product'` |

Formatting is automatic (Prettier on save). Don't argue about it in reviews.
