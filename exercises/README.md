# Exercises

| #     | Exercise                                                | Starts from                           | Reference solution                               |
| ----- | ------------------------------------------------------- | ------------------------------------- | ------------------------------------------------ |
| Day 1 | [Typed, searchable product list](day-1-product-list.md) | `main`                                | `solution/day-1`                                 |
| Day 2 | [Create product, end to end](day-2-create-product.md)   | `solution/day-1` (or your Day 1 work) | `solution/day-2`                                 |
| Home  | [Home exercises](home/README.md)                        | `solution/day-2` (or your Day 2 work) | none: compare with a colleague, ask for a review |

## How to work

1. Create your own branch: `git switch -c my/day-1`.
2. Search the code for `TODO (Day 1)` / `TODO (Day 2)`: they mark where to work.
3. Do the **Core** tasks first. **Stretch** tasks are optional.
4. Before you call it done, run `npm run check` (lint, typecheck, tests) and go through the review checklist in [`docs/07-best-practices.md`](../docs/07-best-practices.md).
5. Compare with the reference: `git diff solution/day-1 -- app/`. Different is fine; understand _why_ it's different.
