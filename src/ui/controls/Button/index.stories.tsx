import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Option } from '@emingy/core/ui/controls/Option';

import { Button, type TButtonProps } from './src';

const meta: Meta = {
    title: 'UI/Controls/Button',
    component: Button,
    argTypes: {
        prefix: {
            type: 'string',
        },
        postfix: {
            type: 'string',
        },
        splitted: {
            type: 'boolean',
        },
        dropdownContent: {
            table: {
                disable: true,
            },
        },
        href: {
            table: {
                disable: true,
            },
        },
        navigateOptions: {
            table: {
                disable: true,
            },
        },
        isLoading: {
            type: 'boolean',
        },
        isFullWidth: {
            type: 'boolean',
        },
    },
    args: {
        size: 'md',
        type: 'primary',
        variant: 'filled',
        isLoading: false,
    },
};

export default meta;

export const Demo = (props: TButtonProps) =>
    props.splitted ? (
        <Button
            {...props}
            dropdownContent={
                <>
                    <Option element="button">Option one</Option>
                    <Option element="button">Option two</Option>
                </>
            }
        >
            Button
        </Button>
    ) : (
        <Button {...props}>Button</Button>
    );
