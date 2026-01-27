import { useCallback, useMemo } from 'react';

import { applyMask } from './utils/applyMask';
import { cleanValue } from './utils/cleanValue';
import { parseMask } from './utils/parseMask';

export const useMask = (
    mask?: string
): {
    getValues: (
        value: string,
        prevValue: string
    ) => {
        maskedValue: string;
        unmaskedValue: string;
    };
} => {
    const parsedMaskList = useMemo(() => (mask ? parseMask(mask) : []), [mask]);

    const getValues = useCallback(
        (value: string, prevValue: string) => {
            if (!mask || parsedMaskList.length === 0) {
                return {
                    maskedValue: value,
                    unmaskedValue: value,
                };
            }

            const maskedValue = applyMask({
                value,
                parsedMaskList,
                prevValue,
            });
            const unmaskedValue = cleanValue(maskedValue, parsedMaskList);

            return {
                maskedValue: maskedValue,
                unmaskedValue: unmaskedValue,
            };
        },
        [mask, parsedMaskList]
    );

    return {
        getValues,
    };
};
