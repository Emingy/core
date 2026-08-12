# CLAUDE.md

> Code style conventions (naming, types, component patterns, CSS, tests) are in [CODESTYLE.md](./CODESTYLE.md).

## Stack

- **React 19** + TypeScript 5.9
- **Build**: rslib / rsbuild (not webpack/vite)
- **Unit tests**: rstest (`@rstest/core`) — vitest-compatible API
- **E2E / visual**: Playwright 1.60
- **Storybook 9** via `storybook-react-rsbuild`
- **Styles**: SCSS + CSS Modules with `classnames/bind`
- **Routing**: react-router-dom 6
- **Package manager**: pnpm

## Key scripts

```bash
pnpm test          # rstest unit tests
pnpm pw:test       # playwright tests (needs storybook running)
pnpm pw:update     # update visual snapshots
pnpm storybook     # dev server on :3000
pnpm build         # lib build (TYPE=lib rslib build)
```

## LLM context bundle

Every component, provider, hook, util, and styles module (variables, mixins) has a generated `llms.md` — props table for components, function signature + returns table for hooks/utils, variables/mixins table for styles:

```
src/ui/controls/Button/llms.md       # props table
src/hooks/useMessage/llms.md         # function signature + returns
src/styles/variables/colors/llms.md  # CSS custom properties
…
```

`llms.txt` at the repo root indexes all of them by category with relative links — the entry point for an LLM agent to discover the whole kit.

**Regenerate all:** `pnpm llms:gen` — script: `scripts/gen-llms.ts`, config at the top of the file (`SOURCES`, `ENTRY_FILE_CANDIDATES`).

**Validate:** `pnpm llms:check` — runs in precommit, exits 1 if any file is outdated.

When writing code that touches a module, read its `llms.md` first. No need to open `index.tsx`, `types.ts`, or `constants.ts`.

## Source structure

```
src/
  ui/
    basic/       # Typography, Icon
    controls/    # Button, Input, Checkbox, Radio, Toggle, ToggleButton…
    dataDisplay/ # Avatar, Badge, Spinner, Tooltip, Message, Tag…
    layout/      # Divider, Flex, PageWrapper
    navigation/  # Link
  providers/     # AppProvider, MessageProvider, TooltipProvider
  hooks/         # useDeviceType, useMessage
  utils/         # getElementPageRect, isDigitChar, isLetterChar
  styles/        # Global SCSS: variables, typography, fonts, media, shadows
```

## Component structure

Every component follows this layout:

```
ComponentName/
  index.ts               # re-export from ./src
  index.stories.tsx      # Storybook story
  index.mdx              # documentation
  src/
    index.tsx            # implementation
    types.ts             # TProps + T<Name>Props (exported)
    constants.ts         # enums (ESize, EType, …)
    index.module.scss    # BEM scoped styles
    __tests__/
      unit.spec.tsx
      snapshot.spec.tsx
      __snapshots__/
```

## CSS Modules — critical gotcha

In **rstest** (unit tests) class names are readable: `Button__primary`.
In **Storybook / Playwright** (browser) they are fully hashed:
`src-ui-controls-Button-src-index-module__Button__primary-zfyVDp`

**Always use attribute substring selectors in Playwright:**

```ts
page.locator('[class*="Button__wrapper"]'); // ✓
page.locator('.Button__wrapper'); // ✗ — won't match
```

## Unit tests

```ts
import { describe, expect, it } from '@rstest/core';
import { render, screen, fireEvent } from '@testing-library/react';

describe('[UNIT] ComponentName', () => { … });
describe('[SNAPSHOT] ComponentName', () => { … });
```

- Wrap in `<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>` when the component uses routing
- Query CSS module classes: `container.querySelector('label')?.className.toContain('Button__primary')`
- Coverage thresholds: 90% lines / functions

## Storybook story conventions

```ts
const meta: Meta = {
    title: 'UI/Controls/Button',   // → story ID: ui-controls-button
    component: Button,
    args: { size: 'md', type: 'primary' },
};

export const Demo = (props: TButtonProps) => <Button {...props}>Button</Button>;
// story ID: ui-controls-button--demo
```

