import cls from 'classnames/bind';
import React, { useId } from 'react';

import { Spinner } from '@emingy/core/ui/Spinner';
import { Typography } from '@emingy/core/ui/Typography';

import styles from './index.module.scss';

import { EType } from './constants';
import type { TProps } from './types.ts';

const BLOCK_NAME = 'ToggleButton';
const cn = cls.bind(styles);

export const ToggleButton = ({
    type = EType.Primary,
    prefix,
    postfix,
    className,
    children,
    isLoading,
    isFullWidth,
    ...restProps
}: TProps) => {
    const id = useId();

    return (
        <label
            className={cn(`${BLOCK_NAME}`, className, {
                [`${BLOCK_NAME}__full-width`]: isFullWidth,
                [`${BLOCK_NAME}__loading`]: isLoading,
                [`${BLOCK_NAME}__primary`]: type === EType.Primary,
                [`${BLOCK_NAME}__secondary`]: type === EType.Secondary,
            })}
            htmlFor={restProps.id ? restProps.id : id}
        >
            <input
                {...restProps}
                type="checkbox"
                id={restProps.id ? restProps.id : id}
                hidden
                disabled={isLoading || restProps.disabled}
            />
            {prefix && (
                <span
                    className={cn({
                        [`${BLOCK_NAME}__span-hidden`]: isLoading,
                    })}
                >
                    {prefix}
                </span>
            )}
            <Typography.Base
                weight="bold"
                className={cn(`${BLOCK_NAME}__label`, {
                    [`${BLOCK_NAME}__label-hidden`]: isLoading,
                })}
            >
                {children}
            </Typography.Base>
            {isLoading && (
                <Typography.Base elementType="span" className={cn(`${BLOCK_NAME}__spinner`)}>
                    <Spinner />
                </Typography.Base>
            )}
            {postfix && (
                <span
                    className={cn({
                        [`${BLOCK_NAME}__span-hidden`]: isLoading,
                    })}
                >
                    {postfix}
                </span>
            )}
        </label>
    );
};

export type TToggleButtonProps = TProps;
