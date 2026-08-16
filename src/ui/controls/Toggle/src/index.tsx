import cls from 'classnames/bind';
import React, { forwardRef, useId, useImperativeHandle, useRef } from 'react';

import { useRegisterFieldError } from '@emingy/core/providers/FormErrorTooltipProvider';
import { Typography } from '@emingy/core/ui/basic/Typography';
import { Flex } from '@emingy/core/ui/layout/Flex';

import styles from './index.module.scss';

import type { TProps } from './types';

const BLOCK_NAME = 'Toggle';
const cn = cls.bind(styles);

export const Toggle = forwardRef<HTMLInputElement, TProps>(
    ({ className, label, description, error, ...restProps }: TProps, forwardedRef) => {
        const id = useId();
        const inputRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);
        useRegisterFieldError(id, error, inputRef);

        return (
            <label
                htmlFor={restProps.id ? restProps.id : id}
                className={cn(`${BLOCK_NAME}`, { [`${BLOCK_NAME}--error`]: !!error }, className)}
            >
                <Flex direction="row" gap="2x" align="flex-start">
                    <input
                        {...restProps}
                        ref={inputRef}
                        type="checkbox"
                        id={restProps.id ? restProps.id : id}
                        className={cn(`${BLOCK_NAME}__input`)}
                    />
                    <Flex direction="column">
                        <Typography.Base elementType="span" className={cn(`${BLOCK_NAME}__label`)}>
                            {label}
                        </Typography.Base>
                        {description && (
                            <Typography.Micro
                                elementType="span"
                                className={cn(`${BLOCK_NAME}__description`)}
                            >
                                {description}
                            </Typography.Micro>
                        )}
                    </Flex>
                </Flex>
            </label>
        );
    }
);

Toggle.displayName = 'Toggle';

export type TToggleProps = TProps;
