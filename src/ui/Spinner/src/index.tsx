import cls from 'classnames/bind';
import React from 'react';

import styles from './index.module.scss';

import type { TProps } from './types.ts';

const BLOCK_NAME = 'Spinner';
const cn = cls.bind(styles);

export const Spinner = ({ className }: TProps) => {
    return (
        <svg className={cn(`${BLOCK_NAME}`, className)} viewBox="0 0 50 50">
            <circle
                className={cn(`${BLOCK_NAME}__circle`)}
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="6"
            />
        </svg>
    );
};

export type TSpinnerProps = TProps;
