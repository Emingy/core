import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Typography } from '@emingy/core/ui/basic/Typography';
import { Flex } from '@emingy/core/ui/layout/Flex';

import { isExternalUrl } from '.';

const Content = () => {
    const urls = [
        '/dashboard',
        'dashboard',
        'https://example.com',
        'http://example.com',
        'mailto:test@example.com',
    ];
    return (
        <Flex direction="column" gap="4x">
            {urls.map((url) => (
                <Typography.Large>
                    "{url}" is external? - {String(isExternalUrl(url))}
                </Typography.Large>
            ))}
        </Flex>
    );
};

const meta: Meta = {
    title: 'Utils/isExternalUrl',
    component: Content,
};

export default meta;

export const Demo = {};
