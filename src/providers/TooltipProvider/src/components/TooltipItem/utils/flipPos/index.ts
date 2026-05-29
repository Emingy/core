import type { getElementPageRect } from '@emingy/core/utils/getElementPageRect';

import { EPosition, TOOLTIP_OFFSET } from '../../../../constants';

export const flipPos = (
    pos: `${EPosition}`,
    rect: ReturnType<typeof getElementPageRect>,
    w: number,
    h: number
): `${EPosition}` => {
    if (pos === EPosition.Top && rect.top < h + TOOLTIP_OFFSET) return EPosition.Bottom;
    if (pos === EPosition.Bottom && rect.bottom + h + TOOLTIP_OFFSET > window.innerHeight)
        return EPosition.Top;
    if (pos === EPosition.Left && rect.left < w + TOOLTIP_OFFSET) return EPosition.Right;
    if (pos === EPosition.Right && rect.right + w + TOOLTIP_OFFSET > window.innerWidth)
        return EPosition.Left;
    return pos;
};
