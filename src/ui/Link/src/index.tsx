import cls from 'classnames/bind';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import styles from './index.module.scss';

import type { TProps } from './types.ts';

const BLOCK_NAME = 'Link';
const cn = cls.bind(styles);

export const Link = ({ className, children, disabled, ...restProps }: TProps) => {
    return (
        <RouterLink
            {...restProps}
            className={cn(`${BLOCK_NAME}`, className, {
                [`${BLOCK_NAME}__disabled`]: disabled,
            })}
        >
            {children}
        </RouterLink>
    );
};

export type TLinkProps = TProps;
