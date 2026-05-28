import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Radio, type TRadioProps } from './src';

const meta: Meta = {
    title: 'UI/Radio',
    component: Radio,
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
        checked: {
            type: 'boolean',
        },
    },
    args: {
        label: 'Radio',
        checked: false,
    },
};

export default meta;

export const Demo = (props: TRadioProps) => <Radio {...props} />;
