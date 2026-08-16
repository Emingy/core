import type { CSSProperties } from 'react';

import type { getElementPageRect } from '@emingy/core/utils/getElementPageRect';

import { EPosition, TOOLTIP_OFFSET, VIEWPORT_EDGE_PADDING } from '../../../../constants';

const clampViewportCenterX = (viewportCx: number, tooltipWidth: number): number => {
    if (!tooltipWidth) return viewportCx;

    const halfWidth = tooltipWidth / 2;
    const minCx = halfWidth + VIEWPORT_EDGE_PADDING;
    const maxCx = window.innerWidth - halfWidth - VIEWPORT_EDGE_PADDING;

    return Math.min(Math.max(viewportCx, minCx), maxCx);
};

export const calcStyle = (
    rect: ReturnType<typeof getElementPageRect>,
    pos: `${EPosition}`,
    tooltipWidth = 0
): CSSProperties => {
    const viewportCx = clampViewportCenterX(rect.left + rect.width / 2, tooltipWidth);
    const cx = viewportCx + window.scrollX;
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
