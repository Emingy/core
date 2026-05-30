import { expect, test } from '../../fixtures';

test.describe('[Interactive] Toggle', () => {
    test('is unchecked by default', async ({ Toggle }) => {
        await expect(Toggle.input).not.toBeChecked();
    });

    test('click toggles to checked', async ({ Toggle }) => {
        await Toggle.root.click();

        await expect(Toggle.input).toBeChecked();
    });

    test('disabled prevents click', async ({ Toggle }) => {
        await Toggle.navigate({ disabled: true });

        await expect(Toggle.input).toBeDisabled();
    });
});
