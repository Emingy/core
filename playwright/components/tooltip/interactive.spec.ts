import { expect, test } from '../../fixtures';

test.describe('[Interactive] Tooltip', () => {
    test('trigger is visible', async ({ Tooltip }) => {
        await expect(Tooltip.trigger).toBeVisible();
    });

    test('popup is hidden before hover', async ({ Tooltip }) => {
        await expect(Tooltip.popup).not.toBeVisible();
    });

    test('hover shows popup', async ({ Tooltip }) => {
        await Tooltip.show();

        await expect(Tooltip.popup).toBeVisible();
    });

    test('popup contains tooltip text', async ({ Tooltip }) => {
        await Tooltip.show();

        await expect(Tooltip.popup).toContainText('tooltip');
    });

    test('disabled does not show popup on hover', async ({ Tooltip }) => {
        await Tooltip.navigate({ disabled: true });
        await Tooltip.trigger.hover();

        await expect(Tooltip.popup).not.toBeVisible();
    });
});
