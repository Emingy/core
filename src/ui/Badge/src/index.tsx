import cls from 'classnames/bind';
import React from 'react';

import { Typography } from '../../Typography';

import { getPreparedValue } from './utils/getPreparedValue';

import styles from './index.module.scss';

import { EType } from './constants';
import type { TProps } from './types.ts';

const BLOCK_NAME = 'Badge';
const cn = cls.bind(styles);

export const Badge = ({ className, value, type = EType.Primary }: TProps) => {
    return (
        <div
            className={cn(`${BLOCK_NAME}`, className, {
                [`${BLOCK_NAME}__primary`]: type === EType.Primary,
                [`${BLOCK_NAME}__secondary`]: type === EType.Secondary,
            })}
        >
            <Typography.Base isTruncated>{getPreparedValue(value)}</Typography.Base>
        </div>
    );
};

export type TBadgeProps = TProps;