Every story has a single `Demo` export. All stories are wrapped automatically with `<MemoryRouter>` + `<AppProvider>` + `<PageWrapper>` via `.storybook/preview.tsx`.

## Playwright conventions

### File layout

```
playwright/
  components/
    <component>/
      index.ts              # Component Object Model (COM)
      interactive.spec.ts
      visual.spec.ts
  fixtures.ts               # custom test base with component fixtures
  utils/
    storybook.ts            # storyUrl(), iframeUrl()
```

### URLs

```ts
// iframe URL — use this in tests (no Storybook shell)
iframeUrl('ui-controls-button--demo');
iframeUrl('ui-controls-button--demo', { type: 'secondary', disabled: true });
// → /iframe.html?id=ui-controls-button--demo&args=type:secondary;disabled:!true

// full Storybook URL — only for visual tests of the full shell (rare)
storyUrl('ui-controls-button--demo');
```

Boolean args are serialized as `!true` / `!false`.

**Storybook arg format limitations** — some string values are not passed correctly:

- `$` and `#` are treated as special markers → use `USD`, `EUR`, `+` instead
- `{` and `}` break the parser (e.g. mask `d{3}`) → use repeated-char syntax (`ddd`) instead
- Storybook does **not** URL-decode arg values, so `encodeURIComponent` does not help

### Component Object Model

```ts
export class ButtonComponent {
    readonly root: Locator;
    readonly button: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[class*="Button__wrapper"]');
        this.button = this.root.locator('button').first();
        // …
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, args));
    }
}
```

- `root` uses `[class*="ClassName__wrapper"]` — never `.ClassName__wrapper`
- `navigate(args?)` is the only way to change story state
- `page` is `private`

### Fixtures

```ts
// playwright/fixtures.ts
export const test = base.extend<{ Button: ButtonComponent }>({
    Button: async ({ page }, use) => {
        const button = new ButtonComponent(page);
        await button.navigate(); // default story args
        await use(button);
    },
});
export { expect } from '@playwright/test';
```

Tests import `{ test, expect }` from `../../fixtures`, not from `@playwright/test`.

### Test structure

```ts
// interactive.spec.ts
test.describe('[Interactive] Button', () => {
    test('is visible and enabled by default', async ({ Button }) => { … });
    test('disabled is not clickable', async ({ Button }) => {
        await Button.navigate({ disabled: true });
        await expect(Button.button).toBeDisabled();
    });
});

// visual.spec.ts
test.describe('[Visual] Button', () => {
    test('primary', async ({ Button }) => {
        await expect(Button.root).toHaveScreenshot();  // component root, not full page
    });
    test('secondary', async ({ Button }) => {
        await Button.navigate({ type: 'secondary' });
        await expect(Button.root).toHaveScreenshot();
    });
});
```

- Always screenshot `Button.root`, not `page`
- No `page.evaluate` in tests — test observable DOM behaviour
- Only `{ Button }` in test args, no `{ page }`

## SCSS conventions

```scss
@use '@emingy/core/styles/typography';
@use '@emingy/core/styles/variables/colors';

.ComponentName {
    @include typography.base;
    color: var(--color-grey-10);

    &__variant { … }        // BEM element
    &__disabled { … }       // BEM modifier
}
```

Global CSS variables: `--color-*`, `--animation-duration-*`, `--animation-easing-*`.

## Scaffolding (Plop)

```bash
pnpm plop ui-component   # new component in src/ui/{group}/{Name}/
pnpm plop provider       # new provider in src/providers/
pnpm plop icon           # add SVG icon to Icon component
pnpm plop hook           # new hook in src/hooks/
```

## Aliases

```ts
'@emingy/core/ui/controls/Button'; // → src/ui/controls/Button
'@emingy/core/hooks'; // → src/hooks
'@emingy/core/providers'; // → src/providers
'@storybook-components/*'; // → .storybook/components/*
```
