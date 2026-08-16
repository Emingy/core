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

test.describe('[Visual] Radio', () => {
    for (const content of CONTENTS) {
        for (const state of STATES) {
            test(`${content.label} ${state.label}`, async ({ Radio, page }) => {
                await Radio.navigate({ ...content.args, ...state.args });
                await expect(Radio.root).toHaveScreenshot();

                await test.step('hover', async () => {
                    await Radio.hover();
                    await expect(Radio.root).toHaveScreenshot();
                });

                await test.step('active', async () => {
                    await Radio.hover();
                    await page.mouse.down();
                    await expect(Radio.root).toHaveScreenshot();
                });
            });
        }
    }

    test('error tooltip', async ({ Radio, page }) => {
        await Radio.navigate({ error: 'Error text' });
        await expect(page).toHaveScreenshot();
    });
});
