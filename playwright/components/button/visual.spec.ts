import { expect, test } from '../../fixtures';

test.describe('[Visual] Button', () => {
    test('primary', async ({ Button }) => {
        await expect(Button.root).toHaveScreenshot();
    });

    test('secondary', async ({ Button }) => {
        await Button.navigate({ type: 'secondary' });

        await expect(Button.root).toHaveScreenshot();
    });

    test('ghosted', async ({ Button }) => {
        await Button.navigate({ type: 'ghosted' });

        await expect(Button.root).toHaveScreenshot();
    });

    test('outlined', async ({ Button }) => {
        await Button.navigate({ type: 'outlined' });

        await expect(Button.root).toHaveScreenshot();
    });

    test('alert', async ({ Button }) => {
        await Button.navigate({ type: 'alert' });

        await expect(Button.root).toHaveScreenshot();
    });

    test('size sm', async ({ Button }) => {
        await Button.navigate({ size: 'sm' });

        await expect(Button.root).toHaveScreenshot();
    });

    test('size lg', async ({ Button }) => {
        await Button.navigate({ size: 'lg' });

        await expect(Button.root).toHaveScreenshot();
    });

    test('disabled', async ({ Button }) => {
        await Button.navigate({ disabled: true });

        await expect(Button.root).toHaveScreenshot();
    });

    test('loading', async ({ Button }) => {
        await Button.navigate({ isLoading: true });

        await expect(Button.root).toHaveScreenshot();
    });

    test('split', async ({ Button }) => {
        await Button.navigate({ splitted: true });

        await expect(Button.root).toHaveScreenshot();
    });

    test('hover', async ({ Button }) => {
        await Button.hover();

        await expect(Button.root).toHaveScreenshot();
    });
});
