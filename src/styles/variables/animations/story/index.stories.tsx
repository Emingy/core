import cls from 'classnames/bind';
import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Typography } from '@emingy/core/ui/basic/Typography';
import { Flex } from '@emingy/core/ui/layout/Flex';
import { PreviewCard } from '@storybook-components/PreviewCard';

import { getAnimationDurationVars } from './utils/getAnimationDurationVars';
import { getAnimationEasingVars } from './utils/getAnimationEasingVars';

import styles from './index.module.scss';

const BLOCK_NAME = 'Animations';
const cn = cls.bind(styles);

const Content = () => {
    const animationDurationVars = getAnimationDurationVars();
    const animationEasingVars = getAnimationEasingVars();

    return (
        <Flex direction="column" gap="8x" className={cn(BLOCK_NAME)}>
            <Typography.Heading1 isBold={true}>Animations</Typography.Heading1>
            <Flex direction="column" gap="6x">
                {animationDurationVars.map((durationVar) => (
                    <Flex key={durationVar.name} direction="column" gap="2x">
                        <Typography.Title>
                            Animation duration "
                            {durationVar.name.replace('--animation-duration-', '')}"
                        </Typography.Title>
                        <Flex wrap={true} gap="4x">
                            {animationEasingVars.map((easingVar) => (
                                <PreviewCard
                                    varKey={easingVar.name}
                                    label={easingVar.name.replace('--animation-easing-', '')}
                                    previewContent={
                                        <div
                                            className={cn(`${BLOCK_NAME}__bounce`)}
                                            style={{
                                                animationTimingFunction: easingVar.value,
                                                animationDuration: durationVar.value,
                                            }}
                                        />
                                    }
                                    width={300}
                                    height={300}
                                    params={[
                                        easingVar.name,
                                        durationVar.name,
                                        easingVar.value,
                                        durationVar.value,
                                    ]}
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
    title: 'Base/Animations',
    component: Content,
};

export default meta;

export const Demo = {};
