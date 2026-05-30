import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-navigation-link--demo';

export class LinkComponent {
    readonly root: Locator;

    constructor(private readonly page: Page) {
        // Link renders <a> as root — no wrapper div
        this.root = page.locator('[class*="Link"]').first();
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, args));
    }

    async hasClass(className: string): Promise<boolean> {
        const cls = (await this.root.getAttribute('class')) ?? '';
        return cls.includes(className);
    }
}
