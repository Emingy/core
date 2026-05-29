import type { CSSProperties } from 'react';

import type { getElementPageRect } from '@emingy/core/utils/getElementPageRect';

import { EPosition, TOOLTIP_OFFSET } from '../../../../constants';

export const calcStyle = (
    rect: ReturnType<typeof getElementPageRect>,
    pos: `${EPosition}`
): CSSProperties => {
    const cx = rect.left + rect.width / 2 + window.scrollX;
    const cy = rect.top + rect.height / 2 + window.scrollY;

    switch (pos) {
        case EPosition.Top:
            return { top: `${rect.top + window.scrollY - TOOLTIP_OFFSET}px`, left: `${cx}px` };
        case EPosition.Bottom:
            return { top: `${rect.bottom + window.scrollY + TOOLTIP_OFFSET}px`, left: `${cx}px` };
        case EPosition.Left:
            return { top: `${cy}px`, left: `${rect.left + window.scrollX - TOOLTIP_OFFSET}px` };
        case EPosition.Right:
            return { top: `${cy}px`, left: `${rect.right + window.scrollX + TOOLTIP_OFFSET}px` };
        default:
            return { top: `${rect.top + window.scrollY - TOOLTIP_OFFSET}px`, left: `${cx}px` };
    }
};
