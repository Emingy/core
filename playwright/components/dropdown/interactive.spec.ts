import { expect, test } from '../../fixtures';

test.describe('[Interactive] Dropdown', () => {
    test('trigger is visible', async ({ Dropdown }) => {
        await expect(Dropdown.trigger).toBeVisible();
    });

    test('panel is hidden before trigger click', async ({ Dropdown }) => {
        await expect(Dropdown.panel).not.toBeVisible();
    });

    test('click on trigger shows panel', async ({ Dropdown }) => {
        await Dropdown.open();

        await expect(Dropdown.panel).toBeVisible();
    });

    test('click on trigger again hides panel', async ({ Dropdown }) => {
        await Dropdown.open();
        await Dropdown.trigger.click();

        await expect(Dropdown.panel).not.toBeVisible();
    });

    test('click outside hides panel', async ({ Dropdown, page }) => {
        await Dropdown.open();
        await page.mouse.click(5, 5);

        await expect(Dropdown.panel).not.toBeVisible();
    });

    test('Escape hides panel', async ({ Dropdown, page }) => {
        await Dropdown.open();
        await page.keyboard.press('Escape');

        await expect(Dropdown.panel).not.toBeVisible();
    });

    test.describe('hover trigger mode', () => {
        test('opens on hover', async ({ Dropdown }) => {
            await Dropdown.navigate({ triggerMode: 'hover' });

            await Dropdown.trigger.hover();

            await expect(Dropdown.panel).toBeVisible();
        });

        test('click does not toggle the panel closed', async ({ Dropdown }) => {
            await Dropdown.navigate({ triggerMode: 'hover' });

            // Клик сначала наводит курсор на триггер, поэтому панель уже открыта через hover —
            // здесь проверяется, что сам клик не работает как отдельный тоггл поверх этого.
            await Dropdown.trigger.click();
            await expect(Dropdown.panel).toBeVisible();

            await Dropdown.trigger.click();
            await expect(Dropdown.panel).toBeVisible();
        });

        test('closes after the pointer leaves the trigger and the panel', async ({
            Dropdown,
            page,
        }) => {
            await Dropdown.navigate({ triggerMode: 'hover' });

            await Dropdown.trigger.hover();
            await expect(Dropdown.panel).toBeVisible();

            await page.mouse.move(5, 5);

            await expect(Dropdown.panel).not.toBeVisible();
        });

        test('stays open when the pointer moves from the trigger to the panel', async ({
            Dropdown,
        }) => {
            await Dropdown.navigate({ triggerMode: 'hover' });

            await Dropdown.trigger.hover();
            await expect(Dropdown.panel).toBeVisible();

            await Dropdown.panel.hover();

            await expect(Dropdown.panel).toBeVisible();
        });
    });

    test.describe('hover and click trigger mode', () => {
        test('opens on hover', async ({ Dropdown }) => {
            await Dropdown.navigate({ triggerMode: 'hover-click' });

            await Dropdown.trigger.hover();

            await expect(Dropdown.panel).toBeVisible();
        });

        test('also toggles on click', async ({ Dropdown }) => {
            await Dropdown.navigate({ triggerMode: 'hover-click' });

            await Dropdown.trigger.click();

            await expect(Dropdown.panel).toBeVisible();
        });
    });
});
