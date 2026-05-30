import { expect, test } from '../../fixtures';

test.describe('[Interactive] Tag', () => {
    test('is visible', async ({ Tag }) => {
        await expect(Tag.root).toBeVisible();
    });

    test('closable shows close button', async ({ Tag }) => {
        await Tag.navigate({ closable: true });

        await expect(Tag.closeButton).toBeVisible();
    });

    test('color grey applies grey class', async ({ Tag }) => {
        await Tag.navigate({ color: 'grey' });

        expect(await Tag.hasClass('Tag__grey')).toBe(true);
    });

    test('size sm applies small class', async ({ Tag }) => {
        await Tag.navigate({ size: 'sm' });

        expect(await Tag.hasClass('Tag__small')).toBe(true);
    });
});
