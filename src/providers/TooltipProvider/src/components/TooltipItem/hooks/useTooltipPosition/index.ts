import { type CSSProperties, type RefObject, useEffect, useState } from 'react';

import { getElementPageRect } from '@emingy/core/utils/getElementPageRect';

import type { TTooltipItem } from '../../../../types';
import { calcStyle } from '../../utils/calcStyle';
import { flipPos } from '../../utils/flipPos';

export const useTooltipPosition = (item: TTooltipItem, ref: RefObject<HTMLDivElement | null>) => {
    const [visible, setVisible] = useState(false);
    const [posDir, setPosDir] = useState(item.position);
    const [style, setStyle] = useState<CSSProperties>(() => {
        const rect = getElementPageRect(item.trigger);
        return calcStyle(rect, item.position);
    });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const rect = getElementPageRect(item.trigger);
        const flipped = flipPos(item.position, rect, el.offsetWidth, el.offsetHeight);

        if (flipped !== item.position) {
            setStyle(calcStyle(rect, flipped));
            setPosDir(flipped);
        }

        requestAnimationFrame(() => setVisible(true));
    }, []);

    return {
        visible,
        posDir,
        style,
    };
};
