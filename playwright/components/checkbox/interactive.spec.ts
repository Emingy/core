import { expect, test } from '../../fixtures';

test.describe('[Interactive] Checkbox', () => {
    test('is unchecked by default', async ({ Checkbox }) => {
        await expect(Checkbox.input).not.toBeChecked();
    });

    test('click toggles to checked', async ({ Checkbox }) => {
        await Checkbox.root.click();

        await expect(Checkbox.input).toBeChecked();
    });

    test('disabled prevents click', async ({ Checkbox }) => {
        await Checkbox.navigate({ disabled: true });

        await expect(Checkbox.input).toBeDisabled();
    });
});
