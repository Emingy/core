import type { TParsedMask } from '../parseMask';

export const cleanValue = (str: string, parsedMask: TParsedMask): string => {
    let result = '';
    let strIndex = 0;

    for (let i = 0; i < parsedMask.length; i++) {
        if (strIndex >= str.length) break;

        const segment = parsedMask[i];

        if (segment.type === 'static') {
            if (str.startsWith(segment.value, strIndex)) {
                strIndex += segment.value.length;
            } else {
                break;
            }
        } else {
            const maxTake = segment.max;
            let endIndex = strIndex + maxTake;
            const nextSegment = parsedMask[i + 1];

            if (i + 1 < parsedMask.length && nextSegment.type === 'static') {
                const nextStatic = nextSegment.value;

                const nextStaticPos = str.indexOf(nextStatic, strIndex);
                if (nextStaticPos !== -1 && nextStaticPos < endIndex) {
                    endIndex = nextStaticPos;
                }
            }

            endIndex = Math.min(endIndex, str.length);

            const take = endIndex - strIndex;
            if (take > 0) {
                result += str.slice(strIndex, endIndex);
                strIndex = endIndex;
            }
        }
    }

    return result;
};
