# 03 · Server-side search and pagination

Today the list loads 100 products and filters in the browser. Real data doesn't fit in one request.

## Acceptance criteria

- [ ] The list uses `useAsyncData` + `useProducts().list({ page, size, q, status })`.
- [ ] Search, status and page live in the **URL** (`/products?q=mouse&status=active&page=2`), so refresh and back/forward work and links can be shared.
- [ ] Search is debounced (~300 ms) so typing doesn't fire a request per key.
- [ ] Changing search or status resets to page 1.
- [ ] A `UiPagination` component shows "Showing 11–20 of 42", previous/next, and disables buttons at the ends.
- [ ] The API counts pages from 1. Check your maths with 0 results, 1 result and exactly 10 results.

## Think about

Which state now belongs to the URL, which to the component, and why not a Pinia store?
