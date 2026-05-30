import { expect, test } from '../../fixtures';

const TYPES = ['text', 'number', 'password'] as const;

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
    { label: 'with prefix and value', args: { prefix: 'USD', value: '100' } },
    { label: 'with postfix and value', args: { postfix: 'kg', value: '50' } },
    {
        label: 'with prefix postfix and value',
        args: { prefix: 'USD', postfix: 'kg', value: '100' },
    },
    { label: 'disabled', args: { disabled: true } },
    { label: 'disabled with value', args: { disabled: true, value: 'Hello' } },
    { label: 'error', args: { error: true } },
    { label: 'error with value', args: { error: true, value: 'Hello' } },
    { label: 'error with title and value', args: { error: true, title: 'Label', value: 'Hello' } },
] as const;

test.describe('[Visual] Input', () => {
    for (const type of TYPES) {
        test(`type ${type}`, async ({ Input }) => {
            await Input.navigate({ type, value: 'Hello' });
            await expect(Input.root).toHaveScreenshot();
        });
    }

    for (const { label, args } of STATES) {
        test(label, async ({ Input }) => {
            await Input.navigate(args);
            await expect(Input.root).toHaveScreenshot();

            await test.step('hover', async () => {
                await Input.hover();
                await expect(Input.root).toHaveScreenshot();
            });
        });
    }

    test('mask empty', async ({ Input }) => {
        await Input.navigate({ mask: 'ddd-ddd' });
        await expect(Input.root).toHaveScreenshot();
    });

    test('mask filled', async ({ Input }) => {
        await Input.navigate({ mask: 'ddd-ddd' });
        await Input.input.fill('123456');
        await expect(Input.root).toHaveScreenshot();
    });
});
