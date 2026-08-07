import { expect, test } from '../../fixtures';

test.describe('[Interactive] Textarea', () => {
    test('is visible and enabled by default', async ({ Textarea }) => {
        await expect(Textarea.textarea).toBeVisible();
        await expect(Textarea.textarea).toBeEnabled();
    });

    test('can type multiline text', async ({ Textarea }) => {
        await Textarea.textarea.fill('line 1\nline 2');

        await expect(Textarea.textarea).toHaveValue('line 1\nline 2');
    });

    test('value prop pre-fills the field', async ({ Textarea }) => {
        await Textarea.navigate({ value: 'pre-filled text' });

        await expect(Textarea.textarea).toHaveValue('pre-filled text');
    });

    test('error state is visible', async ({ Textarea }) => {
        await Textarea.navigate({ error: true });

        await expect(Textarea.root).toBeVisible();
    });

    test('disabled state prevents interaction', async ({ Textarea }) => {
        await Textarea.navigate({ disabled: true });

        await expect(Textarea.textarea).toBeDisabled();
    });

    test('prefix renders', async ({ Textarea }) => {
        await Textarea.navigate({ prefix: 'USD' });

        await expect(Textarea.prefix).toBeVisible();
    });

    test('postfix renders', async ({ Textarea }) => {
        await Textarea.navigate({ postfix: 'kg' });

        await expect(Textarea.postfix).toBeVisible();
    });

    test('resize is none by default', async ({ Textarea }) => {
        await expect(Textarea.root).toHaveCSS('resize', 'none');
    });

    test('resize prop sets vertical resize', async ({ Textarea }) => {
        await Textarea.navigate({ resize: 'vertical' });

        await expect(Textarea.root).toHaveCSS('resize', 'vertical');
    });

    test('resize prop sets horizontal resize', async ({ Textarea }) => {
        await Textarea.navigate({ resize: 'horizontal' });

        await expect(Textarea.root).toHaveCSS('resize', 'horizontal');
    });

    test('resize prop sets both resize', async ({ Textarea }) => {
        await Textarea.navigate({ resize: 'both' });

        await expect(Textarea.root).toHaveCSS('resize', 'both');
    });

    test('maxLength truncates typed input natively', async ({ Textarea }) => {
        await Textarea.navigate({ maxLength: 5 });
        await Textarea.textarea.fill('1234567890');

        await expect(Textarea.textarea).toHaveValue('12345');
    });

    test('counter is not rendered without maxLength', async ({ Textarea }) => {
        await expect(Textarea.counter).toHaveCount(0);
    });

    test('counter renders and updates as user types', async ({ Textarea }) => {
        await Textarea.navigate({ maxLength: 10 });

        await expect(Textarea.counter).toHaveText('0/10');

        await Textarea.textarea.fill('abc');

        await expect(Textarea.counter).toHaveText('3/10');
    });
});
