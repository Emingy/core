import { expect, test } from '../../fixtures';

test.describe('[Interactive] Avatar', () => {
    test('is visible and enabled by default', async ({ Avatar }) => {
        await expect(Avatar.root).toBeVisible();
        await expect(Avatar.root).toBeEnabled();
    });

    test('image is visible after load', async ({ Avatar }) => {
        await expect(Avatar.image).toBeVisible();
    });

    test('disabled prevents interaction', async ({ Avatar }) => {
        await Avatar.navigate({ disabled: true });

        await expect(Avatar.root).toBeDisabled();
    });
});
