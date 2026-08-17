import type { CSSProperties } from 'react';

import type { getElementPageRect } from '@emingy/core/utils/getElementPageRect';

import { DROPDOWN_OFFSET, EDirection } from '../../constants';

export const calcStyle = (
    rect: ReturnType<typeof getElementPageRect>,
    direction: `${EDirection}`,
    containerRect?: ReturnType<typeof getElementPageRect>
): CSSProperties => {
    const triggerTop = rect.top + window.scrollY;
    const triggerLeft = rect.left + window.scrollX;
    const width = `${rect.width}px`;

    const edgeRect = containerRect ?? rect;
    const top = edgeRect.top + window.scrollY;
    const bottom = edgeRect.bottom + window.scrollY;
    const left = edgeRect.left + window.scrollX;
    const right = edgeRect.right + window.scrollX;

    switch (direction) {
        case EDirection.Top:
            return {
                top: `${top - DROPDOWN_OFFSET}px`,
                left: `${triggerLeft}px`,
                width,
                transform: 'translateY(-100%)',
            };
        case EDirection.Left:
            return {
                top: `${triggerTop}px`,
                left: `${left - DROPDOWN_OFFSET}px`,
                width,
                transform: 'translateX(-100%)',
            };
        case EDirection.Right:
            return { top: `${triggerTop}px`, left: `${right + DROPDOWN_OFFSET}px`, width };
        case EDirection.Bottom:
        default:
            return { top: `${bottom + DROPDOWN_OFFSET}px`, left: `${triggerLeft}px`, width };
    }
};
