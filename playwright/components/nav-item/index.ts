import type { Locator, Page } from '@playwright/test';

import { iframeUrl } from '../../utils/storybook';

type TArgs = Record<string, string | boolean | number>;

const STORY_ID = 'ui-navigation-navitem--demo';

export class NavItemComponent {
    readonly root: Locator;
    readonly prefix: Locator;
    readonly chevron: Locator;
    readonly tags: Locator;
    readonly badge: Locator;
    readonly submenu: Locator;
    readonly submenus: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[class*="NavItem"]').first();
        this.prefix = this.root.locator('[class*="NavItem__prefix"]');
        this.chevron = this.root.locator('[class*="NavItem__chevron"]');
        this.tags = this.root.locator('[class*="Tag"]');
        this.badge = this.root.locator('[class*="Badge"]');
        this.submenus = page.locator('[class*="Dropdown__panel"]');
        this.submenu = this.submenus.first();
    }

    async navigate(args?: TArgs) {
        await this.page.goto(iframeUrl(STORY_ID, args));
    }

    async click() {
        await this.root.click();
    }

    async hasClass(className: string): Promise<boolean> {
        const cls = (await this.root.getAttribute('class')) ?? '';
        return cls.includes(className);
    }

    async openSubmenu() {
        await this.root.hover({ force: true });
        await this.page
            .locator('[class*="Dropdown__panel_visible"]')
            .first()
            .waitFor({ state: 'visible' });
    }

    async openNestedSubmenu(label: string) {
        await this.submenu.getByText(label).hover({ force: true });
        await this.page
            .locator('[class*="Dropdown__panel_visible"]')
            .nth(1)
            .waitFor({ state: 'visible' });
    }
}
