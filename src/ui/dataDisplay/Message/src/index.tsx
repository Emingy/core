import cls from 'classnames/bind';
import React from 'react';

import { CrossIcon } from '@emingy/core/ui/basic/Icon';
import { Typography } from '@emingy/core/ui/basic/Typography';
import { Button } from '@emingy/core/ui/controls/Button';
import { Flex } from '@emingy/core/ui/layout/Flex';

import { StatusIndicator } from './components/StatusIndicator';

import styles from './index.module.scss';

import type { TProps } from './types';

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
            <Flex direction="row" gap="4x" className={cn(`${BLOCK_NAME}__wrapper`)}>
                <StatusIndicator type={type} />
                <Flex
                    direction="column"
                    gap="1x"
                    justify="center"
                    className={cn(`${BLOCK_NAME}__content`)}
                >
                    {title && (
                        <Typography.Base
                            weight="bold"
                            isTruncated
                            className={cn(`${BLOCK_NAME}__title`)}
                        >
                            {title}
                        </Typography.Base>
                    )}
                    <Typography.Base>{children}</Typography.Base>
                </Flex>
            </Flex>
            <Button
                type="secondary"
                variant="ghosted"
                size="sm"
                onClick={onCloseClick}
                icon={CrossIcon}
            />
        </div>
    );
};

export type TMessageProps = TProps;
export { EType as EMessageType } from './constants';
