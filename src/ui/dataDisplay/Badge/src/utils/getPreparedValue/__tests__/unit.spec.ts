import { describe, expect, it } from '@rstest/core';

import { getPreparedValue } from '..';

describe('[UNIT] getPreparedValue', () => {
    it('Returns string value as-is', () => {
        const result = getPreparedValue('Test');
        expect(result).toBe('Test');
    });

    it('Returns empty string as-is', () => {
        const result = getPreparedValue('');
        expect(result).toBe('');
    });

    it('Returns long string as-is', () => {
        const result = getPreparedValue('Very Long Badge Text');
        expect(result).toBe('Very Long Badge Text');
    });

    it('Converts number to string', () => {
        const result = getPreparedValue(5);
        expect(result).toBe('5');
    });

    it('Converts zero to string', () => {
        const result = getPreparedValue(0);
        expect(result).toBe('0');
    });

    it('Converts negative number to string', () => {
        const result = getPreparedValue(-10);
        expect(result).toBe('-10');
    });

    it('Returns "99+" for number 100', () => {
        const result = getPreparedValue(100);
        expect(result).toBe('99+');
    });

    it('Returns "99+" for number greater than 100', () => {
        const result = getPreparedValue(150);
        expect(result).toBe('99+');
    });

    it('Returns "99+" for large number', () => {
        const result = getPreparedValue(9999);
        expect(result).toBe('99+');
    });

    it('Returns "99" for exactly 99', () => {
        const result = getPreparedValue(99);
        expect(result).toBe('99');
    });

    it('Returns "98" for 98', () => {
        const result = getPreparedValue(98);
        expect(result).toBe('98');
    });

    it('Returns "1" for 1', () => {
        const result = getPreparedValue(1);
        expect(result).toBe('1');
    });
});
