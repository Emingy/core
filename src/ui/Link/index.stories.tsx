import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Link, type TLinkProps } from './src';

const meta: Meta = {
    title: 'UI/Link',
    component: Link,
    argTypes: {
        disabled: {
            type: 'boolean',
        },
    },
};

export default meta;

export const Demo = (props: TLinkProps) => <Link {...props}>Link</Link>;
