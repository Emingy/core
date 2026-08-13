import { afterEach, beforeEach, describe, expect, it, rstest } from '@rstest/core';
import { act, renderHook } from '@testing-library/react';

import { useDropdownOpenState } from '..';

const createRefs = () => ({
    triggerRef: { current: document.createElement('div') },
    panelRef: { current: document.createElement('div') },
});

describe('[UNIT] useDropdownOpenState', () => {
    beforeEach(() => {
        rstest.useFakeTimers();
    });

    afterEach(() => {
        rstest.useRealTimers();
    });

    it('Starts closed by default', () => {
        const { triggerRef, panelRef } = createRefs();
        const { result } = renderHook(() =>
            useDropdownOpenState({ triggerRef, panelRef, triggerMode: ['click'] })
        );

        expect(result.current.open).toBe(false);
    });

    it('Toggles internal open state', () => {
        const { triggerRef, panelRef } = createRefs();
        const { result } = renderHook(() =>
            useDropdownOpenState({ triggerRef, panelRef, triggerMode: ['click'] })
        );

        act(() => result.current.toggle());
        expect(result.current.open).toBe(true);

        act(() => result.current.toggle());
        expect(result.current.open).toBe(false);
    });

    it('Uses controlled isOpen instead of internal state', () => {
        const { triggerRef, panelRef } = createRefs();
        const { result } = renderHook(() =>
            useDropdownOpenState({ triggerRef, panelRef, triggerMode: ['click'], isOpen: true })
        );

        expect(result.current.open).toBe(true);

        act(() => result.current.toggle());
        expect(result.current.open).toBe(true);
    });

    it('Calls onOpenChange on toggle', () => {
        const { triggerRef, panelRef } = createRefs();
        let received: boolean | null = null;

        const { result } = renderHook(() =>
            useDropdownOpenState({
                triggerRef,
                panelRef,
                triggerMode: ['click'],
                onOpenChange: (value) => (received = value),
            })
        );

        act(() => result.current.toggle());
        expect(received).toBe(true);
    });

    it('Closes on outside pointerdown while open', () => {
        const { triggerRef, panelRef } = createRefs();
        const { result } = renderHook(() =>
            useDropdownOpenState({ triggerRef, panelRef, triggerMode: ['click'] })
        );

        act(() => result.current.toggle());
        expect(result.current.open).toBe(true);

        act(() => {
            document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        });

        expect(result.current.open).toBe(false);
    });

    it('Does not close on click inside the trigger', () => {
        const { triggerRef, panelRef } = createRefs();
        const { result } = renderHook(() =>
            useDropdownOpenState({ triggerRef, panelRef, triggerMode: ['click'] })
        );

        act(() => result.current.toggle());

        act(() => {
            triggerRef.current.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        });

        expect(result.current.open).toBe(true);
    });

    it('Closes on Escape key while open', () => {
        const { triggerRef, panelRef } = createRefs();
        const { result } = renderHook(() =>
            useDropdownOpenState({ triggerRef, panelRef, triggerMode: ['click'] })
        );

        act(() => result.current.toggle());

        act(() => {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        });

        expect(result.current.open).toBe(false);
    });

    describe('trigger mode', () => {
        it('Exposes isClickEnabled and no hoverHandlers for click mode', () => {
            const { triggerRef, panelRef } = createRefs();
            const { result } = renderHook(() =>
                useDropdownOpenState({ triggerRef, panelRef, triggerMode: ['click'] })
            );

            expect(result.current.isClickEnabled).toBe(true);
            expect(result.current.hoverHandlers).toBeUndefined();
        });

        it('Exposes hoverHandlers and disables click for hover mode', () => {
            const { triggerRef, panelRef } = createRefs();
            const { result } = renderHook(() =>
                useDropdownOpenState({ triggerRef, panelRef, triggerMode: ['hover'] })
            );

            expect(result.current.isClickEnabled).toBe(false);
            expect(result.current.hoverHandlers).toBeDefined();
        });

        it('Exposes both hoverHandlers and isClickEnabled for combined mode', () => {
            const { triggerRef, panelRef } = createRefs();
            const { result } = renderHook(() =>
                useDropdownOpenState({ triggerRef, panelRef, triggerMode: ['hover', 'click'] })
            );

            expect(result.current.isClickEnabled).toBe(true);
            expect(result.current.hoverHandlers).toBeDefined();
        });

        it('Opens immediately on hover enter', () => {
            const { triggerRef, panelRef } = createRefs();
            const { result } = renderHook(() =>
                useDropdownOpenState({ triggerRef, panelRef, triggerMode: ['hover'] })
            );

            act(() => result.current.hoverHandlers?.onMouseEnter());

            expect(result.current.open).toBe(true);
        });

        it('Closes after the hover delay on mouse leave', () => {
            const { triggerRef, panelRef } = createRefs();
            const { result } = renderHook(() =>
                useDropdownOpenState({ triggerRef, panelRef, triggerMode: ['hover'] })
            );

            act(() => result.current.hoverHandlers?.onMouseEnter());
            act(() => result.current.hoverHandlers?.onMouseLeave());

            expect(result.current.open).toBe(true);

            act(() => {
                rstest.advanceTimersByTime(150);
            });

            expect(result.current.open).toBe(false);
        });

        it('Cancels the pending close when hover re-enters before the delay elapses', () => {
            const { triggerRef, panelRef } = createRefs();
            const { result } = renderHook(() =>
                useDropdownOpenState({ triggerRef, panelRef, triggerMode: ['hover'] })
            );

            act(() => result.current.hoverHandlers?.onMouseEnter());
            act(() => result.current.hoverHandlers?.onMouseLeave());

            act(() => {
                rstest.advanceTimersByTime(100);
            });

            act(() => result.current.hoverHandlers?.onMouseEnter());

            act(() => {
                rstest.advanceTimersByTime(100);
            });

            expect(result.current.open).toBe(true);
        });
    });
});
