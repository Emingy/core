import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-datadisplay-tag--demo';

export class TagComponent {
    readonly root: Locator;
    readonly closeButton: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[class*="Tag"]').first();
        this.closeButton = this.root.locator('[data-testid="tag-close"]');
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, { ...args, text: 'Tag', id: '12345' }));
    }

    async hasClass(className: string): Promise<boolean> {
        const cls = (await this.root.getAttribute('class')) ?? '';
        return cls.includes(className);
    }

    async hover() {
        await this.root.hover({ force: true });
    }
}
