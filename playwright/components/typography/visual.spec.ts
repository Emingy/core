import { expect, test } from '../../fixtures';

test.describe('[Visual] Typography', () => {
    test('Heading1', async ({ Typography }) => {
        await expect(Typography.root).toHaveScreenshot();
    });

    test('Heading2', async ({ Typography }) => {
        await Typography.navigate({ type: 'Heading2' });

        await expect(Typography.root).toHaveScreenshot();
    });

    test('Heading3', async ({ Typography }) => {
        await Typography.navigate({ type: 'Heading3' });

        await expect(Typography.root).toHaveScreenshot();
    });

    test('Title', async ({ Typography }) => {
        await Typography.navigate({ type: 'Title' });

        await expect(Typography.root).toHaveScreenshot();
    });

    test('Subtitle', async ({ Typography }) => {
        await Typography.navigate({ type: 'Subtitle' });

        await expect(Typography.root).toHaveScreenshot();
    });

    test('Large', async ({ Typography }) => {
        await Typography.navigate({ type: 'Large' });

        await expect(Typography.root).toHaveScreenshot();
    });

    test('Base', async ({ Typography }) => {
        await Typography.navigate({ type: 'Base' });

        await expect(Typography.root).toHaveScreenshot();
    });

    test('Small', async ({ Typography }) => {
        await Typography.navigate({ type: 'Small' });

        await expect(Typography.root).toHaveScreenshot();
    });

    test('Micro', async ({ Typography }) => {
        await Typography.navigate({ type: 'Micro' });

        await expect(Typography.root).toHaveScreenshot();
    });

    test('weight bold', async ({ Typography }) => {
        await Typography.navigate({ weight: 'bold' });

        await expect(Typography.root).toHaveScreenshot();
    });

    test('weight semibold', async ({ Typography }) => {
        await Typography.navigate({ weight: 'semibold' });

        await expect(Typography.root).toHaveScreenshot();
    });

    test('italic', async ({ Typography }) => {
        await Typography.navigate({ isItalic: true });

        await expect(Typography.root).toHaveScreenshot();
    });

    test('align center', async ({ Typography }) => {
        await Typography.navigate({ align: 'center' });

        await expect(Typography.root).toHaveScreenshot();
    });

    test('textCase uppercase', async ({ Typography }) => {
        await Typography.navigate({ textCase: 'uppercase' });

        await expect(Typography.root).toHaveScreenshot();
    });
});
