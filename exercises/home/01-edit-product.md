# 01 · Edit a product

Add `/products/:id/edit`, reusing `ProductForm`.

## Acceptance criteria

- [ ] New page `app/pages/products/[id]/edit.vue` (hint: you may need to move `[id].vue` to `[id]/index.vue`).
- [ ] Loads the product and passes it as `initialValues` to `<ProductForm submit-label="Save changes">`.
- [ ] Saves with `useProducts().update(id, values)` (add it if missing), shows a toast, returns to the detail page.
- [ ] "Edit" button on the detail page, only with `product.update`; the page itself protected with `definePageMeta`.
- [ ] Duplicate SKU (409) shows under the SKU field, like on create.
- [ ] Loading and "not found" states handled.

## Think about

Why should the form not know whether it is creating or editing?
