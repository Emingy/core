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
    },
    args: {
        type: 'default',
        isDisabled: false,
        isSelected: false,
    },
};

export default meta;

export const Demo = (props: TOptionProps) => <Option {...props}>Option</Option>;
