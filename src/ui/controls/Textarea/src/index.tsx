import cls from 'classnames/bind';
import React, { type ChangeEvent, forwardRef, useEffect, useId, useState } from 'react';

import { Typography } from '@emingy/core/ui/basic/Typography';

import styles from './index.module.scss';

import { EResize } from './constants';
import type { TProps } from './types';

const BLOCK_NAME = 'Textarea';
const cn = cls.bind(styles);

export const Textarea = forwardRef<HTMLTextAreaElement, TProps>(
    (
        {
            className,
            title,
            prefix,
            postfix,
            error = false,
            disabled = false,
            resize = EResize.None,
            minWidth = '100%',
            maxWidth = '100%',
            minHeight = 100,
            maxHeight = 400,
            maxLength,
            value,
            onChange,
            validate,
            ...restProps
        }: TProps,
        ref
    ) => {
        const id = useId();
        const [textValue, setTextValue] = useState<string>(value ?? '');

        useEffect(() => {
            setTextValue(value ?? '');
        }, [value]);

        const isValid = validate ? validate(textValue) : true;
        const hasError = error || !isValid;

        const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
            setTextValue(event.target.value);
            onChange?.(event);
        };

        return (
            <label
                className={cn(BLOCK_NAME, className, `${BLOCK_NAME}__resize-${resize}`, {
                    [`${BLOCK_NAME}__disabled`]: disabled,
                    [`${BLOCK_NAME}__error`]: hasError,
                    [`${BLOCK_NAME}__has-value`]: textValue,
                })}
                style={{ minWidth, maxWidth, minHeight, maxHeight }}
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
                        <textarea
                            {...restProps}
                            ref={ref}
                            id={restProps.id ?? id}
                            className={cn(`${BLOCK_NAME}__field`)}
                            disabled={disabled}
                            value={textValue}
                            maxLength={maxLength}
                            onChange={handleChange}
                        />
                    </div>
                    {maxLength !== undefined && (
                        <Typography.Micro
                            elementType="span"
                            className={cn(`${BLOCK_NAME}__counter`)}
                        >
                            {`${textValue.length}/${maxLength}`}
                        </Typography.Micro>
                    )}
                </div>
                {postfix && (
                    <Typography.Base elementType="span" className={cn(`${BLOCK_NAME}__postfix`)}>
                        {postfix}
                    </Typography.Base>
                )}
            </label>
        );
    }
);

Textarea.displayName = 'Textarea';

export type TTextareaProps = TProps;
