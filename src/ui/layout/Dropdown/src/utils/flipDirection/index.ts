import type { getElementPageRect } from '@emingy/core/utils/getElementPageRect';

import { DROPDOWN_OFFSET, EDirection } from '../../constants';

const FALLBACK_ORDER: Record<`${EDirection}`, `${EDirection}`[]> = {
    [EDirection.Right]: [EDirection.Right, EDirection.Left, EDirection.Bottom, EDirection.Top],
    [EDirection.Left]: [EDirection.Left, EDirection.Right, EDirection.Bottom, EDirection.Top],
    [EDirection.Bottom]: [EDirection.Bottom, EDirection.Top, EDirection.Right, EDirection.Left],
    [EDirection.Top]: [EDirection.Top, EDirection.Bottom, EDirection.Right, EDirection.Left],
};

const fitsViewport = (
    direction: `${EDirection}`,
    rect: ReturnType<typeof getElementPageRect>,
    panelWidth: number,
    panelHeight: number
): boolean => {
    switch (direction) {
        case EDirection.Bottom:
            return rect.bottom + panelHeight + DROPDOWN_OFFSET <= window.innerHeight;
        case EDirection.Top:
            return rect.top - panelHeight - DROPDOWN_OFFSET >= 0;
        case EDirection.Right:
            return rect.right + panelWidth + DROPDOWN_OFFSET <= window.innerWidth;
        case EDirection.Left:
            return rect.left - panelWidth - DROPDOWN_OFFSET >= 0;
        default:
            return false;
    }
};

export const flipDirection = (
    direction: `${EDirection}`,
    rect: ReturnType<typeof getElementPageRect>,
    panelWidth: number,
    panelHeight: number,
    containerRect?: ReturnType<typeof getElementPageRect>
): `${EDirection}` => {
    const edgeRect = containerRect ?? rect;

    const fittingDirection = FALLBACK_ORDER[direction].find((candidate) =>
        fitsViewport(candidate, edgeRect, panelWidth, panelHeight)
    );

    return fittingDirection ?? direction;
};
