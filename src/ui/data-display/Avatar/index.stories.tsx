import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Avatar, type TAvatarProps } from './src';

const meta: Meta = {
    title: 'UI/Avatar',
    component: Avatar,
    args: {
        src: 'https://avatars.githubusercontent.com/u/52676421?s=64&v=4',
        disabled: false,
    },
};

export default meta;

export const Demo = (props: TAvatarProps) => <Avatar {...props} />;
