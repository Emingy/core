import { describe, expect, it } from '@rstest/core';

import { EMaskType, TParsedMask } from '../../parseMask';
import { applyMask } from '..'; // укажи правильный путь

describe('[UNIT] applyMask', () => {
    it('should return empty string for empty input', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Digital, min: 1, max: 3 },
            { type: EMaskType.Static, value: '-' },
            { type: EMaskType.Digital, min: 1, max: 3 },
        ];

        expect(applyMask({ value: '', prevValue: '', parsedMaskList: parsedMask })).toBe('');
    });

    it('should insert static parts during typing (prevValue shorter than value)', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Digital, min: 1, max: 3 },
            { type: EMaskType.Static, value: '.' },
            { type: EMaskType.Digital, min: 1, max: 3 },
        ];

        expect(applyMask({ value: '1111', prevValue: '111', parsedMaskList: parsedMask })).toBe(
            '111.1'
        );

        expect(applyMask({ value: '11111', prevValue: '111.1', parsedMaskList: parsedMask })).toBe(
            '111.11'
        );
    });

    it('should NOT insert static part when deleting (prevValue longer than value)', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Digital, min: 1, max: 3 },
            { type: EMaskType.Static, value: '.' },
            { type: EMaskType.Digital, min: 1, max: 3 },
        ];

        expect(applyMask({ value: '111.1', prevValue: '111.11', parsedMaskList: parsedMask })).toBe(
            '111.1'
        );

        expect(applyMask({ value: '111', prevValue: '111.1', parsedMaskList: parsedMask })).toBe(
            '111'
        );
    });

    it('should filter out invalid characters', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Digital, min: 1, max: 3 },
            { type: EMaskType.Static, value: '-' },
            { type: EMaskType.Letter, min: 1, max: 2 },
        ];

        expect(applyMask({ value: '1a', prevValue: '', parsedMaskList: parsedMask })).toBe('1-a');

        expect(applyMask({ value: '123-ab', prevValue: '123-a', parsedMaskList: parsedMask })).toBe(
            '123-ab'
        );
    });

    it('should respect max length of dynamic segments', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Digital, min: 1, max: 2 },
            { type: EMaskType.Static, value: ':' },
            { type: EMaskType.Digital, min: 1, max: 2 },
        ];

        expect(applyMask({ value: '1234', prevValue: '123', parsedMaskList: parsedMask })).toBe(
            '12:34'
        );
    });

    it('should handle mask with only static parts', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Static, value: 'ID: ' },
            { type: EMaskType.Static, value: 'END' },
        ];

        expect(applyMask({ value: 'anything', prevValue: '', parsedMaskList: parsedMask })).toBe(
            'ID: END'
        );
    });

    it('should handle mask with only dynamic parts', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Digital, min: 1, max: 2 },
            { type: EMaskType.Letter, min: 1, max: 2 },
        ];

        expect(applyMask({ value: '12ab', prevValue: '12a', parsedMaskList: parsedMask })).toBe(
            '12ab'
        );

        expect(applyMask({ value: '1a2b', prevValue: '', parsedMaskList: parsedMask })).toBe('1a');
    });

    it('should stop when mask is exhausted', () => {
        const parsedMask: TParsedMask = [{ type: EMaskType.Digital, min: 1, max: 2 }];

        expect(applyMask({ value: '12345', prevValue: '1234', parsedMaskList: parsedMask })).toBe(
            '12'
        );
    });

    it('should not add static part at the end if no following dynamic content', () => {
        const parsedMask: TParsedMask = [
            { type: EMaskType.Digital, min: 1, max: 3 },
            { type: EMaskType.Static, value: '.' },
        ];

        // Вводим 3 цифры — точка не добавляется, потому что после неё нет динамики
        expect(applyMask({ value: '123', prevValue: '12', parsedMaskList: parsedMask })).toBe(
            '123'
        );
    });
});
