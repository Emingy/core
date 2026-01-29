import cls from 'classnames/bind';
import React from 'react';

import { Button } from '@emingy/core/ui/Button';
import { Flex } from '@emingy/core/ui/Flex';
import { CrossIcon } from '@emingy/core/ui/Icon';
import { Typography } from '@emingy/core/ui/Typography';

import { StatusIndicator } from './components/StatusIndicator';

import styles from './index.module.scss';

import type { TProps } from './types.ts';

const BLOCK_NAME = 'Message';
const cn = cls.bind(styles);

export const Message = ({
    type,
    className,
    children,
    title,
    onCloseClick,
    onMouseEnter,
    onMouseLeave,
}: TProps) => {
    return (
        <div
            className={cn(`${BLOCK_NAME}`, className)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Flex direction="row" gap="4x">
                <StatusIndicator type={type} />
                <Flex
                    direction="column"
                    gap="1x"
                    justify="center"
                    className={cn(`${BLOCK_NAME}__content`)}
                >
                    {title && <Typography.Base weight="bold">{title}</Typography.Base>}
                    <Typography.Base>{children}</Typography.Base>
                </Flex>
            </Flex>
            <Button type="ghosted" size="sm" onClick={onCloseClick} icon={CrossIcon} />
        </div>
    );
};

export type TMessageProps = TProps;
