import { expect, test } from '../../fixtures';

test.describe('[Interactive] Link', () => {
    test('is visible by default', async ({ Link }) => {
        await expect(Link.root).toBeVisible();
    });

    test('disabled adds disabled class', async ({ Link }) => {
        await Link.navigate({ disabled: true });

        await expect(Link.root).toBeVisible();
        expect(await Link.hasClass('Link__disabled')).toBe(true);
    });
});
