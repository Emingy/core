import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-controls-input--demo';

export class InputComponent {
    readonly root: Locator;
    readonly input: Locator;
    readonly prefix: Locator;
    readonly postfix: Locator;
    readonly maskPlaceholder: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[class*="Input"]').first();
        this.input = this.root.locator('input');
        this.prefix = this.root.locator('[class*="Input__prefix"]');
        this.postfix = this.root.locator('[class*="Input__postfix"]');
        this.maskPlaceholder = this.root.locator('[data-testid="input-mask"]');
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, args));
    }

    async hover() {
        await this.input.hover({ force: true });
    }
}
