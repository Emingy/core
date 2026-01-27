import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Button, type TButtonProps } from './src';

const meta: Meta = {
    title: 'UI/Button',
    component: Button,
    argTypes: {
        prefix: {
            type: 'string',
        },
        postfix: {
            type: 'string',
        },
        splitted: {
            type: 'boolean',
        },
        href: {
            table: {
                disable: true,
            },
        },
        navigateOptions: {
            table: {
                disable: true,
            },
        },
    },
    args: {
        size: 'md',
        type: 'primary',
    },
};

export default meta;

export const Demo = (props: TButtonProps) => <Button {...props}>Button</Button>;
