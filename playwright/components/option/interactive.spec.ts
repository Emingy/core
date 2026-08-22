import { expect, test } from '../../fixtures';

// Note: Storybook's args URL codec breaks on any "/" inside a string value —
// pass a single path segment (e.g. 'about') for `to`; react-router still
// resolves it to an absolute href ('/about') against the root route.

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

    test('element="button" renders a native button with no checkbox', async ({ Option }) => {
        await Option.navigate({ element: 'button' });

        await expect(Option.root).toHaveJSProperty('tagName', 'BUTTON');
        await expect(Option.input).toHaveCount(0);
    });

    test('element="button" is enabled and clickable by default', async ({ Option }) => {
        await Option.navigate({ element: 'button' });

        await expect(Option.root).toBeEnabled();
        await Option.root.click();
    });

    test('element="button" is disabled via isDisabled', async ({ Option }) => {
        await Option.navigate({ element: 'button', isDisabled: true });

        await expect(Option.root).toBeDisabled();
    });

    test('element="link" renders an anchor with the given href and no checkbox', async ({
        Option,
    }) => {
        await Option.navigate({ element: 'link', to: 'about' });

        await expect(Option.root).toHaveJSProperty('tagName', 'A');
        await expect(Option.root).toHaveAttribute('href', '/about');
        await expect(Option.input).toHaveCount(0);
    });

    test('element="link" is clickable by default', async ({ Option }) => {
        await Option.navigate({ element: 'link', to: 'about' });

        await expect(Option.root).not.toHaveAttribute('aria-disabled', 'true');
        await Option.root.click();
    });

    test('element="link" applies aria-disabled and tabindex="-1" via isDisabled', async ({
        Option,
    }) => {
        await Option.navigate({ element: 'link', to: 'about', isDisabled: true });

        await expect(Option.root).toHaveAttribute('aria-disabled', 'true');
        await expect(Option.root).toHaveAttribute('tabindex', '-1');
    });
});
