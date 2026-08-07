import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Textarea, type TTextareaProps } from './src';

const meta: Meta = {
    title: 'UI/Controls/Textarea',
    component: Textarea,
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
        resize: {
            control: 'radio',
            options: ['none', 'vertical', 'horizontal', 'both'],
        },
        minWidth: {
            type: 'string',
        },
        maxWidth: {
            type: 'string',
        },
        minHeight: {
            type: 'string',
        },
        maxHeight: {
            type: 'string',
        },
        maxLength: {
            type: 'number',
        },
        validate: {
            table: {
                disable: true,
            },
        },
    },
    args: {
        resize: 'none',
        minWidth: '100%',
        maxWidth: '100%',
        minHeight: 100,
        maxHeight: 400,
    },
};

export default meta;

export const Demo = (props: TTextareaProps) => <Textarea {...props} />;
