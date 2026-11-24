# 4. Styling: Tailwind CSS and the UI kit

## Tailwind: small classes in the template

```vue
<div class="flex items-center justify-between gap-4 rounded-xl border p-4 hover:shadow-md md:p-6">
```

| Concept                    | Examples                                            |
| -------------------------- | --------------------------------------------------- |
| spacing, sizing            | `p-4`, `mt-2`, `w-full`, `size-4`                   |
| layout                     | `flex`, `items-center`, `grid sm:grid-cols-2 gap-4` |
| typography                 | `text-sm`, `font-semibold`, `text-slate-500`        |
| states                     | `hover:`, `focus-visible:`, `disabled:`             |
| breakpoints (mobile first) | `sm:`, `md:`, `lg:`: "from this width **up**"       |

## Theme

> **Tailwind v3 vs v4:** v3 projects configure colours in `tailwind.config.js`. v4 (this repo) does it in CSS with `@theme`.

```css
/* app/assets/css/main.css */
@theme {
  --color-brand-600: #187a50; /* → bg-brand-600, text-brand-600, border-brand-600 */
}
```

Use theme colours (`bg-brand-600`), not one-off hex values (`bg-[#187a50]`), so the look stays consistent.

## The UI kit (`app/components/ui`)

This follows the **shadcn-vue** idea: small components that live **in your project**, which you own and can change. It is not a package.

- `cva` (class-variance-authority) defines variants: `<UiButton variant="secondary" size="sm">`.
- `cn()` (`app/utils/cn.ts`) merges classes and resolves conflicts: `cn('px-2', 'px-4')` → `'px-4'`.
- Components accept a `class` prop so callers can adjust spacing without forking the component.

## When to extract a component

- The same group of classes appears in 3+ places → make a component (or a variant).
- A single long class list is fine. Readability matters more than shortness.
- Don't invent a new button style per page. Add a variant to `UiButton` instead.

## Accessibility basics (always)

- Every input has a `<label>` (see `UiFormField`) or an `aria-label`.
- Buttons are `<button>`, links are `<NuxtLink>`. Never a clickable `<div>`.
- Visible focus styles (`focus-visible:`) are kept, not removed.
