import cls from 'classnames/bind';
import React, { useId, useRef } from 'react';

import { useTooltipContext } from '@emingy/core/providers/TooltipProvider';

import styles from './index.module.scss';

import type { TProps } from './types';

const BLOCK_NAME = 'Tooltip';
const cn = cls.bind(styles);

export const Tooltip = ({ children, ...tooltipProps }: TProps) => {
    const { showTooltip, hideTooltip } = useTooltipContext();
    const triggerRef = useRef<HTMLDivElement>(null);
    const id = useId();

    const handleMouseEnter = () => {
        if (!(triggerRef.current instanceof HTMLDivElement)) return;

        showTooltip({
            ...tooltipProps,
            trigger: triggerRef.current,
            id,
        });
    };

    const handleMouseLeave = () => {
        hideTooltip(id);
    };

    return (
        <div
            className={cn(`${BLOCK_NAME}__trigger`)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={triggerRef}
        >
            {children}
        </div>
    );
};

export type { TProps as TTooltipProps };
