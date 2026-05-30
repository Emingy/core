import React from 'react';
import { fn } from 'storybook/test';
import type { Meta } from 'storybook-react-rsbuild';

import { Tag, type TTagProps } from './src';

const meta: Meta = {
    title: 'UI/DataDisplay/Tag',
    component: Tag,
    args: {
        onClick: fn(),
        onClose: fn(),
    },
};

export default meta;

export const Demo = (props: TTagProps) => <Tag {...props} />;
