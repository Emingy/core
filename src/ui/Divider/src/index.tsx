import cls from 'classnames/bind';
import React from 'react';

import styles from './index.module.scss';

import { EType } from './constants';
import type { TProps } from './types.ts';

const BLOCK_NAME = 'Divider';
const cn = cls.bind(styles);

export const Divider = ({ type = EType.Horizontal, label, className }: TProps) => {
    return (
        <div
            className={cn(`${BLOCK_NAME}`, className, {
                [`${BLOCK_NAME}__horizontal`]: type === EType.Horizontal,
                [`${BLOCK_NAME}__vertical`]: type === EType.Vertical,
            })}
        >
            <span />
            {label && <label>{label}</label>}
            <span />
        </div>
    );
};

export type TDividerProps = TProps;
