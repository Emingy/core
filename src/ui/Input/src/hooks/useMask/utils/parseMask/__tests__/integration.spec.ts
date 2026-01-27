import { describe, expect, it } from '@rstest/core';

import { applyMask } from '../../applyMask';
import { cleanValue } from '../../cleanValue';
import { parseMask } from '..';

describe('[INTEGRATION] parseMask with applyMask', () => {
    it('should work with hyphen range syntax in real scenario', () => {
        const mask = 'd{3-6}'; // Allow 3 to 6 digits
        const parsedMask = parseMask(mask);

        // Apply mask to different inputs
        const result1 = applyMask({ value: '123', prevValue: '', parsedMaskList: parsedMask });
        const result2 = applyMask({ value: '123456', prevValue: '', parsedMaskList: parsedMask });
        const result3 = applyMask({ value: '1234567', prevValue: '', parsedMaskList: parsedMask });

        expect(result1).toBe('123'); // 3 digits - OK
        expect(result2).toBe('123456'); // 6 digits - OK (max)
        expect(result3).toBe('123456'); // 7 digits - truncated to 6 (max)
    });

    it('should work with comma and hyphen mixed in one mask', () => {
        const mask = 'd{1-3}-d{2,4}'; // 1-3 digits, hyphen, 2-4 digits
        const parsedMask = parseMask(mask);

        const result = applyMask({ value: '12345', prevValue: '', parsedMaskList: parsedMask });

        expect(result).toBe('123-45');
    });

    it('should extract unmasked value correctly with hyphen syntax', () => {
        const mask = '+7 (d{3-3}) d{3-4}'; // Russian phone with flexible area code
        const parsedMask = parseMask(mask);

        const maskedValue = applyMask({
            value: '+7 (555) 1234',
            prevValue: '',
            parsedMaskList: parsedMask,
        });
        const unmaskedValue = cleanValue(maskedValue, parsedMask);

        expect(maskedValue).toBe('+7 (555) 1234');
        expect(unmaskedValue).toBe('5551234');
    });

    it('should validate both separators produce same result', () => {
        const maskComma = 'd{2,5}';
        const maskHyphen = 'd{2-5}';

        const parsedMaskComma = parseMask(maskComma);
        const parsedMaskHyphen = parseMask(maskHyphen);

        const input = '12345';
        const resultComma = applyMask({
            value: input,
            prevValue: '',
            parsedMaskList: parsedMaskComma,
        });
        const resultHyphen = applyMask({
            value: input,
            prevValue: '',
            parsedMaskList: parsedMaskHyphen,
        });

        expect(resultComma).toBe(resultHyphen);
        expect(resultComma).toBe('12345');
    });
});
