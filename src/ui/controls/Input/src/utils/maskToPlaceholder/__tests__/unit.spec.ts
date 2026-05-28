import { describe, expect, it } from '@rstest/core';

import { maskToPlaceholder } from '..';

describe('[UNIT] maskToPlaceholder', () => {
    it('should convert simple digital mask to placeholder', () => {
        const result = maskToPlaceholder('d{3}');
        expect(result).toBe('111');
    });

    it('should convert phone mask to placeholder', () => {
        const result = maskToPlaceholder('+7 (d{3}) d{3}-d{2}-d{2}');
        expect(result).toBe('+7 (111) 111-11-11');
    });

    it('should convert letter mask to placeholder', () => {
        const result = maskToPlaceholder('w{3}-w{2}');
        expect(result).toBe('aaa-aa');
    });

    it('should convert any char mask to placeholder', () => {
        const result = maskToPlaceholder('*{5}');
        expect(result).toBe('*****');
    });

    it('should convert mixed mask to placeholder', () => {
        const result = maskToPlaceholder('d{2}.d{2}.d{4}');
        expect(result).toBe('11.11.1111');
    });

    it('should convert single char masks without count', () => {
        const result = maskToPlaceholder('ddd-www');
        expect(result).toBe('111-aaa');
    });

    it('should handle mask with range (ignores max)', () => {
        const result = maskToPlaceholder('d{2,4}');
        expect(result).toBe('11');
    });

    it('should preserve static parts of mask', () => {
        const result = maskToPlaceholder('Prefix: d{3}');
        expect(result).toBe('Prefix: 111');
    });

    it('should return empty string for empty mask', () => {
        const result = maskToPlaceholder('');
        expect(result).toBe('');
    });

    it('should handle complex real-world mask', () => {
        const result = maskToPlaceholder('d{4} d{4} d{4} d{4}');
        expect(result).toBe('1111 1111 1111 1111');
    });

    it('should handle mask with range using hyphen (ignores max)', () => {
        const result = maskToPlaceholder('d{2-4}');
        expect(result).toBe('11');
    });

    it('should handle mixed separators in one mask', () => {
        const result = maskToPlaceholder('d{1-3}w{2,4}');
        expect(result).toBe('1aa');
    });

    it('should convert phone mask with hyphen ranges', () => {
        const result = maskToPlaceholder('+7 (d{3}) d{3-4}');
        expect(result).toBe('+7 (111) 111');
    });

    it('should handle complex mask with both separators', () => {
        const result = maskToPlaceholder('d{2-4}.d{3,5}.d{4}');
        expect(result).toBe('11.111.1111');
    });
});
