import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-controls-toggle--demo';

export class ToggleComponent {
    readonly root: Locator;
    readonly input: Locator;
    readonly label: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[class*="Toggle"]').first();
        this.input = this.root.locator('input[type="checkbox"]');
        this.label = this.root.locator('label');
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, args));
    }

    async hover() {
        await this.input.hover({ force: true });
    }
}
