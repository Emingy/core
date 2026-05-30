import { expect, test } from '../../fixtures';

test.describe('[Interactive] ToggleButton', () => {
    test('is unchecked by default', async ({ ToggleButton }) => {
        await expect(ToggleButton.input).not.toBeChecked();
    });

    test('click toggles to checked', async ({ ToggleButton }) => {
        await ToggleButton.root.click();

        await expect(ToggleButton.input).toBeChecked();
    });

    test('disabled state', async ({ ToggleButton }) => {
        await ToggleButton.navigate({ disabled: true });

        await expect(ToggleButton.input).toBeDisabled();
    });

    test('loading shows spinner and disables input', async ({ ToggleButton }) => {
        await ToggleButton.navigate({ isLoading: true });

        await expect(ToggleButton.spinner).toBeVisible();
        await expect(ToggleButton.input).toBeDisabled();
    });
});
