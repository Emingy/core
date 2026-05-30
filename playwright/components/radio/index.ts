import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-controls-radio--demo';

export class RadioComponent {
    readonly root: Locator;
    readonly input: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[class*="Radio"]').first();
        this.input = this.root.locator('input[type="radio"]');
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, args));
    }

    async hover() {
        await this.input.hover({ force: true });
    }
}
