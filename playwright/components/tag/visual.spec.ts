import { expect, test } from '../../fixtures';

const COLORS = ['purple', 'grey', 'yellow', 'red', 'green'] as const;
const SIZES = ['md', 'sm'] as const;

const STATES = [
    { label: 'default', args: {} },
    { label: 'closable', args: { closable: true } },
] as const;

test.describe('[Visual] Tag', () => {
    for (const color of COLORS) {
        for (const size of SIZES) {
            for (const { label, args } of STATES) {
                test(`${color} ${size} ${label}`, async ({ Tag, page }) => {
                    await Tag.navigate({ color, size, ...args });
                    await expect(Tag.root).toHaveScreenshot();

                    await test.step('hover', async () => {
                        await Tag.hover();
                        await expect(Tag.root).toHaveScreenshot();
                    });

                    await test.step('active', async () => {
                        await Tag.hover();
                        await page.mouse.down();
                        await expect(Tag.root).toHaveScreenshot();
                    });
                });
            }
        }
    }
});
