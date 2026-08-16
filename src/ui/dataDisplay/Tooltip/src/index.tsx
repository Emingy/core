import cls from 'classnames/bind';
import React, { useEffect, useId, useRef } from 'react';

import { useTooltipContext } from '@emingy/core/providers/TooltipProvider';

import styles from './index.module.scss';

import type { TProps } from './types';

const BLOCK_NAME = 'Tooltip';
const cn = cls.bind(styles);

export const Tooltip = ({ children, disabled, visible, ...tooltipProps }: TProps) => {
    const { showTooltip, hideTooltip } = useTooltipContext();
    const triggerRef = useRef<HTMLDivElement>(null);
    const id = useId();
    const isControlled = visible !== undefined;

    const show = () => {
        if (disabled || !(triggerRef.current instanceof HTMLDivElement)) return;

        showTooltip({
            ...tooltipProps,
            trigger: triggerRef.current,
            id,
        });
    };

    const hide = () => {
        hideTooltip(id);
    };

    useEffect(() => {
        if (!isControlled) return;

        if (visible) {
            show();
        } else {
            hide();
        }

        return hide;
    }, [isControlled, visible, disabled]);

    const handleMouseEnter = () => {
        if (isControlled) return;
        show();
    };

    const handleMouseLeave = () => {
        if (isControlled) return;
        hide();
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
