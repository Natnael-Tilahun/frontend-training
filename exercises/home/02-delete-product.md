# 02 · Delete with confirmation

## Acceptance criteria

- [ ] A reusable `UiConfirmDialog` (use the native `<dialog>` element) with title, message, confirm and cancel. The confirm button uses the `danger` variant.
- [ ] "Delete" on the detail page, only with `product.delete`.
- [ ] Confirm → `useProducts().remove(id)` → toast → back to `/products`.
- [ ] The confirm button shows a loading state and can't be clicked twice.
- [ ] Errors from the API are shown in a toast; the dialog stays open.

## Think about

What should happen if the product was already deleted by someone else (404)?
