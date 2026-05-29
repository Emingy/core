import cls from 'classnames/bind';
import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Typography } from '@emingy/core/ui/basic/Typography';
import { Flex } from '@emingy/core/ui/layout/Flex';
import { PreviewCard } from '@storybook-components/PreviewCard';

import { getColorGroups } from './utils/getColorGroups';

import styles from './index.module.scss';

const BLOCK_NAME = 'Colors';
const cn = cls.bind(styles);

const Content = () => {
    const colors = getColorGroups();

    return (
        <Flex direction="column" gap="8x" className={cn(BLOCK_NAME)}>
            <Typography.Heading1 isBold={true}>Color Palette</Typography.Heading1>
            <Flex direction="column" gap="6x">
                {colors.map(({ groupName, vars }) => (
                    <Flex key={groupName} direction="column" gap="2x">
                        <Typography.Title className={cn(`${BLOCK_NAME}__group__name`)}>
                            {groupName}
                        </Typography.Title>
                        <Flex wrap={true} gap="4x">
                            {vars.map(({ name, value }) => (
                                <PreviewCard
                                    varKey={name}
                                    label={name.replace('--color-', '')}
                                    previewContent={
                                        <div
                                            className={cn(`${BLOCK_NAME}__group__item__preview`)}
                                            style={{
                                                backgroundColor: `${value}`,
                                            }}
                                        />
                                    }
                                    params={[name, value]}
                                />
                            ))}
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};

const meta: Meta = {
    title: 'Base/Colors',
    component: Content,
};

export default meta;

export const Demo = {};
