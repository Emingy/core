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

    test('placeholder', async ({ Avatar }) => {
        await Avatar.navigate({ src: '' }, false);
        await expect(Avatar.root).toHaveScreenshot();
    });

    test.describe('with onClick', () => {
        test('default', async ({ Avatar }) => {
            await Avatar.navigate({ onClick: 'clicked' });
            await expect(Avatar.root).toHaveScreenshot();
        });

        test('disabled', async ({ Avatar }) => {
            await Avatar.navigate({ onClick: 'clicked', disabled: true });
            await expect(Avatar.root).toHaveScreenshot();
        });

        test('clicked', async ({ Avatar, page }) => {
            await Avatar.navigate({ onClick: 'clicked' });
            await Avatar.root.hover();
            await page.mouse.down();
            await expect(Avatar.root).toHaveScreenshot();
            await page.mouse.up();
        });

        test('hovered', async ({ Avatar }) => {
            await Avatar.navigate({ onClick: 'clicked' }, false);
            await Avatar.root.hover();
            await expect(Avatar.root).toHaveScreenshot();
        });
    });

    test.describe('with to', () => {
        test('default', async ({ Avatar }) => {
            await Avatar.navigate({ to: 'profile' });
            await expect(Avatar.root).toHaveScreenshot();
        });
    });

    test.describe('with href', () => {
        test('default', async ({ Avatar }) => {
            await Avatar.navigate({ href: 'external' });
            await expect(Avatar.root).toHaveScreenshot();
        });
    });
});
