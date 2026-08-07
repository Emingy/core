import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-controls-textarea--demo';

export class TextareaComponent {
    readonly root: Locator;
    readonly textarea: Locator;
    readonly prefix: Locator;
    readonly postfix: Locator;
    readonly counter: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[class*="Textarea"]').first();
        this.textarea = this.root.locator('textarea');
        this.prefix = this.root.locator('[class*="Textarea__prefix"]');
        this.postfix = this.root.locator('[class*="Textarea__postfix"]');
        this.counter = this.root.locator('[class*="Textarea__counter"]');
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, args));
    }

    async hover() {
        await this.textarea.hover({ force: true });
    }
}
