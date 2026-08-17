import { expect, test } from '../../fixtures';

const TYPES = ['primary', 'secondary', 'alert'] as const;
const VARIANTS = ['filled', 'outlined', 'ghosted'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

const STATES = [
    { label: 'default', args: {} },
    { label: 'loading', args: { isLoading: true } },
    { label: 'disabled', args: { disabled: true } },
    { label: 'prefix', args: { prefix: 'pre' } },
    { label: 'postfix', args: { postfix: 'post' } },
    { label: 'splitted', args: { splitted: true } },
    { label: 'full width', args: { isFullWidth: true } },
] as const;

test.describe('[Visual] Button', () => {
    for (const type of TYPES) {
        for (const variant of VARIANTS) {
            for (const size of SIZES) {
                for (const { label, args } of STATES) {
                    test(`type ${type} variant ${variant} ${size} ${label}`, async ({
                        Button,
                        page,
                    }) => {
                        await Button.navigate({ type, variant, size, ...args });
                        await expect(Button.root).toHaveScreenshot();

                        await test.step('hover', async () => {
                            await Button.hover();
                            await expect(Button.root).toHaveScreenshot();
                        });

                        await test.step('clicked', async () => {
                            await Button.root.hover();
                            await page.mouse.down();
                            await expect(Button.root).toHaveScreenshot();
                        });
                    });
                }
            }
        }
    }
});

test.describe('[Visual] Button split dropdown (full page)', () => {
    test('panel open', async ({ Button, page }) => {
        await Button.navigate({ splitted: true });

        await Button.splitButton.click();
        await expect(Button.splitPanel).toBeVisible();

        await expect(page).toHaveScreenshot();
    });
});
