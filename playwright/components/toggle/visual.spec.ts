import { expect, test } from '../../fixtures';

const CONTENTS = [
    { label: 'default', args: {} },
    { label: 'with description', args: { description: 'Description text' } },
    { label: 'with error', args: { error: 'Error text' } },
    {
        label: 'with description and error',
        args: { description: 'Description text', error: 'Error text' },
    },
] as const;

const STATES = [
    { label: 'unchecked', args: {} },
    { label: 'checked', args: { checked: true } },
    { label: 'disabled', args: { disabled: true } },
    { label: 'checked disabled', args: { checked: true, disabled: true } },
] as const;

test.describe('[Visual] Toggle', () => {
    for (const content of CONTENTS) {
        for (const state of STATES) {
            test(`${content.label} ${state.label}`, async ({ Toggle, page }) => {
                await Toggle.navigate({ ...content.args, ...state.args });
                await expect(Toggle.root).toHaveScreenshot();

                await test.step('hover', async () => {
                    await Toggle.hover();
                    await expect(Toggle.root).toHaveScreenshot();
                });

                await test.step('active', async () => {
                    await Toggle.hover();
                    await page.mouse.down();
                    await expect(Toggle.root).toHaveScreenshot();
                });
            });
        }
    }
});
