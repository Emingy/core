import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { ToggleButton, type TToggleButtonProps } from './src';

const meta: Meta = {
    title: 'UI/ToggleButton',
    component: ToggleButton,
    argTypes: {
        prefix: {
            type: 'string',
        },
        postfix: {
            type: 'string',
        },
        isLoading: {
            type: 'boolean',
        },
        disabled: {
            type: 'boolean',
        },
    },
    args: {
        isLoading: false,
    },
};

export default meta;

export const Demo = (props: TToggleButtonProps) => <ToggleButton {...props}>Toggle</ToggleButton>;
