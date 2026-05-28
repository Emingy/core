import { afterAll, beforeAll, describe, expect, it } from '@rstest/core';
import { act, renderHook } from '@testing-library/react';

import { EDeviceType, SCREEN_SIZE_BREAKPOINT_CHECKERS } from '../constants';
import { useDeviceType } from '..';

const originalInnerWidth = window.innerWidth;
const originalAddEventListener = window.addEventListener;
const originalRemoveEventListener = window.removeEventListener;

const setWindowWidth = (width: number) => {
    window.innerWidth = width;

    act(() => {
        window.dispatchEvent(new Event('resize'));
    });
};

describe('[UNIT] useDeviceType', () => {
    beforeAll(() => {
        window.addEventListener = () => {};
        window.removeEventListener = () => {};
    });

    afterAll(() => {
        window.innerWidth = originalInnerWidth;
        window.addEventListener = originalAddEventListener;
        window.removeEventListener = originalRemoveEventListener;
    });

    it('Mobile breakpoint checker', () => {
        const min = 0;
        const max = 599;

        expect(SCREEN_SIZE_BREAKPOINT_CHECKERS[EDeviceType.Mobile](min)).toEqual(true);
        expect(SCREEN_SIZE_BREAKPOINT_CHECKERS[EDeviceType.Mobile](max)).toEqual(true);
        expect(SCREEN_SIZE_BREAKPOINT_CHECKERS[EDeviceType.Mobile](max + 1)).toEqual(false);
    });
    it('Tablet breakpoint checker', () => {
        const min = 600;
        const max = 1024;

        expect(SCREEN_SIZE_BREAKPOINT_CHECKERS[EDeviceType.Tablet](min - 1)).toEqual(false);
        expect(SCREEN_SIZE_BREAKPOINT_CHECKERS[EDeviceType.Tablet](min)).toEqual(true);
        expect(SCREEN_SIZE_BREAKPOINT_CHECKERS[EDeviceType.Tablet](max)).toEqual(true);
        expect(SCREEN_SIZE_BREAKPOINT_CHECKERS[EDeviceType.Tablet](max + 1)).toEqual(false);
    });
    it('Desktop breakpoint checker', () => {
        const min = 1025;

        expect(SCREEN_SIZE_BREAKPOINT_CHECKERS[EDeviceType.Desktop](min - 1)).toEqual(false);
        expect(SCREEN_SIZE_BREAKPOINT_CHECKERS[EDeviceType.Desktop](min)).toEqual(true);
    });

    it('return isDesktop with width > 1200px (initial render)', () => {
        setWindowWidth(1300);

        const { result } = renderHook(() => useDeviceType());

        expect(result.current.isDesktop).toBe(true);
        expect(result.current.isTablet).toBe(false);
        expect(result.current.isMobile).toBe(false);
    });

    it('change to isTablet when resize (768px <= width < 1200px)', () => {
        setWindowWidth(1300);
        const { result } = renderHook(() => useDeviceType());
        expect(result.current.isDesktop).toBe(true);

        setWindowWidth(900);

        setTimeout(() => {
            expect(result.current.isDesktop).toBe(false);
            expect(result.current.isTablet).toBe(true);
            expect(result.current.isMobile).toBe(false);
        }, 300);
    });

    it('change to isMobile when resize (width < 768px)', () => {
        setWindowWidth(1300);
        const { result } = renderHook(() => useDeviceType());
        expect(result.current.isDesktop).toBe(true);

        setWindowWidth(500);

        setTimeout(() => {
            expect(result.current.isDesktop).toBe(false);
            expect(result.current.isTablet).toBe(false);
            expect(result.current.isMobile).toBe(true);
        }, 300);
    });

    it('event listener removed when unmount', () => {
        const { unmount } = renderHook(() => useDeviceType());

        setTimeout(() => {
            expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
        }, 300);

        unmount();

        setTimeout(() => {
            expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
        }, 300);
    });
});
