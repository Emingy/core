import cls from 'classnames/bind';
import React, { useId } from 'react';
import { useInRouterContext, useNavigate } from 'react-router-dom';

import { ArrowBottomIcon, Icon } from '@emingy/core/ui/basic/Icon';
import { Typography } from '@emingy/core/ui/basic/Typography';
import { Spinner } from '@emingy/core/ui/dataDisplay/Spinner';
import { Dropdown } from '@emingy/core/ui/layout/Dropdown';

import styles from './index.module.scss';

import { ESize, EType, EVariant } from './constants';
import type { TProps } from './types';

const BLOCK_NAME = 'Button';
const cn = cls.bind(styles);

export const Button = ({
    size = ESize.Md,
    type = EType.Primary,
    variant = EVariant.Filled,
    htmlType,
    disabled,
    prefix,
    postfix,
    splitted,
    dropdownContent,
    className,
    children,
    icon,
    isLoading = false,
    href,
    navigateOptions,
    isFullWidth,
    onClick,
    ...restProps
}: TProps) => {
    const id = useId();
    const isInRouterContext = useInRouterContext();
    const navigate = isInRouterContext ? useNavigate() : undefined;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onClick?.(e);

        if (href) {
            navigate?.(href, navigateOptions);
        }
    };

    const buttonElement = (
        <div
            className={cn(`${BLOCK_NAME}__wrapper`, {
                [`${BLOCK_NAME}__wrapper_full-width`]: isFullWidth,
            })}
        >
            <label
                className={cn(`${BLOCK_NAME}`, className, {
                    [`${BLOCK_NAME}__primary`]: type === EType.Primary,
                    [`${BLOCK_NAME}__secondary`]: type === EType.Secondary,
                    [`${BLOCK_NAME}__alert`]: type === EType.Alert,
                    [`${BLOCK_NAME}__filled`]: variant === EVariant.Filled,
                    [`${BLOCK_NAME}__ghosted`]: variant === EVariant.Ghosted,
                    [`${BLOCK_NAME}__outlined`]: variant === EVariant.Outlined,
                    [`${BLOCK_NAME}__middle-size`]: size === ESize.Md,
                    [`${BLOCK_NAME}__small-size`]: size === ESize.Sm,
                    [`${BLOCK_NAME}__large-size`]: size === ESize.Lg,
                    [`${BLOCK_NAME}__disabled`]: disabled,
                    [`${BLOCK_NAME}__splitted`]: splitted,
                    [`${BLOCK_NAME}__loading`]: isLoading,
                })}
                htmlFor={restProps.id ?? id}
            >
                {prefix && (
                    <span
                        className={cn({
                            [`${BLOCK_NAME}__span-hidden`]: isLoading,
                        })}
                    >
                        {prefix}
                    </span>
                )}
                <button
                    {...restProps}
                    id={restProps.id ?? id}
                    type={htmlType}
                    disabled={disabled || isLoading}
                    onClick={handleClick}
                >
                    {children && (
                        <Typography.Base
                            weight="bold"
                            className={cn(`${BLOCK_NAME}__label`, {
                                [`${BLOCK_NAME}__label-hidden`]: isLoading,
                            })}
                        >
                            {children}
                        </Typography.Base>
                    )}
                    {icon && <Icon icon={icon} size="sm" />}
                    {isLoading && (
                        <Typography.Base
                            elementType="span"
                            className={cn(`${BLOCK_NAME}__spinner`)}
                        >
                            <Spinner />
                        </Typography.Base>
                    )}
                </button>
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
            {splitted && (
                <button
                    {...restProps}
                    className={cn(`${BLOCK_NAME}`, className, {
                        [`${BLOCK_NAME}__primary`]: type === EType.Primary,
                        [`${BLOCK_NAME}__secondary`]: type === EType.Secondary,
                        [`${BLOCK_NAME}__alert`]: type === EType.Alert,
                        [`${BLOCK_NAME}__filled`]: variant === EVariant.Filled,
                        [`${BLOCK_NAME}__ghosted`]: variant === EVariant.Ghosted,
                        [`${BLOCK_NAME}__outlined`]: variant === EVariant.Outlined,
                        [`${BLOCK_NAME}__middle-size`]: size === ESize.Md,
                        [`${BLOCK_NAME}__small-size`]: size === ESize.Sm,
                        [`${BLOCK_NAME}__large-size`]: size === ESize.Lg,
                        [`${BLOCK_NAME}__disabled`]: disabled,
                        [`${BLOCK_NAME}__splitted-right`]: splitted,
                    })}
                    type={htmlType}
                    disabled={disabled}
                >
                    <Icon icon={ArrowBottomIcon} size="sm" />
                </button>
            )}
        </div>
    );

    if (!splitted) {
        return buttonElement;
    }

    return (
        <Dropdown direction="bottom" content={dropdownContent}>
            {buttonElement}
        </Dropdown>
    );
};

export type TButtonProps = TProps;
