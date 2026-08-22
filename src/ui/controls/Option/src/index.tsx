import cls from 'classnames/bind';
import React, { useId } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Typography } from '@emingy/core/ui/basic/Typography';

import styles from './index.module.scss';

import { EElement, EType } from './constants';
import type { TProps } from './types';

const BLOCK_NAME = 'Option';
const cn = cls.bind(styles);

export const Option = ({
    className,
    id,
    type = EType.Default,
    element = EElement.Checkbox,
    isSelected,
    onSelect,
    onClick,
    to,
    children,
    isDisabled,
    prefix,
    description,
}: TProps) => {
    const optionId = useId();

    const rootClassName = cn(`${BLOCK_NAME}`, className, {
        [`${BLOCK_NAME}__alert`]: type === EType.Alert,
        [`${BLOCK_NAME}__disabled`]: isDisabled,
        [`${BLOCK_NAME}__selected`]: isSelected,
        [`${BLOCK_NAME}__no-prefix`]: !prefix,
    });

    const content = (
        <>
            {prefix && <div className={cn(`${BLOCK_NAME}__prefix`)}>{prefix}</div>}
            <div className={cn(`${BLOCK_NAME}__content`)}>
                <Typography.Base className={cn(`${BLOCK_NAME}__label`)} weight="bold">
                    {children}
                </Typography.Base>
                {description && (
                    <Typography.Micro className={cn(`${BLOCK_NAME}__description`)}>
                        {description}
                    </Typography.Micro>
                )}
            </div>
        </>
    );

    if (element === EElement.Button) {
        return (
            <button
                type="button"
                id={id}
                className={rootClassName}
                onClick={onClick}
                disabled={isDisabled}
            >
                {content}
            </button>
        );
    }

    if (element === EElement.Link) {
        const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
            if (isDisabled) {
                event.preventDefault();
                return;
            }

            onClick?.();
        };

        return (
            <RouterLink
                to={to!}
                id={id}
                className={rootClassName}
                onClick={handleLinkClick}
                aria-disabled={isDisabled || undefined}
                tabIndex={isDisabled ? -1 : undefined}
            >
                {content}
            </RouterLink>
        );
    }

    return (
        <label className={rootClassName} htmlFor={id ? id : optionId}>
            <input
                type="checkbox"
                hidden
                id={id ? id : optionId}
                onChange={onSelect}
                checked={isSelected}
                disabled={isDisabled}
            />
            {content}
        </label>
    );
};

export type TOptionProps = TProps;
