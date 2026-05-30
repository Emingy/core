import { expect, test } from '../../fixtures';

const DIRECTIONS = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
const JUSTIFIES = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'] as const;
const ALIGNS = ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'] as const;
const GAPS = ['1x', '2x', '4x', '6x', '8x', '10x', '12x'] as const;

test.describe('[Visual] Flex', () => {
    for (const direction of DIRECTIONS) {
        test(`direction ${direction}`, async ({ Flex }) => {
            await Flex.navigate({ direction });
            await expect(Flex.root).toHaveScreenshot();
        });
    }

    for (const justify of JUSTIFIES) {
        test(`justify ${justify}`, async ({ Flex }) => {
            await Flex.navigate({ justify, countNodes: 3 });
            await expect(Flex.root).toHaveScreenshot();
        });
    }

    for (const align of ALIGNS) {
        test(`align ${align}`, async ({ Flex }) => {
            await Flex.navigate({ align });
            await expect(Flex.root).toHaveScreenshot();
        });
    }

    for (const gap of GAPS) {
        test(`gap ${gap}`, async ({ Flex }) => {
            await Flex.navigate({ gap });
            await expect(Flex.root).toHaveScreenshot();
        });
    }

    test('inline', async ({ Flex }) => {
        await Flex.navigate({ inline: true });
        await expect(Flex.root).toHaveScreenshot();
    });

    test('wrap', async ({ Flex }) => {
        await Flex.navigate({ wrap: true, countNodes: 15 });
        await expect(Flex.root).toHaveScreenshot();
    });
});
