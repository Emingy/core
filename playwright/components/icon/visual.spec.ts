import { expect, test } from '../../fixtures';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const COLORS = ['primary', 'secondary', 'alert', 'success', 'inherit'] as const;

test.describe('[Visual] Icon', () => {
    for (const size of SIZES) {
        test(`size ${size}`, async ({ Icon }) => {
            await Icon.navigate({ size });
            await Icon.page.waitForLoadState('networkidle');
            await expect(Icon.page).toHaveScreenshot();
        });
    }

    for (const color of COLORS) {
        test(`color ${color}`, async ({ Icon }) => {
            await Icon.navigate({ color });
            await Icon.page.waitForLoadState('networkidle');
            await expect(Icon.page).toHaveScreenshot();
        });
    }
});
