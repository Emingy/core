import cls from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';

import { Spinner } from '@emingy/core/ui/dataDisplay/Spinner';

import styles from './index.module.scss';

import type { TProps } from './types';

const BLOCK_NAME = 'Avatar';
const cn = cls.bind(styles);

export const Avatar = ({ className, onLoad, onError, onClick, disabled, ...restProps }: TProps) => {
    const [isLoading, setIsLoading] = useState(Boolean(restProps.src));
    const imgRef = useRef<HTMLImageElement>(null);

    const handleLoad = () => {
        setIsLoading(false);
        onLoad?.();
    };

    const handleError = () => {
        setIsLoading(false);
        onError?.();
    };

    useEffect(() => {
        if (!restProps.src) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        // Cached images skip onLoad — check complete synchronously after mount/src change.
        const img = imgRef.current;
        if (img?.complete && img.naturalWidth > 0) {
            handleLoad();
        }
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
                ref={imgRef}
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
