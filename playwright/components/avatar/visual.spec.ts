import { expect, test } from '../../fixtures';

test.describe('[Visual] Avatar', () => {
    test('default', async ({ Avatar }) => {
        await expect(Avatar.root).toHaveScreenshot();
    });

    test('loading', async ({ Avatar, page }) => {
        await page.route('/static/avatar-placeholder.svg', async (route) => {
            await new Promise((r) => setTimeout(r, 30000));
            await route.continue();
        });
        await Avatar.navigate({}, false);
        await expect(Avatar.root).toHaveScreenshot();
        await page.unrouteAll();
    });

    test('disabled', async ({ Avatar }) => {
        await Avatar.navigate({ disabled: 'true' });
        await expect(Avatar.root).toHaveScreenshot();
    });

    test('hovered', async ({ Avatar }) => {
        await Avatar.root.hover();
        await expect(Avatar.root).toHaveScreenshot();
    });

    test('clicked', async ({ Avatar, page }) => {
        await Avatar.root.hover();
        await page.mouse.down();
        await expect(Avatar.root).toHaveScreenshot();
    });
});
