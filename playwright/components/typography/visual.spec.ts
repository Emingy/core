import { expect, test } from '../../fixtures';

const TYPES = [
    'Heading1',
    'Heading2',
    'Heading3',
    'Title',
    'Subtitle',
    'Large',
    'Base',
    'Small',
    'Micro',
] as const;

const WEIGHTS = ['medium', 'semibold', 'bold'] as const;
const ALIGNS = ['center', 'right', 'justify'] as const;
const TEXT_CASES = ['uppercase', 'lowercase', 'capitalize'] as const;

const LONG_TEXT =
    'The quick brown fox jumps over the lazy dog and the dog barked at the fox running away into the forest';

test.describe('[Visual] Typography', () => {
    for (const type of TYPES) {
        test(`type ${type}`, async ({ Typography }) => {
            await Typography.navigate({ type });
            await expect(Typography.root).toHaveScreenshot();
        });
    }

    for (const weight of WEIGHTS) {
        test(`weight ${weight}`, async ({ Typography }) => {
            await Typography.navigate({ weight });
            await expect(Typography.root).toHaveScreenshot();
        });
    }

    for (const align of ALIGNS) {
        test(`align ${align}`, async ({ Typography }) => {
            await Typography.navigate({ align, children: LONG_TEXT });
            await expect(Typography.root).toHaveScreenshot();
        });
    }

    for (const textCase of TEXT_CASES) {
        test(`textCase ${textCase}`, async ({ Typography }) => {
            await Typography.navigate({ textCase });
            await expect(Typography.root).toHaveScreenshot();
        });
    }

    test('italic', async ({ Typography }) => {
        await Typography.navigate({ isItalic: true });
        await expect(Typography.root).toHaveScreenshot();
    });

    test('truncated', async ({ Typography }) => {
        await Typography.navigate({ isTruncated: true, children: LONG_TEXT });
        await expect(Typography.root).toHaveScreenshot();
    });

    test('maxLines 2', async ({ Typography }) => {
        await Typography.navigate({ maxLines: 2, children: LONG_TEXT });
        await expect(Typography.root).toHaveScreenshot();
    });
});
