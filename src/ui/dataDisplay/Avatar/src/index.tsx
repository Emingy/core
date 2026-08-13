import cls from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Icon, PersonIcon } from '@emingy/core/ui/basic/Icon';
import { Spinner } from '@emingy/core/ui/dataDisplay/Spinner';

import styles from './index.module.scss';

import type { TProps } from './types';

const BLOCK_NAME = 'Avatar';
const cn = cls.bind(styles);

export const Avatar = ({
    className,
    onLoad,
    onError,
    onClick,
    to,
    href,
    disabled,
    ...restProps
}: TProps) => {
    const [isLoading, setIsLoading] = useState(Boolean(restProps.src));
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    const handleLoad = () => {
        setIsLoading(false);
        setHasError(false);
        onLoad?.();
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
        onError?.();
    };

    useEffect(() => {
        setHasError(false);

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

    const showPlaceholder = (!restProps.src || hasError) && !isLoading;

    const rootClassName = cn(`${BLOCK_NAME}`, className, {
        [`${BLOCK_NAME}__loading`]: isLoading,
        [`${BLOCK_NAME}__placeholder`]: showPlaceholder,
    });

    const content = (
        <>
            {isLoading && (
                <div className={cn(`${BLOCK_NAME}__loader`)}>
                    <Spinner />
                </div>
            )}
            {showPlaceholder && <Icon icon={PersonIcon} size="xl" />}
            <img {...restProps} ref={imgRef} onLoad={handleLoad} onError={handleError} />
        </>
    );

    if (onClick) {
        return (
            <button className={rootClassName} onClick={onClick} disabled={disabled}>
                {content}
            </button>
        );
    }

    if (to) {
        return (
            <NavLink to={to} className={rootClassName}>
                {content}
            </NavLink>
        );
    }

    if (href) {
        return (
            <a href={href} className={rootClassName}>
                {content}
            </a>
        );
    }

    return <div className={rootClassName}>{content}</div>;
};

export type TAvatarProps = TProps;
