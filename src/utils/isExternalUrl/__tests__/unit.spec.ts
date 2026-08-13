import { describe, expect, it } from '@rstest/core';

import { isExternalUrl } from '..';

describe('[UNIT] isExternalUrl', () => {
    it('should return true for http(s) URLs', () => {
        expect(isExternalUrl('http://example.com')).toBe(true);
        expect(isExternalUrl('https://example.com')).toBe(true);
    });

    it('should return false for internal paths', () => {
        expect(isExternalUrl('/dashboard')).toBe(false);
        expect(isExternalUrl('dashboard')).toBe(false);
        expect(isExternalUrl('#section')).toBe(false);
    });

    it('should return false for other protocols', () => {
        expect(isExternalUrl('mailto:test@example.com')).toBe(false);
        expect(isExternalUrl('ftp://example.com')).toBe(false);
    });

    it('should return false for an empty string', () => {
        expect(isExternalUrl('')).toBe(false);
    });

    it('should only match a leading protocol', () => {
        expect(isExternalUrl('/redirect?to=https://example.com')).toBe(false);
    });
});
