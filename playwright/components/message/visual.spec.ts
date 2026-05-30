import { expect, test } from '../../fixtures';

const TYPES = ['success', 'warning', 'error'] as const;

const LONG_TITLE = 'This is a very long title that might wrap to the next line in the message';
const LONG_CONTENT =
    'This is a very long message that contains a lot of text to test how the component handles overflow and line wrapping in different layout scenarios';

const STATES = [
    { label: 'default', args: {} },
    { label: 'with title', args: { title: 'Notification' } },
    { label: 'with long title', args: { title: LONG_TITLE } },
    { label: 'with long content', args: { content: LONG_CONTENT } },
    {
        label: 'with title and long content',
        args: { title: 'Notification', content: LONG_CONTENT },
    },
    {
        label: 'with long title and long content',
        args: { title: LONG_TITLE, content: LONG_CONTENT },
    },
] as const;

test.describe('[Visual] Message', () => {
    for (const type of TYPES) {
        for (const { label, args } of STATES) {
            test(`${type} ${label}`, async ({ Message }) => {
                await Message.navigate({ type, ...args });
                await expect(Message.root).toHaveScreenshot();
            });
        }
    }
});
