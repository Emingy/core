import cls from 'classnames/bind';
import React, { useId } from 'react';

import { Flex } from '@emingy/core/ui/Flex';
import { Typography } from '@emingy/core/ui/Typography';

import styles from './index.module.scss';

import type { TProps } from './types.ts';

const BLOCK_NAME = 'Option';
const cn = cls.bind(styles);

export const Option = ({
    className,
    id,
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
                [`${BLOCK_NAME}__disabled`]: isDisabled,
                [`${BLOCK_NAME}__selected`]: isSelected,
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
            <Flex direction="column">
                <Typography.Base>{children}</Typography.Base>
                {description && (
                    <Typography.Micro className={cn(`${BLOCK_NAME}__description`)}>
                        {description}
                    </Typography.Micro>
                )}
            </Flex>
        </label>
    );
};

export type TOptionProps = TProps;
