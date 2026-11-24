# 06 · Inventory dashboard

Add a `/dashboard` page and a sidebar link.

## Acceptance criteria

- [ ] Stat cards: number of active products, total stock value (price × stock), products out of stock.
- [ ] A "Low stock" list (stock ≤ 5) linking to each product.
- [ ] All numbers are `computed` from one fetched list; no duplicated state.
- [ ] Calculations live in typed, pure functions in `app/utils/` with unit tests.
- [ ] Responsive: cards stack on small screens.

## Think about

Should these numbers be calculated in the browser or by a new API endpoint? When would you change your answer?
