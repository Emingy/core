import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Spinner, type TSpinnerProps } from './src';

const meta: Meta = {
    title: 'UI/Spinner',
    component: Spinner,
};

export default meta;

export const Demo = (props: TSpinnerProps) => <Spinner {...props} />;
