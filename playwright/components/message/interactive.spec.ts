import { expect, test } from '../../fixtures';

test.describe('[Interactive] Message', () => {
    test('is visible', async ({ Message }) => {
        await expect(Message.root).toBeVisible();
    });

    test('renders title text', async ({ Message }) => {
        await Message.navigate({ title: 'Operation completed' });

        await expect(Message.root).toContainText('Operation completed');
    });

    test('renders content text', async ({ Message }) => {
        await Message.navigate({ content: 'Details here' });

        await expect(Message.root).toContainText('Details here');
    });

    test('type success is visible', async ({ Message }) => {
        await Message.navigate({ type: 'success' });

        await expect(Message.root).toBeVisible();
    });

    test('type warning is visible', async ({ Message }) => {
        await Message.navigate({ type: 'warning' });

        await expect(Message.root).toBeVisible();
    });

    test('type error is visible', async ({ Message }) => {
        await Message.navigate({ type: 'error' });

        await expect(Message.root).toBeVisible();
    });
});
