# Code Style

Automated formatting and linting is handled by Prettier, ESLint, and Stylelint.
This document covers conventions that tools cannot enforce.

## TypeScript

### `type` over `interface`

Always use `type`, never `interface`.

```ts
// ✓
type TProps = { size?: ESize };

// ✗
interface IProps {
    size?: ESize;
}
```

### Naming

| Thing                      | Convention                                               | Example           |
| -------------------------- | -------------------------------------------------------- | ----------------- |
| Component props type       | `TProps` inside the module, `T<Name>Props` when exported | `TButtonProps`    |
| Common props base          | `TPropsCommon`                                           | —                 |
| Discriminated union branch | `TPropsDependent`                                        | —                 |
| Enum                       | `E` prefix, PascalCase key, lowercase value              | `ESize.Md = 'md'` |
| Generic type param         | Single uppercase letter or descriptive                   | `T`, `TElement`   |

### Enums

Keys are PascalCase, values are lowercase (often kebab-case):

```ts
export enum ESize {
    Md = 'md',
    Sm = 'sm',
    Lg = 'lg',
}

export enum ETypographyType {
    Heading1 = 'heading-1',
    Base = 'base',
}
```

Use template literal types to derive string unions from enums:

```ts
type TProps = {
    size?: `${ESize}`; // 'md' | 'sm' | 'lg'
};
```

### Props type shape

Simple component:

```ts
type TPropsCommon = {
    size?: `${ESize}`;
    className?: string;
};

export type TProps = PropsWithChildren<TPropsCommon> &
    Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'type'>;
```

Discriminated union (mutually exclusive props):

```ts
type TPropsDependent =
    | { placeholder?: string; mask?: never }
    | { placeholder?: never; mask?: string };

export type TProps = PropsWithChildren<TPropsCommon & TPropsDependent> &
    Omit<HTMLProps<HTMLInputElement>, 'placeholder' | 'value'>;
```

### JSDoc

Add `@description` only on public, complex, or accessibility-relevant props:

```ts
type TPropsCommon = {
    /**
     * @description Label displayed above the field.
     * Should be associated with the field's `id` for accessibility.
     */
    title?: string;
};
```

---

## Components

### File structure

```
ComponentName/
  index.ts               ← public entry: export * from './src'
  index.stories.tsx
  index.mdx
  src/
    index.tsx
    types.ts
    constants.ts
    index.module.scss
    hooks/
    utils/
    __tests__/
      unit.spec.tsx
      snapshot.spec.tsx
```

### Implementation pattern

```tsx
import cls from 'classnames/bind';
import styles from './index.module.scss';
import { ESize, EType } from './constants';
import type { TProps } from './types';

const BLOCK_NAME = 'Button';
const cn = cls.bind(styles);

export const Button = ({
    size = ESize.Md,
    type = EType.Primary,
    className,
    children,
    onClick,
    ...restProps // always collected and spread onto the native element
}: TProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
    };

    return (
        <button
            {...restProps}
            className={cn(BLOCK_NAME, className, {
                [`${BLOCK_NAME}__primary`]: type === EType.Primary,
                [`${BLOCK_NAME}__disabled`]: restProps.disabled,
            })}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export type TButtonProps = TProps; // re-export with component-specific name
```

Key rules:

- `BLOCK_NAME` — PascalCase string matching the CSS block name
- `cn = cls.bind(styles)` — always this exact pattern
- `...restProps` — always spread onto the root native element
- Event handlers named `handle<Event>` (handleClick, handleChange, handleFocus)
- Exported type alias `T<Name>Props = TProps` alongside the component

### Exports

`index.ts` always contains only:

```ts
export * from './src';
```

`src/index.tsx` exports the component and the type alias:

```ts
export const Button = …;
export type TButtonProps = TProps;
```

---

## CSS / SCSS

### BEM naming inside CSS Modules

Block = `BLOCK_NAME`. Elements and modifiers use `&__` / `&__element_modifier`:

```scss
.Button {
    // block styles

    &__primary {
        background: var(--color-purple-50);
    }
    &__disabled {
        opacity: 0.1;
    }
    &__wrapper {
        display: flex;
    }
    &__wrapper_full-width {
        width: 100%;
    } // modifier with underscore
}
```

### Global variables

Always use CSS custom properties from `src/styles/variables/`:

```scss
color: var(--color-grey-10);
transition: background-color var(--animation-duration-base) var(--animation-easing-ease-in-out);
```

### Import style

Use `@use` with namespaces:

```scss
@use '@emingy/core/styles/typography';
@use '@emingy/core/styles/variables/colors';

.Component {
    @include typography.base;
}
```

---

## Storybook

One story file per component, one `Demo` export:

```tsx
import type { Meta } from 'storybook-react-rsbuild';
import { Button, type TButtonProps } from './src';

const meta: Meta = {
    title: 'UI/Controls/Button', // UI/{category}/{Name}
    component: Button,
    argTypes: {
        href: { table: { disable: true } }, // hide non-UI props
        navigateOptions: { table: { disable: true } },
    },
    args: {
        size: 'md',
        type: 'primary',
    },
};

export default meta;

export const Demo = (props: TButtonProps) => <Button {...props}>Button</Button>;
```

Story ID format: `ui-{category}-{name}--demo`  
(`UI/Controls/Button` + `Demo` → `ui-controls-button--demo`)

---

## Tests

### Unit tests

```ts
import { describe, expect, it } from '@rstest/core';
import { render, screen, fireEvent } from '@testing-library/react';

describe('[UNIT] ComponentName', () => {
    it('renders children', () => { … });
});
```

### Snapshot tests

```ts
describe('[SNAPSHOT] ComponentName', () => {
    it('primary type', () => {
        const { container } = render(<Button type={EType.Primary}>…</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });
});
```

### Playwright interactive tests

```ts
test.describe('[Interactive] ComponentName', () => {
    test('is visible and enabled by default', async ({ Button }) => { … });
});
```

### Playwright visual tests

```ts
test.describe('[Visual] ComponentName', () => {
    test('primary', async ({ Button }) => {
        await expect(Button.root).toHaveScreenshot();
    });
});
```

Describe prefix summary:

| Prefix          | File                  | Tool       |
| --------------- | --------------------- | ---------- |
| `[UNIT]`        | `unit.spec.tsx`       | rstest     |
| `[SNAPSHOT]`    | `snapshot.spec.tsx`   | rstest     |
| `[Interactive]` | `interactive.spec.ts` | Playwright |
| `[Visual]`      | `visual.spec.ts`      | Playwright |

---

## Import order

```ts
// 1. External packages
import cls from 'classnames/bind';
import React, { useId } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Internal packages (@emingy/core/*)
import { Icon } from '@emingy/core/ui/basic/Icon';
import { Typography } from '@emingy/core/ui/basic/Typography';

// 3. Styles
import styles from './index.module.scss';

// 4. Local modules
import { ESize, EType } from './constants';
import type { TProps } from './types';
```
