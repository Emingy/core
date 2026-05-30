import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-basic-typography--demo';

export class TypographyComponent {
    readonly root: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[class*="Typography"]').first();
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, args));
    }

    async hasClass(className: string): Promise<boolean> {
        const cls = (await this.root.getAttribute('class')) ?? '';
        return cls.includes(className);
    }
}
