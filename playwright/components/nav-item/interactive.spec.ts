import { expect, test } from '../../fixtures';

test.describe('[Interactive] NavItem', () => {
    test('is visible by default', async ({ NavItem }) => {
        await expect(NavItem.root).toBeVisible();
    });

    test('renders the label', async ({ NavItem }) => {
        await expect(NavItem.root).toContainText('Dashboard');
    });

    test('active adds active class', async ({ NavItem }) => {
        await NavItem.navigate({ active: true });

        expect(await NavItem.hasClass('NavItem__active')).toBe(true);
    });

    test('disabled adds disabled class', async ({ NavItem }) => {
        await NavItem.navigate({ disabled: true });

        expect(await NavItem.hasClass('NavItem__disabled')).toBe(true);
    });

    test('subItems renders a trailing chevron icon', async ({ NavItem }) => {
        await NavItem.navigate({ showSubItems: true });

        await expect(NavItem.chevron).toBeVisible();
    });

    test('does not render a chevron by default', async ({ NavItem }) => {
        await expect(NavItem.chevron).toHaveCount(0);
    });

    test('renders the prefix icon by default', async ({ NavItem }) => {
        await expect(NavItem.prefix).toBeVisible();
        await expect(NavItem.prefix.locator('svg')).toBeVisible();
    });

    test('renders tags when showTag is set', async ({ NavItem }) => {
        await NavItem.navigate({ showTag: true });

        await expect(NavItem.tags.first()).toBeVisible();
        await expect(NavItem.tags.first()).toContainText('New');
    });

    test('does not render tags by default', async ({ NavItem }) => {
        await expect(NavItem.tags).toHaveCount(0);
    });

    test('renders a badge when showBadge is set', async ({ NavItem }) => {
        await NavItem.navigate({ showBadge: true });

        await expect(NavItem.badge).toBeVisible();
        await expect(NavItem.badge).toContainText('3');
    });

    test('does not render a badge by default', async ({ NavItem }) => {
        await expect(NavItem.badge).toHaveCount(0);
    });

    test('is not active by default when the route does not match "to"', async ({ NavItem }) => {
        expect(await NavItem.hasClass('NavItem__active')).toBe(false);
    });

    test('renders an href matching the default "to"', async ({ NavItem }) => {
        await expect(NavItem.root).toHaveAttribute('href', '/dashboard');
    });

    test('navigates within the app without a full page reload when clicked', async ({
        NavItem,
        page,
    }) => {
        const pathnameBeforeClick = new URL(page.url()).pathname;

        await NavItem.click();

        expect(new URL(page.url()).pathname).toBe(pathnameBeforeClick);
        await expect(NavItem.root).toBeVisible();
    });

    test('can be focused via keyboard', async ({ NavItem }) => {
        await NavItem.root.focus();

        await expect(NavItem.root).toBeFocused();
    });

    test('activates via Enter key without a full page reload', async ({ NavItem, page }) => {
        const pathnameBeforeActivation = new URL(page.url()).pathname;

        await NavItem.root.focus();
        await page.keyboard.press('Enter');

        expect(new URL(page.url()).pathname).toBe(pathnameBeforeActivation);
        await expect(NavItem.root).toBeVisible();
    });

    test('remains keyboard-focusable when disabled (visual-only disabled state, same as Link)', async ({
        NavItem,
    }) => {
        await NavItem.navigate({ disabled: true });

        await NavItem.root.focus();

        await expect(NavItem.root).toBeFocused();
    });

    test.describe('with subItems', () => {
        test('submenu is not rendered before the trigger is hovered', async ({ NavItem }) => {
            await NavItem.navigate({ showSubItems: true });

            await expect(NavItem.submenus).toHaveCount(0);
        });

        test('hovering the trigger reveals all subItems', async ({ NavItem }) => {
            await NavItem.navigate({ showSubItems: true });
            await NavItem.openSubmenu();

            await expect(NavItem.submenu).toContainText('Overview');
            await expect(NavItem.submenu).toContainText('Reports');
            await expect(NavItem.submenu).toContainText('Inbox');
            await expect(NavItem.submenu).toContainText('Notifications');
            await expect(NavItem.submenu).toContainText('Settings');
        });

        test('submenu links have the expected hrefs', async ({ NavItem }) => {
            await NavItem.navigate({ showSubItems: true });
            await NavItem.openSubmenu();

            await expect(NavItem.submenu.getByRole('link', { name: 'Overview' })).toHaveAttribute(
                'href',
                '/dashboard/overview'
            );
            await expect(NavItem.submenu.getByRole('link', { name: 'Reports' })).toHaveAttribute(
                'href',
                '/dashboard/reports'
            );
        });

        test('clicking the trigger does not open the submenu (hover-only trigger mode)', async ({
            NavItem,
            page,
        }) => {
            await NavItem.navigate({ showSubItems: true });

            await NavItem.click();
            await page.mouse.move(0, 0);

            await expect(NavItem.submenus).toHaveCount(0);
        });

        test('clicking the trigger still navigates within the app', async ({ NavItem, page }) => {
            await NavItem.navigate({ showSubItems: true });
            const pathnameBeforeClick = new URL(page.url()).pathname;

            await NavItem.click();

            expect(new URL(page.url()).pathname).toBe(pathnameBeforeClick);
            await expect(NavItem.root).toBeVisible();
        });

        test('closes on outside click', async ({ NavItem, page }) => {
            await NavItem.navigate({ showSubItems: true });
            await NavItem.openSubmenu();

            await page.mouse.click(5, 5);

            for (const submenu of await NavItem.submenus.all()) {
                await expect(submenu.isHidden());
            }
        });

        test('closes on Escape', async ({ NavItem, page }) => {
            await NavItem.navigate({ showSubItems: true });
            await NavItem.openSubmenu();

            await page.keyboard.press('Escape');

            for (const submenu of await NavItem.submenus.all()) {
                await expect(submenu.isHidden());
            }
        });

        test('hovering a sub-item with its own subItems opens a nested submenu', async ({
            NavItem,
        }) => {
            await NavItem.navigate({ showSubItems: true });
            await NavItem.openSubmenu();
            await NavItem.openNestedSubmenu('Settings');

            await expect(NavItem.submenus).toHaveCount(2);
            await expect(NavItem.submenus.nth(1)).toContainText('Profile');
            await expect(NavItem.submenus.nth(1)).toContainText('Security');
        });

        test('disabled item does not open the submenu on hover', async ({ NavItem }) => {
            await NavItem.navigate({ showSubItems: true, disabled: true });

            await NavItem.root.hover({ force: true });

            await expect(NavItem.submenus).toHaveCount(0);
        });
    });
});
