import { expect, test } from '../../fixtures';

const DIRECTIONS = ['top', 'bottom', 'left', 'right'] as const;

test.describe('[Visual] Dropdown', () => {
    for (const direction of DIRECTIONS) {
        test(direction, async ({ Dropdown, page }) => {
            await Dropdown.navigate({ direction });
            await Dropdown.open();

            await expect(page).toHaveScreenshot();
        });
    }

    test('scrolls when content exceeds maxHeight', async ({ Dropdown, page }) => {
        await Dropdown.navigate({ direction: 'bottom', maxHeight: '80' });
        await Dropdown.open();

        await expect(page).toHaveScreenshot();
    });
});
