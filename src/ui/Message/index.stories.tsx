import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Message, type TMessageProps } from './src';

const meta: Meta = {
    title: 'UI/Message',
    component: Message,
    argTypes: {
        type: {
            control: 'radio',
            options: ['success', 'warning', 'error'],
        },
        title: {
            type: 'string',
        },
    },
    args: {
        type: 'success',
    },
};

export default meta;

export const Demo = (props: TMessageProps) => <Message {...props}>Some message</Message>;
