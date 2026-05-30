import { expect, test } from '../../fixtures';

test.describe('[Interactive] Badge', () => {
    test('is visible', async ({ Badge }) => {
        await expect(Badge.valueAsString).toBeVisible();
    });

    test('renders value text', async ({ Badge }) => {
        await Badge.navigate({ value: 'New' });

        await expect(Badge.valueAsString).toContainText('New');
    });

    test('numeric value above 99 shows 99+', async ({ Badge }) => {
        await Badge.navigate({ value: 100 });

        await expect(Badge.valueAsNumber).toContainText('99+');
    });

    test('type secondary is visible', async ({ Badge }) => {
        await Badge.navigate({ type: 'secondary' });

        await expect(Badge.valueAsString).toBeVisible();
    });
});
