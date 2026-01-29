import { describe, expect, it } from '@rstest/core';

import { EMaskType, type TParsedMask } from '../../parseMask';
import { cleanValue } from '..';

describe('[UNIT] cleanValue', () => {
    it('should return empty string for empty input', () => {
        expect(cleanValue('', [])).toBe('');
        expect(cleanValue('', [{ type: EMaskType.Static, value: 'abc' }])).toBe('');
    });

    it('should return empty string if first static part does not match', () => {
        const parsedMask: TParsedMask = [{ type: EMaskType.Static, value: '7' }];
        expect(cleanValue('8', parsedMask)).toBe('');
    });

    it('should extract dynamic content when mask starts with static', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Static, value: '7' },
            { type: EMaskType.Digital, min: 1, max: 3 },
        ];
        expect(cleanValue('7123', parsedMask)).toBe('123');
        expect(cleanValue('71', parsedMask)).toBe('1');
        expect(cleanValue('7', parsedMask)).toBe('');
    });

    it('should extract dynamic content with static separator', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Digital, min: 1, max: 3 },
            { type: EMaskType.Static, value: '.' },
            { type: EMaskType.Digital, min: 1, max: 3 },
            { type: EMaskType.Static, value: '.' },
            { type: EMaskType.Digital, min: 1, max: 3 },
        ];
        expect(cleanValue('11.11.11', parsedMask)).toBe('111111');
        expect(cleanValue('11.11.', parsedMask)).toBe('1111');
        expect(cleanValue('11.', parsedMask)).toBe('11');
    });

    it('should stop when static part does not match in the middle', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Static, value: '7' },
            { type: EMaskType.Digital, min: 1, max: 2 },
            { type: EMaskType.Static, value: '-' },
        ];
        expect(cleanValue('712_', parsedMask)).toBe('12');
        expect(cleanValue('712', parsedMask)).toBe('12');
    });

    it('should work with mask containing only dynamic parts', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Digital, min: 1, max: 2 },
            { type: EMaskType.Letter, min: 1, max: 3 },
        ];
        expect(cleanValue('12abc', parsedMask)).toBe('12abc');
        expect(cleanValue('1ab', parsedMask)).toBe('1ab');
        expect(cleanValue('1', parsedMask)).toBe('1');
    });

    it('should work with mask containing only static parts', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Static, value: 'abc' },
            { type: EMaskType.Static, value: 'def' },
        ];
        expect(cleanValue('abcdef', parsedMask)).toBe('');
        expect(cleanValue('abc', parsedMask)).toBe('');
    });

    it('should stop processing when string ends mid-segment', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Static, value: '(' },
            { type: EMaskType.Digital, min: 1, max: 3 },
            { type: EMaskType.Static, value: ')' },
        ];
        expect(cleanValue('(12', parsedMask)).toBe('12');
        expect(cleanValue('(', parsedMask)).toBe('');
    });

    it('should not crash on mask longer than input', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Digital, min: 1, max: 1 },
            { type: EMaskType.Digital, min: 1, max: 1 },
            { type: EMaskType.Digital, min: 1, max: 1 },
        ];
        expect(cleanValue('1', parsedMask)).toBe('1');
        expect(cleanValue('', parsedMask)).toBe('');
    });
});
