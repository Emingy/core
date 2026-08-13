import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Typography } from '@emingy/core/ui/basic/Typography';
import { Flex } from '@emingy/core/ui/layout/Flex';

import { omitProp } from '.';

const Content = () => {
    const source = { label: 'Reports', to: '/reports', containerRef: { current: null } };
    const result = omitProp(source, 'containerRef');

    return (
        <Flex direction="column" gap="4x">
            <Typography.Large>
                Source: {JSON.stringify({ ...source, containerRef: '…' })}
            </Typography.Large>
            <Typography.Large>
                omitProp(source, "containerRef"): {JSON.stringify(result)}
            </Typography.Large>
        </Flex>
    );
};

const meta: Meta = {
    title: 'Utils/omitProp',
    component: Content,
};

export default meta;

export const Demo = {};
