# 04 · Unsaved-changes guard

## Acceptance criteria

- [ ] Leaving the create or edit page with unsaved changes asks for confirmation.
- [ ] Works for in-app navigation (`onBeforeRouteLeave`) **and** closing or reloading the tab (`beforeunload`).
- [ ] No prompt after a successful save, or when nothing changed (vee-validate's `meta.dirty`).
- [ ] The logic lives in a reusable composable, e.g. `useUnsavedChangesGuard(isDirty: Ref<boolean>)`.

## Think about

How does the page learn that the form inside `ProductForm` is dirty? (Hint: an emit, `defineExpose`, or lifting `useForm` up. Pick one and justify it.)
