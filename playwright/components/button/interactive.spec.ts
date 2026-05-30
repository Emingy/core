import { expect, test } from '../../fixtures';

test.describe('[Interactive] Button', () => {
    test('is visible and enabled by default', async ({ Button }) => {
        await expect(Button.button).toBeVisible();
        await expect(Button.button).toBeEnabled();
    });

    test('is clickable', async ({ Button }) => {
        await Button.click();

        await expect(Button.button).toBeEnabled();
    });

    test('can be focused via keyboard', async ({ Button }) => {
        await Button.button.focus();

        await expect(Button.button).toBeFocused();
    });

    test('disabled is not clickable', async ({ Button }) => {
        await Button.navigate({ disabled: true });

        await expect(Button.button).toBeDisabled();
    });

    test('loading shows spinner and disables button', async ({ Button }) => {
        await Button.navigate({ isLoading: true });

        await expect(Button.spinner).toBeVisible();
        await expect(Button.button).toBeDisabled();
    });

    test('split renders two interactive buttons', async ({ Button }) => {
        await Button.navigate({ splitted: true });

        await expect(Button.button).toBeVisible();
        await expect(Button.splitButton).toBeVisible();
        await expect(Button.button).toBeEnabled();
        await expect(Button.splitButton).toBeEnabled();
    });
});
