import cls from 'classnames/bind';
import React, { useRef } from 'react';

import { useTooltipPosition } from './hooks/useTooltipPosition';

import styles from './index.module.scss';

import type { TProps } from './types';

const BLOCK_NAME = 'TooltipItem';
const cn = cls.bind(styles);

export const TooltipItem = ({ item, isExiting, onRemove }: TProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { visible, posDir, style } = useTooltipPosition(item, ref);

    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return;
        if (isExiting) onRemove(item.id);
    };

    return (
        <div
            ref={ref}
            className={cn(BLOCK_NAME, `${BLOCK_NAME}__${item.size}`, `${BLOCK_NAME}__${posDir}`, {
                [`${BLOCK_NAME}__visible`]: visible && !isExiting,
            })}
            style={style}
            onTransitionEnd={handleTransitionEnd}
        >
            <p className={cn(`${BLOCK_NAME}__label`)}>{item.text}</p>
        </div>
    );
};

export type { TProps as TTooltipItemProps };
