import { expect, test } from '../../fixtures';

// Note: Storybook arg format treats $ and # as special characters.
// Use plain strings for prefix/postfix values (e.g. 'USD', 'kg').
// Mask syntax: use repeated characters (ddd-ddd) not brace notation (d{3}-d{3}).

test.describe('[Interactive] Input', () => {
    test('is visible and enabled by default', async ({ Input }) => {
        await expect(Input.input).toBeVisible();
        await expect(Input.input).toBeEnabled();
    });

    test('can type text', async ({ Input }) => {
        await Input.input.fill('Hello world');

        await expect(Input.input).toHaveValue('Hello world');
    });

    test('value prop pre-fills the input', async ({ Input }) => {
        await Input.navigate({ value: 'pre-filled text' });

        await expect(Input.input).toHaveValue('pre-filled text');
    });

    test('error state is visible', async ({ Input }) => {
        await Input.navigate({ error: 'This field is required' });

        await expect(Input.root).toBeVisible();
    });

    test('error with typed value', async ({ Input }) => {
        await Input.navigate({ error: 'This field is required' });
        await Input.input.fill('invalid');

        await expect(Input.input).toHaveValue('invalid');
    });

    test('error message appears in a tooltip above the field', async ({ Input, page }) => {
        await Input.navigate({ error: 'This field is required' });

        const tooltip = page.locator('[class*="TooltipContainer"]');
        await expect(tooltip).toContainText('This field is required');
    });

    test('disabled state prevents interaction', async ({ Input }) => {
        await Input.navigate({ disabled: true });

        await expect(Input.input).toBeDisabled();
    });

    test('prefix renders', async ({ Input }) => {
        await Input.navigate({ prefix: 'USD' });

        await expect(Input.prefix).toBeVisible();
    });

    test('postfix renders', async ({ Input }) => {
        await Input.navigate({ postfix: 'kg' });

        await expect(Input.postfix).toBeVisible();
    });

    test('type password changes input type', async ({ Input }) => {
        await Input.navigate({ type: 'password' });

        await expect(Input.input).toHaveAttribute('type', 'password');
    });

    test('mask shows formatted placeholder', async ({ Input }) => {
        await Input.navigate({ mask: 'ddd-ddd' });

        await expect(Input.maskPlaceholder).toBeVisible();
        await expect(Input.maskPlaceholder).toHaveText('111-111');
    });

    test('mask formats typed digits', async ({ Input }) => {
        await Input.navigate({ mask: 'ddd-ddd' });
        await Input.input.fill('123456');

        await expect(Input.input).toHaveValue('123-456');
    });
});
