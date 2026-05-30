import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-datadisplay-badge--demo';

export class BadgeComponent {
    readonly valueAsString: Locator;
    readonly valueAsNumber: Locator;

    constructor(private readonly page: Page) {
        this.valueAsString = page.locator('[class*="Badge"]').first();
        this.valueAsNumber = page.locator('[class*="Badge"]').last();
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, args));
    }
}
