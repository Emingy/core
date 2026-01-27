import { describe, expect, it } from '@rstest/core';

import { isDigitChar } from '..';

describe('[UNIT] isDigitChar', () => {
    it('should return true for single digit characters 0-9', () => {
        expect(isDigitChar('0')).toBe(true);
        expect(isDigitChar('1')).toBe(true);
        expect(isDigitChar('5')).toBe(true);
        expect(isDigitChar('9')).toBe(true);
    });

    it('should return false for letter characters', () => {
        expect(isDigitChar('a')).toBe(false);
        expect(isDigitChar('Z')).toBe(false);
        expect(isDigitChar('й')).toBe(false);
        expect(isDigitChar('ñ')).toBe(false);
    });

    it('should return false for special characters', () => {
        expect(isDigitChar(' ')).toBe(false);
        expect(isDigitChar('!')).toBe(false);
        expect(isDigitChar('@')).toBe(false);
        expect(isDigitChar('#')).toBe(false);
        expect(isDigitChar('-')).toBe(false);
        expect(isDigitChar('_')).toBe(false);
        expect(isDigitChar('.')).toBe(false);
        expect(isDigitChar(',')).toBe(false);
    });

    it('should return false for empty string', () => {
        expect(isDigitChar('')).toBe(false);
    });

    it('should return false for multiple characters', () => {
        expect(isDigitChar('12')).toBe(false);
        expect(isDigitChar('123')).toBe(false);
        expect(isDigitChar('00')).toBe(false);
    });

    it('should return false for non-ASCII digits', () => {
        expect(isDigitChar('٠')).toBe(false); // Arabic-Indic digit zero
        expect(isDigitChar('०')).toBe(false); // Devanagari digit zero
        expect(isDigitChar('一')).toBe(false); // Chinese number one
    });

    it('should return false for whitespace and control characters', () => {
        expect(isDigitChar('\n')).toBe(false);
        expect(isDigitChar('\t')).toBe(false);
        expect(isDigitChar('\r')).toBe(false);
    });
});
