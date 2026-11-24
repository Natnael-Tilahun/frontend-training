# 9. Reading an unfamiliar codebase

The skill that lets you join any project on your own. Spend your first hours reading, not writing.

## The 8-step checklist

1. **`package.json`**: framework and versions (Nuxt 3 or 4? Tailwind 3 or 4? Zod 3 or 4?), and the scripts (`dev`, `build`, `lint`, `test`).
2. **README and docs** (also `CLAUDE.md`, `CONTRIBUTING.md`, `docs/`): setup, `.env` variables, conventions.
3. **`nuxt.config.ts`**: SSR or SPA, modules, runtime config, aliases, how components are registered.
4. **`pages/`**: the map of every screen and URL.
5. **Trace one feature end to end:** page → composable → API wrapper → store → schema → types. Pick a simple one first.
6. **Find the shared pieces:** the API wrapper, auth store, middleware, permission helpers, the UI kit. Most features reuse them.
7. **`git log -- path/to/folder`**: how and why a part changed, and who knows it.
8. **Run it with DevTools open:** the Network tab shows real requests and responses; Vue DevTools shows components, props and Pinia state.

## Questions to answer before your first task

- How does a page get its data? (`useFetch`, a composable, a store?)
- Where are auth headers added, and what happens on 401?
- How are permissions checked in the UI?
- Where do validation schemas live?
- Which UI components already exist? (Don't build a second button.)
- How do I run lint, typecheck and tests, and does CI run them?

## Practice on this repo

1. Which file renders `/products/42`?
2. Where does the product list get its data from?
3. Which components come from `components/ui/`, and how can you tell from the template?
4. What happens, step by step, when a signed-out user opens `/products/new`?
5. Where would you add a new field `category` so that the form, the server and the types all know it?

## Tips

- Follow the existing patterns, even if you'd do it differently. Raise improvements separately.
- Keep a personal notes file while you explore: names, paths, gotchas. It becomes your onboarding doc for the next person.
- Use editor search across the project for a visible text on screen ("Add product") to find the component that renders it.
