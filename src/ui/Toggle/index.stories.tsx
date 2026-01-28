import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Toggle, type TToggleProps } from './src';

const meta: Meta = {
    title: 'UI/Toggle',
    component: Toggle,
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
        label: 'Toggle',
    },
};

export default meta;

export const Demo = (props: TToggleProps) => <Toggle {...props} />;
