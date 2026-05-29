import React, { useEffect, useRef, useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Flex, Typography } from '@emingy/core/ui';

import { getElementPageRect } from '.';

type TRect = ReturnType<typeof getElementPageRect>;

const RectRow = ({ label, value }: { label: string; value: number }) => (
    <Flex gap="2x">
        <Typography.Base style={{ minWidth: 64, color: 'var(--color-grey-30)' }}>
            {label}
        </Typography.Base>
        <Typography.Base>{value.toFixed(2)}px</Typography.Base>
    </Flex>
);

const Content = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [rect, setRect] = useState<TRect | null>(null);

    const measure = () => {
        if (ref.current) {
            setRect(getElementPageRect(ref.current));
        }
    };

    useEffect(() => {
        measure();
    }, []);

    return (
        <Flex direction="column" gap="6x" style={{ padding: 32 }}>
            <div
                ref={ref}
                style={{
                    width: 200,
                    height: 80,
                    background: 'var(--color-purple-50)',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                }}
                onClick={measure}
            >
                <Typography.Base style={{ color: 'var(--color-grey-10)' }}>
                    Target element
                </Typography.Base>
            </div>

            <Typography.Micro style={{ color: 'var(--color-grey-30)' }}>
                Click the box to re-measure
            </Typography.Micro>

            {rect && (
                <Flex direction="column" gap="2x">
                    <Typography.Base style={{ marginBottom: 4 }}>
                        getElementPageRect result:
                    </Typography.Base>
                    <RectRow label="left" value={rect.left} />
                    <RectRow label="top" value={rect.top} />
                    <RectRow label="right" value={rect.right} />
                    <RectRow label="bottom" value={rect.bottom} />
                    <RectRow label="width" value={rect.width} />
                    <RectRow label="height" value={rect.height} />
                </Flex>
            )}
        </Flex>
    );
};

const meta: Meta = {
    title: 'Utils/getElementPageRect',
    component: Content,
};

export default meta;

export const Demo = {};
