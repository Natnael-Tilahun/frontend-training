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

What's in the kit:

| Component                                      | Use it for                                                       |
| ---------------------------------------------- | ---------------------------------------------------------------- |
| `UiPageHeader`                                 | The top of every page: back link, title, badge, actions          |
| `UiButton`                                     | Every button and button-styled link (`to`), with `loading`       |
| `UiInput`, `UiTextarea`, `UiSelect`            | Form controls; pair them with `UiFormField` for label and error  |
| `UiCard`, `UiBadge`, `UiAlert`, `UiEmptyState` | Surfaces, status labels, errors and the empty states of a screen |
| `UiAvatar`, `UiLogo`, `UiSpinner`              | Small building blocks used by the layout                         |

**Icons** come from [Lucide](https://lucide.dev/icons/) (`lucide-vue-next`). Import each icon you use, so only those end up in the bundle:

```vue
<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
</script>

<template>
  <UiButton to="/products/new"><Plus /> Add product</UiButton>
</template>
```

Inside `UiButton`, icons are sized automatically. Elsewhere, give them a size (`class="size-4"`) and `aria-hidden="true"` when they are decoration next to text.

## When to extract a component

- The same group of classes appears in 3+ places → make a component (or a variant).
- A single long class list is fine. Readability matters more than shortness.
- Don't invent a new button style per page. Add a variant to `UiButton` instead.

## Accessibility basics (always)

- Every input has a `<label>` (see `UiFormField`) or an `aria-label`.
- Buttons are `<button>`, links are `<NuxtLink>`. Never a clickable `<div>`.
- A whole card can be clickable without a clickable `<div>`: keep one real `<button>` inside and stretch it over the card with `after:absolute after:inset-0` (see `ProductCard`).
- Visible focus styles (`focus-visible:`) are kept, not removed.
