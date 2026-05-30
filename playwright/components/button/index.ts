import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-controls-button--demo';

export class ButtonComponent {
    readonly root: Locator;
    readonly button: Locator;
    readonly label: Locator;
    readonly spinner: Locator;
    readonly splitButton: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[class*="Button__wrapper"]');
        this.button = this.root.locator('button').first();
        this.label = this.root.locator('label');
        this.spinner = this.root.locator('[class*="Button__spinner"]');
        this.splitButton = this.root.locator('button').nth(1);
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, args));
    }

    async click() {
        await this.button.click();
    }

    async hover() {
        await this.button.hover({ force: true });
    }

    async hasClass(className: string): Promise<boolean> {
        const cls = (await this.label.getAttribute('class')) ?? '';
        return cls.includes(className);
    }
}
