import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-datadisplay-avatar--demo';

export class AvatarComponent {
    readonly root: Locator;
    readonly image: Locator;
    readonly spinner: Locator;
    readonly placeholderIcon: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[class*="Avatar"]').first();
        this.image = this.root.locator('img');
        this.spinner = this.root.locator('[class*="Spinner"]');
        this.placeholderIcon = this.root.locator('> svg');
    }

    async navigate(args?: TArgs, waitImage = true) {
        await this.page.goto(iframeUrl(STORY_ID, args));
        if (waitImage) {
            await this.waitForImageLoaded();
        }
    }

    async waitForImageLoaded() {
        // ждём появления элемента
        await this.image.waitFor({ state: 'visible' });

        // ждём, пока картинка реально догрузится
        await this.image.evaluate((img: HTMLImageElement) =>
            img.complete && img.naturalWidth > 0
                ? Promise.resolve()
                : new Promise<void>((resolve, reject) => {
                      img.addEventListener('load', () => resolve(), { once: true });
                      img.addEventListener(
                          'error',
                          () => reject(new Error('Image failed to load')),
                          { once: true }
                      );
                  })
        );
    }
}
