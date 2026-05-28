import cls from 'classnames/bind';
import React, { type HTMLAttributes, type PropsWithChildren } from 'react';

import { useDeviceType } from '@emingy/core/hooks/useDeviceType';

import styles from './index.module.scss';

const BLOCK_NAME = 'PageWrapper';
const cn = cls.bind(styles);

export const PageWrapper = ({
    children,
    ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
    const { isMobile, isDesktop, isTablet } = useDeviceType();

    return (
        <div {...restProps} className={cn(BLOCK_NAME)}>
            <div
                className={cn(`${BLOCK_NAME}__content`, {
                    [`${BLOCK_NAME}__content--mobile`]: isMobile,
                    [`${BLOCK_NAME}__content--tablet`]: isTablet,
                    [`${BLOCK_NAME}__content--desktop`]: isDesktop,
                })}
            >
                {children}
            </div>
        </div>
    );
};
