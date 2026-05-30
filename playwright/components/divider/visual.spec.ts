import { expect, test } from '../../fixtures';

const TYPES = ['vertical', 'horizontal'] as const;

const LABELS = [
    { label: 'no label', args: {} },
    { label: 'with label', args: { label: 'OR' } },
] as const;

test.describe('[Visual] Divider', () => {
    for (const type of TYPES) {
        for (const { label, args } of LABELS) {
            test(`${type} ${label}`, async ({ Divider }) => {
                await Divider.navigate({ type, ...args });
                await expect(Divider.root).toHaveScreenshot();
            });
        }
    }
});
