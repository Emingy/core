import cls from 'classnames/bind';
import { createElement } from 'react';

import styles from './index.module.scss';

import { EColor, ESize } from './constants';
import type { TProps } from './types.ts';

const BLOCK_NAME = 'Icon';
const cn = cls.bind(styles);

export const Icon = ({
    icon,
    size = ESize.Md,
    color = EColor.Inherit,
    className,
    ...restProps
}: TProps) => {
    return createElement(icon, {
        className: cn(
            BLOCK_NAME,
            `${BLOCK_NAME}__${size}`,
            `${BLOCK_NAME}__${color}`,
            className,
        ),
        ...restProps,
    });
};

export type TIconProps = TProps;
