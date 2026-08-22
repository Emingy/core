import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Button } from '@emingy/core/ui/controls/Button';
import { Option } from '@emingy/core/ui/controls/Option';

import { Dropdown, type TDropdownProps } from './src';

const ITEMS = ['Option one', 'Option two', 'Option three'];

const meta: Meta = {
    title: 'UI/Layout/Dropdown',
    component: Dropdown,
    argTypes: {
        content: {
            table: {
                disable: true,
            },
        },
        triggerMode: {
            control: 'select',
            options: ['click', 'hover', 'hover-click'],
            type: { name: 'string' },
        },
    },
    args: {
        direction: 'bottom',
        maxHeight: 240,
        triggerMode: 'click',
    },
};

export default meta;

type TDemoProps = Omit<TDropdownProps, 'triggerMode'> & {
    triggerMode?: 'click' | 'hover' | 'hover-click';
};

export const Demo = ({ triggerMode, ...props }: TDemoProps) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            height: '100vh',
        }}
    >
        <Dropdown
            {...props}
            triggerMode={
                triggerMode === 'hover-click' ? ['hover', 'click'] : [triggerMode ?? 'click']
            }
            content={ITEMS.map((item) => (
                <Option key={item} element="button">
                    {item}
                </Option>
            ))}
        >
            <Button>Toggle dropdown</Button>
        </Dropdown>
    </div>
);
