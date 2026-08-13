import { expect, test } from '../../fixtures';

test.describe('[Interactive] Avatar', () => {
    test('is visible by default', async ({ Avatar }) => {
        await expect(Avatar.root).toBeVisible();
    });

    test('renders as a div by default', async ({ Avatar }) => {
        const tagName = await Avatar.root.evaluate((el) => el.tagName);

        expect(tagName).toBe('DIV');
    });

    test('has no href by default', async ({ Avatar }) => {
        await expect(Avatar.root).not.toHaveAttribute('href');
    });

    test('image is visible after load', async ({ Avatar }) => {
        await expect(Avatar.image).toBeVisible();
    });

    test.describe('without src', () => {
        test('shows the person icon placeholder', async ({ Avatar }) => {
            await Avatar.navigate({ src: '' }, false);

            await expect(Avatar.placeholderIcon).toBeVisible();
            await expect(Avatar.spinner).toHaveCount(0);
        });
    });

    test.describe('with onClick', () => {
        test('renders as an enabled button', async ({ Avatar }) => {
            await Avatar.navigate({ onClick: 'clicked' });

            const tagName = await Avatar.root.evaluate((el) => el.tagName);
            expect(tagName).toBe('BUTTON');
            await expect(Avatar.root).toBeEnabled();
        });

        test('can be focused via keyboard', async ({ Avatar }) => {
            await Avatar.navigate({ onClick: 'clicked' });

            await Avatar.root.focus();

            await expect(Avatar.root).toBeFocused();
        });

        test('disabled prevents interaction', async ({ Avatar }) => {
            await Avatar.navigate({ onClick: 'clicked', disabled: true });

            await expect(Avatar.root).toBeDisabled();
        });
    });

    test.describe('with to', () => {
        test('renders a link with the given href', async ({ Avatar }) => {
            await Avatar.navigate({ to: 'profile' });

            await expect(Avatar.root).toHaveAttribute('href', '/profile');
        });

        test('navigates within the app without a full page reload when clicked', async ({
            Avatar,
            page,
        }) => {
            await Avatar.navigate({ to: 'profile' });
            const pathnameBeforeClick = new URL(page.url()).pathname;

            await Avatar.root.click();

            expect(new URL(page.url()).pathname).toBe(pathnameBeforeClick);
            await expect(Avatar.root).toBeVisible();
        });

        test('can be focused via keyboard', async ({ Avatar }) => {
            await Avatar.navigate({ to: 'profile' });

            await Avatar.root.focus();

            await expect(Avatar.root).toBeFocused();
        });
    });

    test.describe('with href', () => {
        test('renders a link with the given href', async ({ Avatar }) => {
            await Avatar.navigate({ href: 'external' });

            await expect(Avatar.root).toHaveAttribute('href', 'https://example.com');
        });
    });
});
