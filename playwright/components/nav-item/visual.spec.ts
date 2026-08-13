import { expect, test } from '../../fixtures';

const STATES: Array<{ label: string; args: Record<string, string | boolean | number> }> = [
    { label: 'default', args: {} },
    { label: 'active', args: { active: true } },
    { label: 'has-subitems', args: { showSubItems: true } },
    { label: 'disabled', args: { disabled: true } },
    { label: 'with-tag', args: { showTag: true } },
    { label: 'with-badge', args: { showBadge: true } },
    { label: 'with-tag-and-badge', args: { showTag: true, showBadge: true } },
    {
        label: 'has-subitems-with-tag-and-badge',
        args: { showSubItems: true, showTag: true, showBadge: true },
    },
    {
        label: 'disabled-with-tag-and-badge',
        args: { disabled: true, showTag: true, showBadge: true },
    },
];

test.describe('[Visual] NavItem', () => {
    for (const { label, args } of STATES) {
        test(label, async ({ NavItem }) => {
            await NavItem.navigate(args);

            await expect(NavItem.root).toHaveScreenshot();

            await test.step('hovered', async () => {
                await NavItem.root.hover({ force: true });

                await expect(NavItem.root).toHaveScreenshot();
            });
        });
    }
});

test.describe('[Visual] NavItem subItems flyout (full page)', () => {
    test('closed', async ({ NavItem, page }) => {
        await NavItem.navigate({ showSubItems: true });

        await expect(page).toHaveScreenshot();
    });

    test('open on hover', async ({ NavItem, page }) => {
        await NavItem.navigate({ showSubItems: true });
        await NavItem.openSubmenu();

        await expect(page).toHaveScreenshot();
    });

    test('open with tag and badge', async ({ NavItem, page }) => {
        await NavItem.navigate({ showSubItems: true, showTag: true, showBadge: true });
        await NavItem.openSubmenu();

        await expect(page).toHaveScreenshot();
    });

    test('open while active', async ({ NavItem, page }) => {
        await NavItem.navigate({ showSubItems: true, active: true });
        await NavItem.openSubmenu();

        await expect(page).toHaveScreenshot();
    });

    test('nested submenu open', async ({ NavItem, page }) => {
        await NavItem.navigate({ showSubItems: true });
        await NavItem.openSubmenu();
        await NavItem.openNestedSubmenu('Settings');

        await expect(NavItem.submenus).toHaveCount(2);
        await expect(page).toHaveScreenshot();
    });

    test('disabled does not open on hover', async ({ NavItem, page }) => {
        await NavItem.navigate({ showSubItems: true, disabled: true });
        await NavItem.root.hover({ force: true });

        await expect(NavItem.submenus).toHaveCount(0);
        await expect(page).toHaveScreenshot();
    });
});
