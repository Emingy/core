import { expect, test } from '../../fixtures';

const POSITIONS = ['top', 'bottom', 'left', 'right'] as const;
const SIZES = ['md', 'sm'] as const;

test.describe('[Visual] Tooltip', () => {
    test('trigger only', async ({ Tooltip }) => {
        await expect(Tooltip.page).toHaveScreenshot();
    });

    test('disabled', async ({ Tooltip }) => {
        await Tooltip.navigate({ disabled: true });
        await expect(Tooltip.page).toHaveScreenshot();
    });

    for (const position of POSITIONS) {
        test(`position ${position}`, async ({ Tooltip }) => {
            await Tooltip.navigate({ position });
            await Tooltip.show();
            await expect(Tooltip.page).toHaveScreenshot();
        });
    }

    for (const size of SIZES) {
        test(`size ${size}`, async ({ Tooltip }) => {
            await Tooltip.navigate({ size });
            await Tooltip.show();
            await expect(Tooltip.page).toHaveScreenshot();
        });
    }
});
