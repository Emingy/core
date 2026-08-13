import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-layout-dropdown--demo';

export class DropdownComponent {
    readonly root: Locator;
    readonly trigger: Locator;
    readonly panel: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[class*="Dropdown__trigger"] > *').first();
        this.trigger = this.root;
        this.panel = page.locator('[class*="Dropdown__panel"]');
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, args));
    }

    async open() {
        await this.trigger.click();
        await this.page.locator('[class*="Dropdown__panel_visible"]').waitFor({ state: 'visible' });
    }
}
