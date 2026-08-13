import { describe, expect, it } from '@rstest/core';

import { omitProp } from '..';

describe('[UNIT] omitProp', () => {
    it('removes the given key from the object', () => {
        const result = omitProp({ a: 1, b: 2 }, 'a');

        expect(result).toEqual({ b: 2 });
    });

    it('does not mutate the original object', () => {
        const original = { a: 1, b: 2 };

        omitProp(original, 'a');

        expect(original).toEqual({ a: 1, b: 2 });
    });

    it('keeps all other keys intact', () => {
        const result = omitProp({ a: 1, b: 2, c: 3, d: 4 }, 'c');

        expect(result).toEqual({ a: 1, b: 2, d: 4 });
    });

    it('handles an object where the key value is undefined', () => {
        const result = omitProp({ a: undefined, b: 2 }, 'a');

        expect(result).toEqual({ b: 2 });
    });
});
