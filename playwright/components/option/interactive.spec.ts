import { expect, test } from '../../fixtures';

test.describe('[Interactive] Option', () => {
    test('is unselected by default', async ({ Option }) => {
        await expect(Option.input).not.toBeChecked();
    });

    test('isSelected shows selected state', async ({ Option }) => {
        await Option.navigate({ isSelected: true });

        await expect(Option.input).toBeChecked();
    });

    test('isDisabled shows disabled state', async ({ Option }) => {
        await Option.navigate({ isDisabled: true });

        await expect(Option.input).toBeDisabled();
    });
});
