import { describe, expect, it } from '@rstest/core';

import { calculateCursorPosition } from '..';

describe('[UNIT] calculateCursorPosition', () => {
    it('should set cursor to end when it was at end', () => {
        const result = calculateCursorPosition({
            currentCursorPosition: 5,
            oldValue: '12345',
            newMaskedValue: '123-45',
        });

        expect(result).toBe(6);
    });

    it('should set cursor to end when it was after the last character', () => {
        const result = calculateCursorPosition({
            currentCursorPosition: 6,
            oldValue: '12345',
            newMaskedValue: '123-45-67',
        });

        expect(result).toBe(9);
    });

    it('should adjust cursor position for middle insertion', () => {
        const result = calculateCursorPosition({
            currentCursorPosition: 3,
            oldValue: '123',
            newMaskedValue: '123.',
        });

        // Cursor was at end (position 3 with length 3), so it moves to end of new value
        expect(result).toBe(4);
    });

    it('should keep cursor at position when value length stays same', () => {
        const result = calculateCursorPosition({
            currentCursorPosition: 2,
            oldValue: '12',
            newMaskedValue: '12',
        });

        expect(result).toBe(2);
    });

    it('should not allow negative cursor position', () => {
        const result = calculateCursorPosition({
            currentCursorPosition: 0,
            oldValue: 'abc',
            newMaskedValue: 'a',
        });

        expect(result).toBe(0);
    });

    it('should not exceed new value length', () => {
        const result = calculateCursorPosition({
            currentCursorPosition: 10,
            oldValue: '123',
            newMaskedValue: '12',
        });

        expect(result).toBe(2);
    });

    it('should handle empty old value', () => {
        const result = calculateCursorPosition({
            currentCursorPosition: 0,
            oldValue: '',
            newMaskedValue: '1',
        });

        expect(result).toBe(1);
    });

    it('should handle empty new value', () => {
        const result = calculateCursorPosition({
            currentCursorPosition: 3,
            oldValue: '123',
            newMaskedValue: '',
        });

        expect(result).toBe(0);
    });

    it('should handle phone mask scenario', () => {
        const result = calculateCursorPosition({
            currentCursorPosition: 4,
            oldValue: '123',
            newMaskedValue: '+7 (123) ',
        });

        // Cursor was after end (position 4 with length 3), so it moves to end of new value
        expect(result).toBe(9);
    });

    it('should position cursor at end when typing at end', () => {
        const result = calculateCursorPosition({
            currentCursorPosition: 10,
            oldValue: '+7 (123) 4',
            newMaskedValue: '+7 (123) 45',
        });

        expect(result).toBe(11);
    });

    it('should adjust cursor when inserting in the middle', () => {
        const result = calculateCursorPosition({
            currentCursorPosition: 2,
            oldValue: '12345',
            newMaskedValue: '12-345',
        });

        // Cursor at position 2, string grew by 1, so cursor moves to position 3
        expect(result).toBe(3);
    });

    it('should adjust cursor when deleting in the middle', () => {
        const result = calculateCursorPosition({
            currentCursorPosition: 3,
            oldValue: '12-345',
            newMaskedValue: '12345',
        });

        // Cursor at position 3, string shrunk by 1, so cursor moves to position 2
        expect(result).toBe(2);
    });
});
