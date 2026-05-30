import { test as base } from '@playwright/test';

import { ButtonComponent } from './components/button';
import { TypographyComponent } from './components/typography';

type TFixtures = {
    Button: ButtonComponent;
    Typography: TypographyComponent;
};

export const test = base.extend<TFixtures>({
    Button: async ({ page }, use) => {
        const button = new ButtonComponent(page);
        await button.navigate();
        await use(button);
    },
    Typography: async ({ page }, use) => {
        const typography = new TypographyComponent(page);
        await typography.navigate();
        await use(typography);
    },
});

export { expect } from '@playwright/test';
