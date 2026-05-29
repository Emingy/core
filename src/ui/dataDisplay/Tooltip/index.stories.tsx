import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Typography } from '../../basic';

import type { TTooltipProps } from './src';
import { Tooltip } from './src';

const meta: Meta = {
    title: 'UI/DataDisplay/Tooltip',
    component: Tooltip,
    argTypes: {
        text: {
            type: 'string',
        },
    },
};

export default meta;

export const Demo = (props: TTooltipProps) => (
    <div style={{ margin: 64 }}>
        <Tooltip {...props}>
            <Typography.Base>Tooltip target</Typography.Base>
        </Tooltip>
    </div>
);
