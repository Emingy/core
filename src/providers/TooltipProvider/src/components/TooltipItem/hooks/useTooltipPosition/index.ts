import { type CSSProperties, type RefObject, useEffect, useState } from 'react';

import { getElementPageRect } from '@emingy/core/utils/getElementPageRect';

import type { TTooltipItem } from '../../../../types';
import { calcStyle } from '../../utils/calcStyle';
import { flipPos } from '../../utils/flipPos';
import { resolveTriggerElement } from '../../utils/resolveTriggerElement';

export const useTooltipPosition = (item: TTooltipItem, ref: RefObject<HTMLDivElement | null>) => {
    const [visible, setVisible] = useState(false);
    const [posDir, setPosDir] = useState(item.position);
    const [style, setStyle] = useState<CSSProperties>(() => {
        const rect = getElementPageRect(resolveTriggerElement(item.trigger));
        return calcStyle(rect, item.position);
    });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const rect = getElementPageRect(resolveTriggerElement(item.trigger));
        const flipped = flipPos(item.position, rect, el.offsetWidth, el.offsetHeight);

        setStyle(calcStyle(rect, flipped, el.offsetWidth));
        setPosDir(flipped);

        requestAnimationFrame(() => setVisible(true));
    }, [item.trigger, item.text, item.position, item.size, item.type]);

    return {
        visible,
        posDir,
        style,
    };
};
