# 05 · Tests

## Acceptance criteria

- [ ] Edge cases for `productInputSchema`: trimmed names, decimal prices, `stock: 1.5`, missing status.
- [ ] Tests for `loginSchema`.
- [ ] Tests for the server repository's `list()`: filtering, search on SKU, pagination boundaries (`server/utils/product-repository.ts`).
- [ ] If you built `useUnsavedChangesGuard` or a pagination helper, test its logic.
- [ ] `npm test` passes and each test name reads like a sentence.

## Stretch

Add `@nuxt/test-utils` and write one component test for `ProductCard` (renders the price, emits `select` with the id).

## Think about

Why test logic (schemas, composables, utils) before markup?
