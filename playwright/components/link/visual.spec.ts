import { expect, test } from '../../fixtures';

const STATES: Array<{ label: string; args: Record<string, string | boolean | number> }> = [
    { label: 'default', args: {} },
    { label: 'disabled', args: { disabled: true } },
];

test.describe('[Visual] Link', () => {
    for (const { label, args } of STATES) {
        test(label, async ({ Link, page }) => {
            await Link.navigate(args);

            await expect(Link.root).toHaveScreenshot();

            await test.step('hovered', async () => {
                await Link.root.hover({ force: true });

                await expect(Link.root).toHaveScreenshot();
            });

            await test.step('clicked', async () => {
                await Link.root.hover({ force: true });
                await page.mouse.down();

                await expect(Link.root).toHaveScreenshot();
            });
        });
    }
});
