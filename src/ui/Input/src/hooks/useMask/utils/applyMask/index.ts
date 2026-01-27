import { isDigitChar } from '@emingy/core/utils/isDigitChar';
import { isLetterChar } from '@emingy/core/utils/isLetterChar';

import { EMaskType, type TParsedMask } from '../parseMask';

const checkIsValid = (maskType: `${EMaskType}` | null, char: string): boolean => {
    if (!maskType || maskType === EMaskType.Static) {
        return false;
    }

    return maskType === EMaskType.Digital
        ? isDigitChar(char)
        : maskType === EMaskType.Letter
          ? isLetterChar(char)
          : true;
};

type TProps = {
    value: string;
    prevValue: string;
    parsedMaskList: TParsedMask;
};

export const applyMask = ({ value, prevValue, parsedMaskList }: TProps): string => {
    let currentValue = `${value}`;

    let result = '';
    let valueIndex = 0;
    let maskIndex = 0;

    let currentMaskType: `${EMaskType}` | null = null;
    let currentMaskMin = 0;
    let currentMaskMax = 0;
    let currentMaskLength = 0;

    const advanceMask = (): boolean => {
        if (maskIndex >= parsedMaskList.length) return false;

        const token = parsedMaskList[maskIndex];
        if (token.type === 'static') {
            if (
                result.length + token.value.length < value.length ||
                prevValue.length < value.length
            ) {
                result += token.value;
            }

            maskIndex++;
            currentValue = currentValue.replace(token.value, '');

            return advanceMask();
        } else {
            currentMaskType = token.type;
            currentMaskMin = token.min;
            currentMaskMax = token.max;
            currentMaskLength = 0;
            return true;
        }
    };

    let inGroup = advanceMask();

    const addValidChar = (char: string): boolean => {
        if (checkIsValid(currentMaskType, char) && currentMaskLength < currentMaskMax) {
            result += char;
            currentMaskLength++;
            valueIndex++;

            return true;
        }

        return false;
    };

    while (valueIndex < currentValue.length) {
        if (!inGroup && maskIndex >= parsedMaskList.length) {
            break;
        }

        const char = currentValue[valueIndex];

        if (inGroup && currentMaskType) {
            const isAdded = addValidChar(char);

            if (!isAdded) {
                if (currentMaskLength >= currentMaskMin) {
                    maskIndex++;
                    inGroup = advanceMask();

                    addValidChar(char);
                } else {
                    valueIndex++;
                }
            }
        } else {
            valueIndex++;
        }
    }

    return result;
};
