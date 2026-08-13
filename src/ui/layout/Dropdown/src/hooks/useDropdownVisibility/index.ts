import { type TransitionEvent, useEffect, useState } from 'react';

export const useDropdownVisibility = (open: boolean) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!open) {
            setIsVisible(false);
            return;
        }

        setIsMounted(true);
        const frame = requestAnimationFrame(() => setIsVisible(true));

        return () => cancelAnimationFrame(frame);
    }, [open]);

    const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
        if (event.target !== event.currentTarget) return;
        if (!open) setIsMounted(false);
    };

    return { isMounted, isVisible, handleTransitionEnd };
};
