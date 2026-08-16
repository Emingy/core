import { expect, test } from '../../fixtures';

const RESIZE_MODES = ['none', 'vertical', 'horizontal', 'both'] as const;

const STATES = [
    { label: 'default', args: {} },
    { label: 'with title', args: { title: 'Label' } },
    { label: 'with placeholder', args: { placeholder: 'Enter value' } },
    { label: 'with title and placeholder', args: { title: 'Label', placeholder: 'Enter value' } },
    { label: 'with prefix', args: { prefix: 'USD' } },
    { label: 'with postfix', args: { postfix: 'kg' } },
    { label: 'with prefix and postfix', args: { prefix: 'USD', postfix: 'kg' } },
    { label: 'with value', args: { value: 'Hello' } },
    { label: 'with title and value', args: { title: 'Label', value: 'Hello' } },
    { label: 'disabled', args: { disabled: true } },
    { label: 'disabled with value', args: { disabled: true, value: 'Hello' } },
    { label: 'error', args: { error: 'This field is required' } },
    { label: 'error with value', args: { error: 'This field is required', value: 'Hello' } },
    {
        label: 'error with title and value',
        args: { error: 'This field is required', title: 'Label', value: 'Hello' },
    },
    { label: 'with maxLength counter', args: { maxLength: 100, value: 'Hi' } },
    {
        label: 'with maxLength counter and postfix',
        args: { maxLength: 100, value: 'Hi', postfix: 'chars' },
    },
] as const;

test.describe('[Visual] Textarea', () => {
    for (const resize of RESIZE_MODES) {
        test(`resize ${resize}`, async ({ Textarea }) => {
            await Textarea.navigate({ resize });
            await expect(Textarea.root).toHaveScreenshot();
        });
    }

    for (const { label, args } of STATES) {
        test(label, async ({ Textarea }) => {
            await Textarea.navigate(args);
            await expect(Textarea.root).toHaveScreenshot();

            await test.step('hover', async () => {
                await Textarea.hover();
                await expect(Textarea.root).toHaveScreenshot();
            });
        });
    }

    test('custom size bounds', async ({ Textarea }) => {
        await Textarea.navigate({
            minWidth: '300px',
            maxWidth: '500px',
            minHeight: '150px',
            maxHeight: '300px',
        });
        await expect(Textarea.root).toHaveScreenshot();
    });

    test('multiline text with title, prefix, postfix and maxLength', async ({ Textarea }) => {
        await Textarea.navigate({
            title: 'Message',
            prefix: 'USD',
            postfix: 'chars',
            maxLength: 200,
        });
        await Textarea.textarea.fill('First line\nSecond line\nThird line');

        await expect(Textarea.root).toHaveScreenshot();
    });

    test('error tooltip', async ({ Textarea, page }) => {
        await Textarea.navigate({ error: 'This field is required' });
        await expect(page).toHaveScreenshot();
    });
});
