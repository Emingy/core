import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import type { TFlexProps } from './src';
import { Flex } from './src';

const meta: Meta = {
    title: 'UI/Flex',
    component: Flex,
    argTypes: {
        countNodes: {
            control: {
                type: 'number',
                min: 1,
            },
            description: 'only for demo',
        },
    },
    args: {
        countNodes: 2,
    },
};

export default meta;

export const Demo = ({ countNodes, ...flexProps }: { countNodes: number } & TFlexProps) => (
    <Flex {...flexProps} style={{ width: '100%', border: '4px solid red', borderRadius: 16 }}>
        {new Array(countNodes).fill('').map((_, i) => (
            <div
                key={i}
                style={{
                    width: 100,
                    height: 100,
                    background: 'red',
                    borderRadius: 16,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: 16,
                }}
            >
                {i}
            </div>
        ))}
    </Flex>
);
