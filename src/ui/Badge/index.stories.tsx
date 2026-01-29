import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Flex } from '../Flex';
import { Typography } from '../Typography';

import { Badge, type TBadgeProps } from './src';

const meta: Meta = {
    title: 'UI/Badge',
    component: Badge,
    argTypes: {
        value: {
            type: 'string',
        },
    },
};

export default meta;

export const Demo = (props: TBadgeProps) => (
    <Flex direction="column" gap="10x">
        <Flex direction="row" gap="4x">
            <Typography.Heading3>Badge with value as string -</Typography.Heading3>
            <Badge {...props} />
        </Flex>
        <Flex direction="row" gap="4x">
            <Typography.Heading3>Badge with value as number -</Typography.Heading3>
            <Badge {...props} value={Number(props.value)} />
        </Flex>
    </Flex>
);
