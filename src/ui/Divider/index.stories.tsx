import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Divider, type TDividerProps } from './src';

const meta: Meta = {
    title: 'UI/Divider',
    component: Divider,
    argTypes: {
        label: {
            type: 'string',
        },
    },
    args: {
        type: 'vertical',
    },
};

export default meta;

export const Demo = (props: TDividerProps) => (
    <div style={{ width: '100%', height: 400 }}>
        <Divider {...props} />
    </div>
);
