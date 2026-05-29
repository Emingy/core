import cls from 'classnames/bind';
import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Typography } from '@emingy/core/ui/basic/Typography';
import { Flex } from '@emingy/core/ui/layout/Flex';
import { PreviewCard } from '@storybook-components/PreviewCard';

import { getSpacingVars } from './utils/getSpacingVars';

import styles from './index.module.scss';

const BLOCK_NAME = 'Spacing';
const cn = cls.bind(styles);

const Content = () => {
    const spacing = getSpacingVars();

    return (
        <Flex direction="column" gap="8x" className={cn(BLOCK_NAME)}>
            <Typography.Heading1 isBold={true}>Spacing</Typography.Heading1>
            <Flex direction="column" gap="6x">
                {spacing.map(({ name, value }) => (
                    <PreviewCard
                        varKey={name}
                        label={`Spacing ${name.replace('--spacing-', '')}`}
                        previewContent={
                            <div
                                className={cn(`${BLOCK_NAME}__item__preview`)}
                                style={{
                                    gap: value,
                                }}
                            >
                                <div style={{ padding: value }}>Content</div>
                                <div style={{ padding: value }}>Content</div>
                            </div>
                        }
                        params={[name]}
                        badges={[value]}
                        width={450}
                    />
                ))}
            </Flex>
        </Flex>
    );
};

const meta: Meta = {
    title: 'Base/Spacing',
    component: Content,
};

export default meta;

export const Demo = {};
