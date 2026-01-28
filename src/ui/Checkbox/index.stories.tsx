import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Checkbox, type TCheckboxProps } from './src';

const meta: Meta = {
    title: 'UI/Checkbox',
    component: Checkbox,
    argTypes: {
        description: {
            type: 'string',
        },
        error: {
            type: 'string',
        },
        disabled: {
            type: 'boolean',
        },
    },
    args: {
        label: 'Checkbox',
    },
};

export default meta;

export const Demo = (props: TCheckboxProps) => <Checkbox {...props} />;
