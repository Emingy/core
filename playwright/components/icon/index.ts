import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-basic-icon-gallery--gallery';

export class IconComponent {
    readonly root: Locator;

    constructor(readonly page: Page) {
        this.root = page.locator('[class*="Icon"]').first();
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, args));
    }
}
