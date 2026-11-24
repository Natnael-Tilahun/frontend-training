# 7. Thinking like a senior

Seniors are not people who know more syntax. They make decisions that keep code easy to change, and they can explain why.
These habits will help you on every project, in any framework.

## Principles

1. **Single source of truth.** One schema → form rules, server rules and types. One `Product` type → everything derives from it. Duplicated knowledge always drifts.
2. **Derive, don't sync.** If a value can be calculated from other state, make it `computed`. Every `watch` that copies data is a future bug.
3. **One place for each concern.** API details in `useApi`, product calls in `useProducts`, formatting in `utils/format.ts`. When something changes, you change one file.
4. **Make invalid states impossible.** `status: 'active' | 'archived'` instead of `string`; `Permission` union instead of free text.
5. **Handle every state.** Loading, error, empty, success, and "no permission". The happy path is maybe 30% of the work.
6. **The server is the source of truth for security and data.** UI checks are for experience, not protection.
7. **Readable beats clever.** Code is read ten times more than it is written. Name things for what they mean (`visibleProducts`, not `arr2`).

## Decisions you will be asked to make

| Question                              | Default answer                               | When to choose otherwise                                   |
| ------------------------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| Component state, composable or store? | the smallest scope that works                | share only when 2+ distant places need the same live state |
| `ref` or `reactive`?                  | `ref` everywhere                             | a local object you never replace or destructure            |
| SSR or SPA?                           | SPA for internal tools behind login          | SEO, public pages, fast first paint                        |
| `useFetch` or `$fetch`?               | `useFetch`/`useAsyncData` to load page data  | `$fetch` inside event handlers (save, delete)              |
| Extract a component?                  | when it has its own job, or repeats 3+ times | not just to make a file shorter                            |
| Add a library?                        | only if it saves real work and is maintained | write the 10-line helper yourself                          |
| `any`?                                | never                                        | use `unknown` and narrow                                   |

When you make a non-obvious decision, write one comment saying **why**, not what.

## Code review checklist

Use it on your own PR before asking someone else.

- [ ] Types: no `any`, no unnecessary `as`, types derived not duplicated
- [ ] Reactivity: derived values are `computed`; watchers only for side effects
- [ ] States: loading, error, empty handled
- [ ] Permissions: UI checks match server rules
- [ ] Components: one job each; props down, events up
- [ ] Naming: a reader understands it without asking you
- [ ] No leftover `console.log`, commented-out code or TODOs without an owner
- [ ] `npm run check` passes

## Working habits

- **Small PRs.** One task per branch; a PR that can be reviewed in 15 minutes.
- **A PR description that helps:** what changed, why, how to test it, screenshots for UI.
- **Read before you write.** Find how the codebase already solves a problem and follow that pattern, even if you'd do it differently. Consistency beats personal preference.
- **Ask good questions:** what you tried, what you expected, what happened, where you looked.
- **Leave it cleaner.** Fix the small thing you touched, not the whole file.
- **Debug systematically:** reproduce → isolate (page, composable, API, data?) → read the actual error → fix the cause, not the symptom.
