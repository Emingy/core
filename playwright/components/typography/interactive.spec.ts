import { expect, test } from '../../fixtures';

test.describe('[Interactive] Typography', () => {
    test('default type renders as h1', async ({ Typography }) => {
        await expect(Typography.root).toHaveJSProperty('tagName', 'H1');
    });

    test('Base type renders as p', async ({ Typography }) => {
        await Typography.navigate({ type: 'Base' });

        await expect(Typography.root).toBeVisible();
        await expect(Typography.root).toHaveJSProperty('tagName', 'P');
    });

    test('Heading2 type renders as h2', async ({ Typography }) => {
        await Typography.navigate({ type: 'Heading2' });

        await expect(Typography.root).toHaveJSProperty('tagName', 'H2');
    });

    test('isItalic applies italic class', async ({ Typography }) => {
        await Typography.navigate({ isItalic: true });

        expect(await Typography.hasClass('Typography--italic')).toBe(true);
    });

    test('weight applies weight class', async ({ Typography }) => {
        await Typography.navigate({ weight: 'bold' });

        expect(await Typography.hasClass('Typography--weight-bold')).toBe(true);
    });

    test('align applies alignment class', async ({ Typography }) => {
        await Typography.navigate({ align: 'center' });

        expect(await Typography.hasClass('Typography--align-center')).toBe(true);
    });

    test('textCase applies case class', async ({ Typography }) => {
        await Typography.navigate({ textCase: 'uppercase' });

        expect(await Typography.hasClass('Typography--case-uppercase')).toBe(true);
    });

    test('renders text content', async ({ Typography }) => {
        await expect(Typography.root).toHaveText('Lorem ipsum');
    });
});
