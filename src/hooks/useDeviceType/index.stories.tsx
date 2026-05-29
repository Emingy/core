import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Typography } from '@emingy/core/ui/basic/Typography';

import { useDeviceType } from './src';

const Content = () => {
    const deviceType = useDeviceType();

    return <Typography.Large>{JSON.stringify(deviceType)}</Typography.Large>;
};

const meta: Meta = {
    title: 'Hooks/useDeviceType',
    component: Content,
};

export default meta;

export const Demo = {};
