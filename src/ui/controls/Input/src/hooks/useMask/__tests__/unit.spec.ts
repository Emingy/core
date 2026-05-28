import { describe, expect, it } from '@rstest/core';
import { renderHook } from '@testing-library/react';

import { useMask } from '..';

describe('[UNIT] useMask', () => {
    it('should return original value when mask is not provided', () => {
        const { result } = renderHook(() => useMask());

        const { maskedValue, unmaskedValue } = result.current.getValues('123abc', '');
        expect(maskedValue).toBe('123abc');
        expect(unmaskedValue).toBe('123abc');
    });

    it('should correctly format and clean value with simple digital mask', () => {
        const { result } = renderHook(() => useMask('d{3}-d{2}'));

        const { maskedValue, unmaskedValue } = result.current.getValues('12345', '1234');
        expect(maskedValue).toBe('123-45');
        expect(unmaskedValue).toBe('12345');
    });

    it('should handle static separators and clean them properly', () => {
        const { result } = renderHook(() => useMask('d{2}.d{2}.d{2}'));

        const { maskedValue, unmaskedValue } = result.current.getValues('112233', '11223');
        expect(maskedValue).toBe('11.22.33');
        expect(unmaskedValue).toBe('112233');
    });

    it('should respect prevValue during typing (insert static on growth)', () => {
        const { result } = renderHook(() => useMask('d{3}.d{3}'));

        const { maskedValue, unmaskedValue } = result.current.getValues('1234', '123');
        expect(maskedValue).toBe('123.4');
        expect(unmaskedValue).toBe('1234');
    });

    it('should filter invalid characters and clean correctly', () => {
        const { result } = renderHook(() => useMask('d{2}-w{2}'));

        const { maskedValue } = result.current.getValues('1a2b3c', '');
        expect(maskedValue).toBe('12-bc');

        const { maskedValue: mv2, unmaskedValue: uv2 } = result.current.getValues('12ab', '12a');
        expect(mv2).toBe('12-ab');
        expect(uv2).toBe('12ab');
    });

    it('should return consistent values when called multiple times with same args', () => {
        const { result } = renderHook(() => useMask('d{2}-d{2}'));

        const call1 = result.current.getValues('1234', '123');
        const call2 = result.current.getValues('1234', '123');

        expect(call1.maskedValue).toBe(call2.maskedValue);
        expect(call1.unmaskedValue).toBe(call2.unmaskedValue);
    });

    it('should handle empty string input', () => {
        const { result } = renderHook(() => useMask('d{3}-d{2}'));

        const { maskedValue, unmaskedValue } = result.current.getValues('', '');
        expect(maskedValue).toBe('');
        expect(unmaskedValue).toBe('');
    });
});
