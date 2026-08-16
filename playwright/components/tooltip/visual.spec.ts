import { expect, test } from '../../fixtures';

const POSITIONS = ['top', 'bottom', 'left', 'right'] as const;
const SIZES = ['md', 'sm'] as const;
const TYPES = ['default', 'error'] as const;

test.describe('[Visual] Tooltip', () => {
    test('trigger only', async ({ Tooltip, page }) => {
        await Tooltip.trigger.waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
    });

    test('disabled', async ({ Tooltip, page }) => {
        await Tooltip.navigate({ disabled: true });
        await Tooltip.trigger.waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
    });

    for (const position of POSITIONS) {
        test(`position ${position}`, async ({ Tooltip, page }) => {
            await Tooltip.navigate({ position });
            await Tooltip.show();
            await expect(page).toHaveScreenshot();
        });
    }

    for (const size of SIZES) {
        test(`size ${size}`, async ({ Tooltip, page }) => {
            await Tooltip.navigate({ size });
            await Tooltip.show();
            await expect(page).toHaveScreenshot();
        });
    }

    for (const type of TYPES) {
        test(`type ${type}`, async ({ Tooltip, page }) => {
            await Tooltip.navigate({ type });
            await Tooltip.show();
            await expect(page).toHaveScreenshot();
        });
    }
});
