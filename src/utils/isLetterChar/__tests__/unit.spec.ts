import { describe, expect, it } from '@rstest/core';

import { isLetterChar } from '..';

describe('[UNIT] isLetterChar', () => {
    it('should return true for English lowercase letters', () => {
        expect(isLetterChar('a')).toBe(true);
        expect(isLetterChar('m')).toBe(true);
        expect(isLetterChar('z')).toBe(true);
    });

    it('should return true for English uppercase letters', () => {
        expect(isLetterChar('A')).toBe(true);
        expect(isLetterChar('M')).toBe(true);
        expect(isLetterChar('Z')).toBe(true);
    });

    it('should return true for Cyrillic letters', () => {
        expect(isLetterChar('а')).toBe(true);
        expect(isLetterChar('А')).toBe(true);
        expect(isLetterChar('я')).toBe(true);
        expect(isLetterChar('Я')).toBe(true);
        expect(isLetterChar('ё')).toBe(true);
        expect(isLetterChar('Ё')).toBe(true);
    });

    it('should return true for letters with diacritics', () => {
        expect(isLetterChar('é')).toBe(true);
        expect(isLetterChar('ñ')).toBe(true);
        expect(isLetterChar('ü')).toBe(true);
        expect(isLetterChar('ç')).toBe(true);
        expect(isLetterChar('ø')).toBe(true);
        expect(isLetterChar('ą')).toBe(true);
    });

    it('should return true for Greek letters', () => {
        expect(isLetterChar('α')).toBe(true);
        expect(isLetterChar('Α')).toBe(true);
        expect(isLetterChar('ω')).toBe(true);
        expect(isLetterChar('Ω')).toBe(true);
    });

    it('should return true for Arabic letters', () => {
        expect(isLetterChar('ا')).toBe(true);
        expect(isLetterChar('ب')).toBe(true);
        expect(isLetterChar('ي')).toBe(true);
    });

    it('should return true for Chinese characters', () => {
        expect(isLetterChar('中')).toBe(true);
        expect(isLetterChar('文')).toBe(true);
        expect(isLetterChar('字')).toBe(true);
    });

    it('should return true for Japanese characters', () => {
        expect(isLetterChar('あ')).toBe(true); // Hiragana
        expect(isLetterChar('ア')).toBe(true); // Katakana
        expect(isLetterChar('漢')).toBe(true); // Kanji
    });

    it('should return true for Korean characters', () => {
        expect(isLetterChar('가')).toBe(true);
        expect(isLetterChar('한')).toBe(true);
        expect(isLetterChar('글')).toBe(true);
    });

    it('should return false for digit characters', () => {
        expect(isLetterChar('0')).toBe(false);
        expect(isLetterChar('5')).toBe(false);
        expect(isLetterChar('9')).toBe(false);
    });

    it('should return false for special characters', () => {
        expect(isLetterChar(' ')).toBe(false);
        expect(isLetterChar('!')).toBe(false);
        expect(isLetterChar('@')).toBe(false);
        expect(isLetterChar('#')).toBe(false);
        expect(isLetterChar('-')).toBe(false);
        expect(isLetterChar('_')).toBe(false);
        expect(isLetterChar('.')).toBe(false);
        expect(isLetterChar(',')).toBe(false);
    });

    it('should return false for empty string', () => {
        expect(isLetterChar('')).toBe(false);
    });

    it('should return false for multiple characters', () => {
        expect(isLetterChar('ab')).toBe(false);
        expect(isLetterChar('abc')).toBe(false);
        expect(isLetterChar('test')).toBe(false);
    });

    it('should return false for whitespace and control characters', () => {
        expect(isLetterChar('\n')).toBe(false);
        expect(isLetterChar('\t')).toBe(false);
        expect(isLetterChar('\r')).toBe(false);
        expect(isLetterChar(' ')).toBe(false);
    });

    it('should return false for numeric Unicode characters', () => {
        expect(isLetterChar('٠')).toBe(false); // Arabic-Indic digit zero
        expect(isLetterChar('०')).toBe(false); // Devanagari digit zero
    });

    it('should return false for punctuation and symbols', () => {
        expect(isLetterChar('。')).toBe(false); // Japanese period
        expect(isLetterChar('、')).toBe(false); // Japanese comma
        expect(isLetterChar('¿')).toBe(false); // Inverted question mark
        expect(isLetterChar('§')).toBe(false); // Section sign
    });
});
