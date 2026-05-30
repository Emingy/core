import { expect, test } from '../../fixtures';

test.describe('[Visual] Spinner', () => {
    test('default', async ({ Spinner }) => {
        await expect(Spinner.root).toHaveScreenshot();
    });
});
