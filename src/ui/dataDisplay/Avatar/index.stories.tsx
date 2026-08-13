import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Avatar, type TAvatarProps } from './src';

const meta: Meta = {
    title: 'UI/DataDisplay/Avatar',
    component: Avatar,
    argTypes: {
        onClick: {
            type: { name: 'string' },
            options: ['none', 'clicked'],
            mapping: {
                none: undefined,
                clicked: () => {},
            },
            control: { type: 'select' },
        },
        to: {
            type: { name: 'string' },
            options: ['none', 'profile'],
            mapping: {
                none: undefined,
                profile: '/profile',
            },
            control: { type: 'select' },
        },
        href: {
            type: { name: 'string' },
            options: ['none', 'external'],
            mapping: {
                none: undefined,
                external: 'https://example.com',
            },
            control: { type: 'select' },
        },
    },
    args: {
        src: '/static/avatar-placeholder.svg',
        disabled: false,
        onClick: 'none',
        to: 'none',
        href: 'none',
    },
};

export default meta;

export const Demo = (props: TAvatarProps) => <Avatar {...props} />;
