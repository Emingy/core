import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-controls-togglebutton--demo';

export class ToggleButtonComponent {
    readonly root: Locator;
    readonly input: Locator;
    readonly spinner: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[class*="ToggleButton"]').first();
        this.input = this.root.locator('input[type="checkbox"]');
        this.spinner = this.root.locator('[class*="ToggleButton__spinner"]');
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, args));
    }

    async hover() {
        await this.root.hover({ force: true });
    }
}
