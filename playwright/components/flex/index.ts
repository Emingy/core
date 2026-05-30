import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-layout-flex--demo';

export class FlexComponent {
    readonly root: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[class*="Flex"]').first();
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, args));
    }
}
