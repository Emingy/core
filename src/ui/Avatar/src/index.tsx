import cls from 'classnames/bind';
import React, { useEffect, useState } from 'react';

import { Spinner } from '../../Spinner';

import styles from './index.module.scss';

import type { TProps } from './types.ts';

const BLOCK_NAME = 'Avatar';
const cn = cls.bind(styles);

export const Avatar = ({ className, onLoad, onError, onClick, disabled, ...restProps }: TProps) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false);
        onLoad?.();
    };

    const handleError = () => {
        setIsLoading(false);
        onError?.();
    };

    useEffect(() => {
        setIsLoading(true);
    }, [restProps.src]);

    return (
        <button
            className={cn(`${BLOCK_NAME}`, className, {
                [`${BLOCK_NAME}__loading`]: isLoading,
            })}
            onClick={onClick}
            disabled={disabled}
        >
            {isLoading && (
                <div className={cn(`${BLOCK_NAME}__loader`)}>
                    <Spinner />
                </div>
            )}
            <img
                {...restProps}
                className={cn(`${BLOCK_NAME}__image`, {
                    [`${BLOCK_NAME}__image-hidden`]: isLoading,
                })}
                onLoad={handleLoad}
                onError={handleError}
            />
        </button>
    );
};

export type TAvatarProps = TProps;
