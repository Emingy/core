import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Option, type TOptionProps } from './src';

const meta: Meta = {
    title: 'UI/Controls/Option',
    component: Option,
    argTypes: {
        prefix: {
            type: 'string',
        },
        element: {
            control: 'radio',
            options: ['checkbox', 'button', 'link'],
        },
        to: {
            type: 'string',
        },
    },
    args: {
        type: 'default',
        element: 'checkbox',
        isDisabled: false,
        isSelected: false,
        to: '/',
    },
};

export default meta;

export const Demo = (props: TOptionProps) => <Option {...props}>Option</Option>;
