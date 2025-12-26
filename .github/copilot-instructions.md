# Swappr Client Development Guide

## Project Overview

Next.js 16 app using App Router with shadcn/ui (Radix Maia style), TypeScript, and Tailwind CSS v4. Uses `pnpm` as package manager.

## Architecture & Key Files

### Component System

- **UI Components**: `src/components/ui/` - shadcn/ui components using Radix primitives
- **Custom Components**: `src/components/` - app-specific components
- **Example/Demo Structure**: Uses `<Example>` and `<ExampleWrapper>` components (see `src/components/example.tsx`) for showcasing components with consistent layout

### Styling Approach

- **Tailwind CSS v4**: Import-based (@import "tailwindcss"), not traditional config file
- **Theme Configuration**: All CSS variables defined in `src/app/globals.css` using OKLCH color space
- **Component Variants**: Use `class-variance-authority` (cva) for component variants
- **Utility Function**: `cn()` in `src/lib/utils.ts` combines `clsx` and `tailwind-merge` for conditional classes

### shadcn/ui Configuration

Configuration in `components.json`:

- **Style**: `radix-maia` theme with `neutral` base color
- **Icon Library**: Tabler Icons (`@tabler/icons-react`)
- **Aliases**: Use `@/` prefix for all imports (`@/components`, `@/lib`, `@/hooks`)
- **Component Installation**: Run `pnpm dlx shadcn@latest add <component-name>`

## Development Patterns

### Component Structure

```tsx
// Button example pattern from src/components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const componentVariants = cva("base-classes", {
  variants: {
    /* variant options */
  },
  defaultVariants: {
    /* defaults */
  },
});

function Component({ className, variant, asChild, ...props }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      className={cn(componentVariants({ variant, className }))}
      {...props}
    />
  );
}
```

### Import Conventions

- Use `@/` path alias for all internal imports (configured in `tsconfig.json`)
- Import Tabler icons: `import { IconName } from "@tabler/icons-react"`
- Components are in named exports, not default exports (except page components)

### Styling Conventions

- Use CSS variables from `globals.css` via Tailwind utilities: `bg-primary`, `text-foreground`, etc.
- Dark mode uses `.dark` class variant (configured with `@custom-variant dark`)
- Radius system: `rounded-sm` through `rounded-4xl` (based on `--radius` variable)
- Use `data-slot` attributes for component identification (e.g., `data-slot="button"`)

### Color System

- OKLCH color space for all theme colors
- Light/dark mode defined in `:root` and `.dark` sections of `globals.css`
- Chart colors: `--chart-1` through `--chart-5` for data visualization
- Sidebar-specific color tokens available

## Key Commands

### Development

- **Start dev server**: `pnpm dev` (runs on http://localhost:3000)
- **Build**: `pnpm build`
- **Production**: `pnpm start`
- **Lint**: `pnpm lint`

### Adding Components

```bash
# Add shadcn components
pnpm dlx shadcn@latest add button card input

# Components auto-install to src/components/ui/
```

## Critical Configuration

### Path Resolution

- `@/*` maps to `./src/*` (see `tsconfig.json` paths)
- All imports should use absolute paths via `@/` prefix

### Font Configuration

Three fonts loaded in `src/app/layout.tsx`:

- Inter (primary sans, `--font-sans` variable)
- Geist Sans (`--font-geist-sans` variable)
- Geist Mono (`--font-geist-mono` variable)

### TypeScript

- Strict mode enabled
- JSX transform: `react-jsx` (no need to import React in files)
- Target: ES2017

## Common Pitfalls

- Don't create a traditional `tailwind.config.js` - Tailwind v4 uses CSS imports
- Don't use default exports for components (except in `app/` directory)
- Always use `cn()` utility when merging conditional classes with component variants
- Use `asChild` prop pattern (via Radix Slot) for polymorphic components instead of `as` prop
- The project uses `pnpm`, not `npm` or `yarn` - check `pnpm-lock.yaml` and `pnpm-workspace.yaml`
