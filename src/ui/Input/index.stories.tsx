import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Input, type TInputProps } from './src';

const meta: Meta = {
    title: 'UI/Input',
    component: Input,
    argTypes: {
        prefix: {
            type: 'string',
        },
        postfix: {
            type: 'string',
        },
        value: {
            type: 'string',
        },
        type: {
            control: 'radio',
            options: ['text', 'number', 'password'],
        },
        validate: {
            table: {
                disable: true,
            },
        },
    },
};

export default meta;

export const Demo = (props: TInputProps) => <Input {...props} />;
