import { describe, expect, it } from '@rstest/core';

import { EMaskType, parseMask } from '..';

describe('[UNIT] parseMask', () => {
    it('should parse simple digital mask', () => {
        expect(parseMask('d')).toEqual([{ type: EMaskType.Digital, min: 1, max: 1 }]);
    });

    it('should parse simple letter mask', () => {
        expect(parseMask('w')).toEqual([{ type: EMaskType.Letter, min: 1, max: 1 }]);
    });

    it('should parse simple any mask', () => {
        expect(parseMask('*')).toEqual([{ type: EMaskType.Any, min: 1, max: 1 }]);
    });

    it('should parse static content', () => {
        expect(parseMask('abc')).toEqual([{ type: EMaskType.Static, value: 'abc' }]);
    });

    it('should parse mask with static and dynamic parts', () => {
        expect(parseMask('+7 (d{3}) d{3}-d{2}-d{2}')).toEqual([
            { type: EMaskType.Static, value: '+7 (' },
            { type: EMaskType.Digital, min: 3, max: 3 },
            { type: EMaskType.Static, value: ') ' },
            { type: EMaskType.Digital, min: 3, max: 3 },
            { type: EMaskType.Static, value: '-' },
            { type: EMaskType.Digital, min: 2, max: 2 },
            { type: EMaskType.Static, value: '-' },
            { type: EMaskType.Digital, min: 2, max: 2 },
        ]);
    });

    it('should parse ranges correctly', () => {
        expect(parseMask('d{2,5}')).toEqual([{ type: EMaskType.Digital, min: 2, max: 5 }]);
    });

    it('should default min and max to 1 when range not specified', () => {
        expect(parseMask('d w *')).toEqual([
            { type: EMaskType.Digital, min: 1, max: 1 },
            { type: EMaskType.Static, value: ' ' },
            { type: EMaskType.Letter, min: 1, max: 1 },
            { type: EMaskType.Static, value: ' ' },
            { type: EMaskType.Any, min: 1, max: 1 },
        ]);
    });

    it('should handle multiple static segments', () => {
        expect(parseMask('a*d*b')).toEqual([
            { type: EMaskType.Static, value: 'a' },
            { type: EMaskType.Any, min: 1, max: 1 },
            { type: EMaskType.Digital, min: 1, max: 1 },
            { type: EMaskType.Any, min: 1, max: 1 },
            { type: EMaskType.Static, value: 'b' },
        ]);
    });

    it('should throw error when min > max in range', () => {
        expect(() => parseMask('d{5,2}')).toThrow('Invalid range in "d{5,2}": min (5) > max (2)');
    });

    it('should correctly parse mask ending with static part', () => {
        expect(parseMask('dabc')).toEqual([
            { type: EMaskType.Digital, min: 1, max: 1 },
            { type: EMaskType.Static, value: 'abc' },
        ]);
    });

    it('should correctly parse mask starting with static part', () => {
        expect(parseMask('abc d')).toEqual([
            { type: EMaskType.Static, value: 'abc ' },
            { type: EMaskType.Digital, min: 1, max: 1 },
        ]);
    });

    it('should parse empty mask', () => {
        expect(parseMask('')).toEqual([]);
    });

    it('should handle multiple range types in one mask', () => {
        expect(parseMask('d{1,3}w{2,4}*{1,2}')).toEqual([
            { type: EMaskType.Digital, min: 1, max: 3 },
            { type: EMaskType.Letter, min: 2, max: 4 },
            { type: EMaskType.Any, min: 1, max: 2 },
        ]);
    });

    it('should parse repeated mask characters as separate single-char entries', () => {
        expect(parseMask('dddwww***')).toEqual([
            { type: EMaskType.Digital, min: 1, max: 1 },
            { type: EMaskType.Digital, min: 1, max: 1 },
            { type: EMaskType.Digital, min: 1, max: 1 },
            { type: EMaskType.Letter, min: 1, max: 1 },
            { type: EMaskType.Letter, min: 1, max: 1 },
            { type: EMaskType.Letter, min: 1, max: 1 },
            { type: EMaskType.Any, min: 1, max: 1 },
            { type: EMaskType.Any, min: 1, max: 1 },
            { type: EMaskType.Any, min: 1, max: 1 },
        ]);
    });

    it('should parse ranges with hyphen separator', () => {
        expect(parseMask('d{2-5}')).toEqual([{ type: EMaskType.Digital, min: 2, max: 5 }]);
    });

    it('should handle mixed comma and hyphen separators', () => {
        expect(parseMask('d{1-3}w{2,4}*{1-2}')).toEqual([
            { type: EMaskType.Digital, min: 1, max: 3 },
            { type: EMaskType.Letter, min: 2, max: 4 },
            { type: EMaskType.Any, min: 1, max: 2 },
        ]);
    });

    it('should throw error when min > max with hyphen separator', () => {
        expect(() => parseMask('d{5-2}')).toThrow('Invalid range in "d{5-2}": min (5) > max (2)');
    });

    it('should parse phone mask with hyphen ranges', () => {
        expect(parseMask('+7 (d{3}) d{3-4}-d{2}')).toEqual([
            { type: EMaskType.Static, value: '+7 (' },
            { type: EMaskType.Digital, min: 3, max: 3 },
            { type: EMaskType.Static, value: ') ' },
            { type: EMaskType.Digital, min: 3, max: 4 },
            { type: EMaskType.Static, value: '-' },
            { type: EMaskType.Digital, min: 2, max: 2 },
        ]);
    });
});
