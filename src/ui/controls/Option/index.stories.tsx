import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Option, type TOptionProps } from './src';

const meta: Meta = {
    title: 'UI/Option',
    component: Option,
    argTypes: {
        prefix: {
            type: 'string',
        },
    },
    args: {
        isDisabled: false,
        isSelected: false,
    },
};

export default meta;

export const Demo = (props: TOptionProps) => <Option {...props}>Option</Option>;
