import { expect, test } from '../../fixtures';

const STATES = [
    { label: 'default', args: {} },
    { label: 'selected', args: { isSelected: true } },
    { label: 'disabled', args: { isDisabled: true } },
    { label: 'selected disabled', args: { isSelected: true, isDisabled: true } },
] as const;

const CONTENTS = [
    { label: 'no extras', args: {} },
    { label: 'with description', args: { description: 'Option description' } },
    { label: 'with prefix', args: { prefix: 'pre' } },
    {
        label: 'with prefix and description',
        args: { prefix: 'pre', description: 'Option description' },
    },
] as const;

test.describe('[Visual] Option', () => {
    for (const state of STATES) {
        for (const content of CONTENTS) {
            test(`${state.label} ${content.label}`, async ({ Option, page }) => {
                await Option.navigate({ ...state.args, ...content.args });
                await expect(Option.root).toHaveScreenshot();

                await test.step('hover', async () => {
                    await Option.hover();
                    await expect(Option.root).toHaveScreenshot();
                });

                await test.step('active', async () => {
                    await Option.hover();
                    await page.mouse.down();
                    await expect(Option.root).toHaveScreenshot();
                });
            });
        }
    }
});
