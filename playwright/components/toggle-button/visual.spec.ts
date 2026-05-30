import { expect, test } from '../../fixtures';

const TYPES = ['primary', 'secondary'] as const;

const STATES = [
    { label: 'default', args: {} },
    { label: 'checked', args: { checked: true } },
    { label: 'disabled', args: { disabled: true } },
    { label: 'checked disabled', args: { checked: true, disabled: true } },
    { label: 'loading', args: { isLoading: true } },
    { label: 'loading disabled', args: { isLoading: true, disabled: true } },
    { label: 'prefix', args: { prefix: 'pre' } },
    { label: 'prefix checked', args: { prefix: 'pre', checked: true } },
    { label: 'prefix disabled', args: { prefix: 'pre', disabled: true } },
    { label: 'postfix', args: { postfix: 'post' } },
    { label: 'postfix checked', args: { postfix: 'post', checked: true } },
    { label: 'postfix disabled', args: { postfix: 'post', disabled: true } },
    { label: 'prefix and postfix', args: { prefix: 'pre', postfix: 'post' } },
    {
        label: 'prefix and postfix checked',
        args: { prefix: 'pre', postfix: 'post', checked: true },
    },
    {
        label: 'prefix and postfix disabled',
        args: { prefix: 'pre', postfix: 'post', disabled: true },
    },
    { label: 'full width', args: { isFullWidth: true } },
    { label: 'full width checked', args: { isFullWidth: true, checked: true } },
] as const;

test.describe('[Visual] ToggleButton', () => {
    for (const type of TYPES) {
        for (const { label, args } of STATES) {
            test(`${type} ${label}`, async ({ ToggleButton, page }) => {
                await ToggleButton.navigate({ type, ...args });
                await expect(ToggleButton.root).toHaveScreenshot();

                await test.step('hover', async () => {
                    await ToggleButton.hover();
                    await expect(ToggleButton.root).toHaveScreenshot();
                });

                await test.step('active', async () => {
                    await ToggleButton.hover();
                    await page.mouse.down();
                    await expect(ToggleButton.root).toHaveScreenshot();
                });
            });
        }
    }
});
