import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Flex, Typography } from '@emingy/core/ui';

import { isLetterChar } from '.';

const Content = () => {
    const chars = ['A', '1', 'A1', '2a'];
    return (
        <Flex direction="column" gap="4x">
            {chars.map((char) => (
                <Typography.Large>
                    "{char}" is letter char? - {String(isLetterChar(char))}
                </Typography.Large>
            ))}
        </Flex>
    );
};

const meta: Meta = {
    title: 'Utils/isLetterChar',
    component: Content,
};

export default meta;

export const Demo = {};
