import cls from 'classnames/bind';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';

import { useDropdownOpenState } from './hooks/useDropdownOpenState';
import { useDropdownPosition } from './hooks/useDropdownPosition';
import { useDropdownVisibility } from './hooks/useDropdownVisibility';

import styles from './index.module.scss';

import { DEFAULT_DIRECTION, DEFAULT_TRIGGER_MODE } from './constants';
import type { TProps } from './types';

const BLOCK_NAME = 'Dropdown';
const cn = cls.bind(styles);

export const Dropdown = ({
    children,
    content,
    direction = DEFAULT_DIRECTION,
    triggerMode = DEFAULT_TRIGGER_MODE,
    containerRef,
    maxHeight,
    isOpen,
    onOpenChange,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...restProps
}: TProps) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const { open, toggle, isClickEnabled, hoverHandlers } = useDropdownOpenState({
        isOpen,
        onOpenChange,
        triggerRef,
        panelRef,
        triggerMode,
    });
    const { isMounted, isVisible, handleTransitionEnd } = useDropdownVisibility(open);
    const style = useDropdownPosition({ triggerRef, panelRef, containerRef, direction, isMounted });

    const handleTriggerClick = (event: React.MouseEvent<HTMLDivElement>) => {
        onClick?.(event);
        if (isClickEnabled) toggle();
    };

    const handleTriggerMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        onMouseEnter?.(event);
        hoverHandlers?.onMouseEnter();
    };

    const handleTriggerMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        onMouseLeave?.(event);
        hoverHandlers?.onMouseLeave();
    };

    return (
        <>
            <div
                {...restProps}
                ref={triggerRef}
                className={cn(`${BLOCK_NAME}__trigger`, className)}
                onClick={handleTriggerClick}
                onMouseEnter={handleTriggerMouseEnter}
                onMouseLeave={handleTriggerMouseLeave}
            >
                {children}
            </div>
            {isMounted &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div
                        ref={panelRef}
                        className={cn(`${BLOCK_NAME}__panel`, {
                            [`${BLOCK_NAME}__panel_visible`]: isVisible,
                        })}
                        style={{ ...style, maxHeight }}
                        onTransitionEnd={handleTransitionEnd}
                        {...hoverHandlers}
                    >
                        {typeof content === 'function' ? content(panelRef) : content}
                    </div>,
                    document.body
                )}
        </>
    );
};

export type TDropdownProps = TProps;
