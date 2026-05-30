import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Message, type TMessageProps } from './src';

const meta: Meta = {
    title: 'UI/DataDisplay/Message',
    component: Message,
    argTypes: {
        type: {
            control: 'radio',
            options: ['success', 'warning', 'error'],
        },
        title: {
            type: 'string',
        },
        content: {
            type: 'string',
        },
    },
    args: {
        type: 'success',
        content: 'Some message',
    },
};

export default meta;

export const Demo = (props: TMessageProps & { content: string }) => (
    <Message {...props}>{props.content}</Message>
);
