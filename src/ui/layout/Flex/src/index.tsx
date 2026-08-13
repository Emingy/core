import cls from 'classnames/bind';
import React from 'react';

import styles from './index.module.scss';

import { EFlexAlign, EFlexDirection, EFlexJustify } from './constants';
import type { TProps } from './types';

const BLOCK_NAME = 'Flex';
const cn = cls.bind(styles);

export const Flex = ({
    className,
    direction = EFlexDirection.Row,
    justify = EFlexJustify.Start,
    align = EFlexAlign.Stretch,
    gap,
    children,
    inline = false,
    wrap = false,
    elementType: Tag = 'div',
    ...restProps
}: TProps) => {
    return (
        <Tag
            {...restProps}
            className={cn(BLOCK_NAME, className, {
                [`${BLOCK_NAME}--direction-${direction}`]: direction !== EFlexDirection.Row,
                [`${BLOCK_NAME}--justify-${justify}`]: justify !== EFlexJustify.Start,
                [`${BLOCK_NAME}--align-${align}`]: align !== EFlexAlign.Stretch,
                [`${BLOCK_NAME}--gap-${gap}`]: Boolean(gap),
                [`${BLOCK_NAME}--inline`]: inline,
                [`${BLOCK_NAME}--wrap`]: wrap,
            })}
        >
            {children}
        </Tag>
    );
};

export type TFlexProps = TProps;
