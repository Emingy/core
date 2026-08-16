import { expect, test } from '../../fixtures';

test.describe('[Interactive] Radio', () => {
    test('is unchecked by default', async ({ Radio }) => {
        await expect(Radio.input).not.toBeChecked();
    });

    test('checked prop renders as checked', async ({ Radio }) => {
        await Radio.navigate({ checked: true });

        await expect(Radio.input).toBeChecked();
    });

    test('disabled prevents interaction', async ({ Radio }) => {
        await Radio.navigate({ disabled: true });

        await expect(Radio.input).toBeDisabled();
    });

    test('error message appears in a tooltip above the field', async ({ Radio, page }) => {
        await Radio.navigate({ error: 'Error text' });

        const tooltip = page.locator('[class*="TooltipContainer"]');
        await expect(tooltip).toContainText('Error text');
    });
});
