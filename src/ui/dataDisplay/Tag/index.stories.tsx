import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Tag, type TTagProps } from './src';

const meta: Meta = {
    title: 'UI/DataDisplay/Tag',
    component: Tag,
};

export default meta;

export const Demo = (props: TTagProps) => <Tag {...props} />;
