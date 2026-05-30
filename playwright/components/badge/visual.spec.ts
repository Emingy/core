import { expect, test } from '../../fixtures';

test.describe('[Visual] Badge', () => {
    test('primary', async ({ Badge }) => {
        await Badge.navigate({ value: 'Test' });
        await expect(Badge.valueAsString).toHaveScreenshot();
    });

    test('secondary', async ({ Badge }) => {
        await Badge.navigate({ type: 'secondary', value: 'Test' });

        await expect(Badge.valueAsString).toHaveScreenshot();
    });

    test('numeric value', async ({ Badge }) => {
        await Badge.navigate({ value: 42 });

        await expect(Badge.valueAsNumber).toHaveScreenshot();
    });

    test('string value', async ({ Badge }) => {
        await Badge.navigate({ value: 'New' });

        await expect(Badge.valueAsString).toHaveScreenshot();
    });

    test('More 100 numeric value', async ({ Badge }) => {
        await Badge.navigate({ value: 1000 });

        await expect(Badge.valueAsNumber).toHaveScreenshot();
    });

    test('More 5 chars string value', async ({ Badge }) => {
        await Badge.navigate({ value: 'SomeText' });

        await expect(Badge.valueAsString).toHaveScreenshot();
    });

    test('Tooltip when more 5 chars', async ({ Badge, page }) => {
        await Badge.navigate({ value: 'SomeText' });
        await Badge.valueAsString.hover();

        await expect(page).toHaveScreenshot();
    });
});
