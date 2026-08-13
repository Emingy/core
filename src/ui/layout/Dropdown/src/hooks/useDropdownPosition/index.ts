import { type CSSProperties, type RefObject, useLayoutEffect, useState } from 'react';

import { getElementPageRect } from '@emingy/core/utils/getElementPageRect';

import type { EDirection } from '../../constants';
import { calcStyle } from '../../utils/calcStyle';
import { flipDirection } from '../../utils/flipDirection';

type TParams = {
    triggerRef: RefObject<HTMLElement | null>;
    panelRef: RefObject<HTMLElement | null>;
    containerRef?: RefObject<HTMLElement | null>;
    direction: `${EDirection}`;
    isMounted: boolean;
};

export const useDropdownPosition = ({
    triggerRef,
    panelRef,
    containerRef,
    direction,
    isMounted,
}: TParams) => {
    const [style, setStyle] = useState<CSSProperties>({});

    useLayoutEffect(() => {
        if (!isMounted || !triggerRef.current || !panelRef.current) return;

        const triggerElement = (triggerRef.current.firstElementChild ??
            triggerRef.current) as HTMLElement;
        const rect = getElementPageRect(triggerElement);
        const containerRect = containerRef?.current
            ? getElementPageRect(containerRef.current)
            : undefined;

        const resolvedDirection = flipDirection(
            direction,
            rect,
            panelRef.current.offsetWidth,
            panelRef.current.offsetHeight,
            containerRect
        );

        setStyle(calcStyle(rect, resolvedDirection, containerRect));
    }, [isMounted, direction]);

    return style;
};
