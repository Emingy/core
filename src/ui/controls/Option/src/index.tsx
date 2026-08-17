import cls from 'classnames/bind';
import React, { useId } from 'react';

import { Typography } from '@emingy/core/ui/basic/Typography';

import styles from './index.module.scss';

import { EType } from './constants';
import type { TProps } from './types';

const BLOCK_NAME = 'Option';
const cn = cls.bind(styles);

export const Option = ({
    className,
    id,
    type = EType.Default,
    isSelected,
    onSelect,
    children,
    isDisabled,
    prefix,
    description,
}: TProps) => {
    const optionId = useId();

    return (
        <label
            className={cn(`${BLOCK_NAME}`, className, {
                [`${BLOCK_NAME}__alert`]: type === EType.Alert,
                [`${BLOCK_NAME}__disabled`]: isDisabled,
                [`${BLOCK_NAME}__selected`]: isSelected,
                [`${BLOCK_NAME}__no-prefix`]: !prefix,
            })}
            htmlFor={id ? id : optionId}
        >
            <input
                type="checkbox"
                hidden
                id={id ? id : optionId}
                onChange={onSelect}
                checked={isSelected}
                disabled={isDisabled}
            />
            {prefix && <div className={cn(`${BLOCK_NAME}__prefix`)}>{prefix}</div>}
            <Typography.Base className={cn(`${BLOCK_NAME}__label`)} weight="bold">
                {children}
            </Typography.Base>
            {description && (
                <Typography.Micro className={cn(`${BLOCK_NAME}__description`)}>
                    {description}
                </Typography.Micro>
            )}
        </label>
    );
};

export type TOptionProps = TProps;
