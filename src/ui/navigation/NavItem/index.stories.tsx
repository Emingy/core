import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { HomeIcon, Icon } from '@emingy/core/ui/basic/Icon';

import { NavItem, type TNavItemProps } from './src';

const meta: Meta = {
    title: 'UI/Navigation/NavItem',
    component: NavItem,
    argTypes: {
        prefix: {
            table: {
                disable: true,
            },
        },
        tags: {
            table: {
                disable: true,
            },
        },
        badge: {
            table: {
                disable: true,
            },
        },
        showSubItems: {
            type: 'boolean',
        },
        active: {
            type: 'boolean',
        },
        disabled: {
            type: 'boolean',
        },
        showTag: {
            type: 'boolean',
        },
        showBadge: {
            type: 'boolean',
        },
    },
    args: {
        // Deliberately not "/" — the surrounding MemoryRouter's initial route is "/",
        // so matching it here would make the item look active by default and hide
        // the difference between the "active" prop and router-driven matching.
        to: '/dashboard',
        label: 'Dashboard',
        showSubItems: false,
        showTag: false,
        showBadge: false,
        active: false,
        disabled: false,
    },
};

export default meta;

export const Demo = ({
    showTag,
    showBadge,
    showSubItems,
    ...restProps
}: TNavItemProps & { showTag?: boolean; showBadge?: boolean; showSubItems?: boolean }) => (
    <div style={{ width: '50%' }}>
        <NavItem
            {...restProps}
            prefix={<Icon icon={HomeIcon} size="sm" />}
            tags={showTag ? [{ text: 'New', color: 'green', size: 'sm' }] : undefined}
            badge={showBadge ? { value: 3 } : undefined}
            subItems={
                showSubItems
                    ? [
                          { to: '/dashboard/overview', label: 'Overview' },
                          {
                              to: '/dashboard/reports',
                              label: 'Reports',
                              tags: [{ text: 'New', color: 'green', size: 'sm' }],
                          },
                          {
                              to: '/dashboard/inbox',
                              label: 'Inbox',
                              badge: { value: 5 },
                          },
                          {
                              to: '/dashboard/notifications',
                              label: 'Notifications',
                              tags: [{ text: 'Beta', color: 'purple', size: 'sm' }],
                              badge: { value: 2 },
                          },
                          {
                              to: '/dashboard/settings',
                              label: 'Settings',
                              subItems: [
                                  { to: '/dashboard/settings/profile', label: 'Profile' },
                                  { to: '/dashboard/settings/security', label: 'Security' },
                              ],
                          },
                      ]
                    : undefined
            }
        />
    </div>
);
