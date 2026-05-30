import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-datadisplay-tooltip--demo';

export class TooltipComponent {
    readonly root: Locator;
    readonly trigger: Locator;
    readonly popup: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[class*="Tooltip__trigger"]').first();
        this.trigger = this.root;
        this.popup = page.locator('[class*="TooltipContainer"]');
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, { ...args, text: 'tooltip' }));
    }

    async show() {
        await this.page.waitForLoadState('networkidle');
        await this.trigger.hover();
        await this.popup.waitFor({ state: 'visible' });
    }
}
