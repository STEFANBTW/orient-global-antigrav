---
description: Rules for making any styling changes to Orient CMS components
---

# Styling Rules for Orient CMS

// turbo-all

## Core Principle: CSS Variables First

**Every color, shadow, spacing token, and visual property applied to any component MUST be driven by a CSS variable defined in the global stylesheet (`index.css`).**

Never use hardcoded color values (e.g., `bg-[#ff7300]`, `text-slate-500`, `bg-white`) directly in component JSX. Instead:

1. Define the variable in `index.css` under the appropriate theme scope.
2. Reference it in the component via inline `style={{ color: 'var(--your-variable)' }}`.

---

## Where to Define Variables

All CSS variables live in **`index.css`** under `@layer base` inside the appropriate theme scope class:

| Scope Class     | Purpose                                     |
|-----------------|---------------------------------------------|
| `.dark`         | Global dark mode overrides (main public site) |
| `.admin-theme`  | Admin dashboard-specific overrides           |
| `.login-theme`  | Login page-specific overrides                |

If a new page or component needs its own distinct palette, create a **new scoped class** (e.g., `.settings-theme`) following the same pattern.

---

## Variable Naming Convention

Variables MUST follow this pattern:

```
--{scope}-{element}-{property}
```

### Examples:
- `--login-bg` → Login page background
- `--login-card-border` → Login card border color
- `--login-btn-hover-text` → Login button text color on hover
- `--admin-sidebar-bg` → Admin sidebar background

---

## How to Apply Variables in Components

### ✅ Correct — Using inline styles with CSS variables:
```tsx
<div style={{ background: 'var(--login-bg)', color: 'var(--login-text)' }}>
```

### ❌ Wrong — Hardcoded Tailwind classes or hex values:
```tsx
<div className="bg-white text-slate-900">
<div className="bg-[#ffffff] text-[#0f172a]">
```

### ✅ Acceptable — Tailwind for layout/spacing/animation only:
```tsx
<div className="flex items-center gap-3 rounded-2xl p-4 transition-all">
```

Tailwind utility classes are fine for **layout**, **spacing**, **border-radius**, **flex**, **animations**, and **transitions** — just NOT for colors.

---

## Step-by-Step Workflow for Any Styling Change

1. **Identify the component** and its theme scope (e.g., `.login-theme`, `.admin-theme`).
2. **Check `index.css`** for existing CSS variables that may already cover the property.
3. **If a variable exists**, reference it in the component via `style={{ prop: 'var(--variable-name)' }}`.
4. **If no variable exists**, define a new one in `index.css` under the correct theme scope, following the naming convention.
5. **Apply it in the component** via inline styles.
6. **Never commit hardcoded color values** in component JSX. All colors flow from `index.css`.

---

## File Reference

- **Global CSS**: `index.css` (root of project)
- **Login Page**: `src/app/login/page.tsx` (uses `.login-theme`)
- **Dashboard Layout**: `src/app/dashboard/layout.tsx` (uses `.admin-theme`)
