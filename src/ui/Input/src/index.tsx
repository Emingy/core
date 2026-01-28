import cls from 'classnames/bind';
import React, { type ChangeEvent, useEffect, useId, useRef, useState } from 'react';

import { Typography } from '../../Typography';

import { useMask } from './hooks/useMask';
import { calculateCursorPosition } from './utils/calculateCursorPosition';
import { maskToPlaceholder } from './utils/maskToPlaceholder';

import styles from './index.module.scss';

import type { TProps } from './types';

const BLOCK_NAME = 'Input';
const cn = cls.bind(styles);

export const Input = ({
    className,
    placeholder,
    title,
    mask,
    prefix,
    postfix,
    error = false,
    disabled = false,
    value,
    onChange,
    validate,
    ...restProps
}: TProps) => {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const cursorPositionRef = useRef<number | null>(null);
    const [inputValue, setInputValue] = useState<string>(value ?? '');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const { getValues } = useMask(mask);

    useEffect(() => {
        setInputValue(value ?? '');
    }, [value]);

    useEffect(() => {
        if (mask && cursorPositionRef.current !== null && inputRef.current) {
            inputRef.current.setSelectionRange(
                cursorPositionRef.current,
                cursorPositionRef.current
            );
            cursorPositionRef.current = null;
        }
    }, [inputValue, mask]);

    const isValid = validate ? validate(inputValue) : true;
    const hasError = error || !isValid;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        const newValue = input.value;
        const cursorPosition = input.selectionStart ? input.selectionStart + 1 : 0;

        const { maskedValue, unmaskedValue } = getValues(newValue, inputValue);

        if (mask) {
            cursorPositionRef.current = calculateCursorPosition({
                currentCursorPosition: cursorPosition,
                oldValue: inputValue,
                newMaskedValue: maskedValue,
            });
        }

        setInputValue(maskedValue);

        onChange?.({
            ...event,
            target: {
                ...event.target,
                value: maskedValue,
                unmaskedValue: unmaskedValue,
            },
        });
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <label
            className={cn(BLOCK_NAME, className, {
                [`${BLOCK_NAME}--disabled`]: disabled,
                [`${BLOCK_NAME}--error`]: hasError,
                [`${BLOCK_NAME}--has-value`]: inputValue,
            })}
            htmlFor={restProps.id ?? id}
        >
            {prefix && (
                <Typography.Base elementType="span" className={cn(`${BLOCK_NAME}__prefix`)}>
                    {prefix}
                </Typography.Base>
            )}
            <div className={cn(`${BLOCK_NAME}__wrapper`)}>
                {title && (
                    <Typography.Base elementType="span" className={cn(`${BLOCK_NAME}__title`)}>
                        {title}
                    </Typography.Base>
                )}
                <div className={cn(`${BLOCK_NAME}__input-container`)}>
                    <input
                        {...restProps}
                        ref={inputRef}
                        id={restProps.id ?? id}
                        className={cn(`${BLOCK_NAME}__field`)}
                        placeholder={placeholder}
                        disabled={disabled}
                        value={inputValue}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    {Boolean(!placeholder && mask && !inputValue && (!title || isFocused)) && (
                        <Typography.Base
                            elementType="span"
                            className={cn(`${BLOCK_NAME}__mask`)}
                            data-testid={'input-mask'}
                        >
                            {mask ? maskToPlaceholder(mask) : ''}
                        </Typography.Base>
                    )}
                </div>
            </div>
            {postfix && (
                <Typography.Base elementType="span" className={cn(`${BLOCK_NAME}__postfix`)}>
                    {postfix}
                </Typography.Base>
            )}
        </label>
    );
};

export type TInputProps = TProps;
