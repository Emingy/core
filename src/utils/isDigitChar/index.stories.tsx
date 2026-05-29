import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Typography } from '@emingy/core/ui/basic/Typography';
import { Flex } from '@emingy/core/ui/layout/Flex';

import { isDigitChar } from '.';

const Content = () => {
    const chars = ['A', '1', 'A1', '2a'];
    return (
        <Flex direction="column" gap="4x">
            {chars.map((char) => (
                <Typography.Large>
                    "{char}" is digit char? - {String(isDigitChar(char))}
                </Typography.Large>
            ))}
        </Flex>
    );
};

const meta: Meta = {
    title: 'Utils/isDigitChar',
    component: Content,
};

export default meta;

export const Demo = {};
