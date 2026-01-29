import cls from 'classnames/bind';
import React, { useId } from 'react';

import { Flex } from '@emingy/core/ui/Flex';
import { Typography } from '@emingy/core/ui/Typography';

import styles from './index.module.scss';

import type { TProps } from './types.ts';

const BLOCK_NAME = 'Toggle';
const cn = cls.bind(styles);

export const Toggle = ({ className, label, description, error, ...restProps }: TProps) => {
    const id = useId();

    return (
        <label
            htmlFor={restProps.id ? restProps.id : id}
            className={cn(`${BLOCK_NAME}`, className)}
        >
            <Flex direction="row" gap="2x" align="flex-start">
                <input
                    {...restProps}
                    type="checkbox"
                    id={restProps.id ? restProps.id : id}
                    className={cn(`${BLOCK_NAME}__input`)}
                />
                <Flex direction="column">
                    <Typography.Base elementType="span" className={cn(`${BLOCK_NAME}__label`)}>
                        {label}
                    </Typography.Base>
                    {description && !error && (
                        <Typography.Micro
                            elementType="span"
                            className={cn(`${BLOCK_NAME}__description`)}
                        >
                            {description}
                        </Typography.Micro>
                    )}
                    {error && (
                        <Typography.Micro elementType="span" className={cn(`${BLOCK_NAME}__error`)}>
                            {error}
                        </Typography.Micro>
                    )}
                </Flex>
            </Flex>
        </label>
    );
};

export type TToggleProps = TProps;
