import { type RefObject, useEffect, useRef, useState } from 'react';

import { ETriggerMode, HOVER_CLOSE_DELAY } from '../../constants';

type TParams = {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    triggerRef: RefObject<HTMLElement | null>;
    panelRef: RefObject<HTMLElement | null>;
    triggerMode: `${ETriggerMode}`[];
};

export const useDropdownOpenState = ({
    isOpen,
    onOpenChange,
    triggerRef,
    panelRef,
    triggerMode,
}: TParams) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const open = isOpen ?? internalOpen;
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    const setOpen = (nextOpen: boolean) => {
        if (isOpen === undefined) setInternalOpen(nextOpen);
        onOpenChange?.(nextOpen);
    };

    const clearCloseTimeout = () => {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = undefined;
    };

    const toggle = () => setOpen(!open);

    const isHoverEnabled = triggerMode.includes(ETriggerMode.Hover);
    const isClickEnabled = triggerMode.includes(ETriggerMode.Click);

    const handleHoverEnter = () => {
        clearCloseTimeout();
        setOpen(true);
    };

    const handleHoverLeave = () => {
        clearCloseTimeout();
        closeTimeoutRef.current = setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY);
    };

    useEffect(() => clearCloseTimeout, []);

    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (event: MouseEvent) => {
            const target = event.target as Node;
            if (triggerRef.current?.contains(target)) return;
            if (panelRef.current?.contains(target)) return;
            setOpen(false);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);

    return {
        open,
        toggle,
        isClickEnabled,
        hoverHandlers: isHoverEnabled
            ? { onMouseEnter: handleHoverEnter, onMouseLeave: handleHoverLeave }
            : undefined,
    };
};
