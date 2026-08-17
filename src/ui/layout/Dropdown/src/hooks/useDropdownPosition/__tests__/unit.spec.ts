import { describe, expect, it } from '@rstest/core';
import { renderHook } from '@testing-library/react';

import { useDropdownPosition } from '..';

const createTriggerRef = (rect: Partial<DOMRect>) => {
    const element = document.createElement('div');

    element.getBoundingClientRect = () =>
        ({
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            toJSON: () => {},
            ...rect,
        }) as DOMRect;

    return { current: element };
};

const createPanelRef = (size: { width: number; height: number }) => {
    const element = document.createElement('div');

    Object.defineProperty(element, 'offsetWidth', { value: size.width, configurable: true });
    Object.defineProperty(element, 'offsetHeight', { value: size.height, configurable: true });

    return { current: element };
};

const RECT = { top: 10, left: 20, right: 120, bottom: 30, width: 100, height: 20 };
const RECT_CENTERED = { top: 300, left: 300, right: 400, bottom: 320, width: 100, height: 20 };
const PANEL_SIZE = { width: 200, height: 200 };

describe('[UNIT] useDropdownPosition', () => {
    it('Returns empty style while not mounted', () => {
        const triggerRef = createTriggerRef(RECT);
        const panelRef = createPanelRef(PANEL_SIZE);
        const { result } = renderHook(() =>
            useDropdownPosition({ triggerRef, panelRef, direction: 'bottom', isMounted: false })
        );

        expect(result.current).toEqual({});
    });

    it('Positions below the trigger for bottom direction', () => {
        const triggerRef = createTriggerRef(RECT);
        const panelRef = createPanelRef(PANEL_SIZE);
        const { result } = renderHook(() =>
            useDropdownPosition({ triggerRef, panelRef, direction: 'bottom', isMounted: true })
        );

        expect(result.current).toEqual({ top: '38px', left: '20px', width: '100px' });
    });

    it('Positions above the trigger for top direction', () => {
        const triggerRef = createTriggerRef(RECT_CENTERED);
        const panelRef = createPanelRef(PANEL_SIZE);
        const { result } = renderHook(() =>
            useDropdownPosition({ triggerRef, panelRef, direction: 'top', isMounted: true })
        );

        expect(result.current).toEqual({
            top: '292px',
            left: '300px',
            width: '100px',
            transform: 'translateY(-100%)',
        });
    });

    it('Positions left of the trigger for left direction', () => {
        const triggerRef = createTriggerRef(RECT_CENTERED);
        const panelRef = createPanelRef(PANEL_SIZE);
        const { result } = renderHook(() =>
            useDropdownPosition({ triggerRef, panelRef, direction: 'left', isMounted: true })
        );

        expect(result.current).toEqual({
            top: '300px',
            left: '292px',
            width: '100px',
            transform: 'translateX(-100%)',
        });
    });

    it('Positions right of the trigger for right direction', () => {
        const triggerRef = createTriggerRef(RECT);
        const panelRef = createPanelRef(PANEL_SIZE);
        const { result } = renderHook(() =>
            useDropdownPosition({ triggerRef, panelRef, direction: 'right', isMounted: true })
        );

        expect(result.current).toEqual({ top: '10px', left: '128px', width: '100px' });
    });

    it('Flips to top when bottom direction overflows the viewport', () => {
        const triggerRef = createTriggerRef({
            top: window.innerHeight - 30,
            left: 20,
            right: 120,
            bottom: window.innerHeight - 10,
            width: 100,
            height: 20,
        });
        const panelRef = createPanelRef(PANEL_SIZE);

        const { result } = renderHook(() =>
            useDropdownPosition({ triggerRef, panelRef, direction: 'bottom', isMounted: true })
        );

        expect(result.current.transform).toBe('translateY(-100%)');
    });

    it('Flips to bottom when top direction overflows above the viewport', () => {
        const triggerRef = createTriggerRef({
            top: 10,
            left: 20,
            right: 120,
            bottom: 30,
            width: 100,
            height: 20,
        });
        const panelRef = createPanelRef(PANEL_SIZE);

        const { result } = renderHook(() =>
            useDropdownPosition({ triggerRef, panelRef, direction: 'top', isMounted: true })
        );

        expect(result.current).toEqual({ top: '38px', left: '20px', width: '100px' });
    });

    it('Uses the container edge instead of the trigger edge when containerRef is provided', () => {
        const triggerRef = createTriggerRef(RECT);
        const containerRef = createTriggerRef({
            top: 0,
            left: 0,
            right: 200,
            bottom: 300,
            width: 200,
            height: 300,
        });
        const panelRef = createPanelRef(PANEL_SIZE);

        const { result } = renderHook(() =>
            useDropdownPosition({
                triggerRef,
                panelRef,
                containerRef,
                direction: 'right',
                isMounted: true,
            })
        );

        expect(result.current).toEqual({ top: '10px', left: '208px', width: '100px' });
    });
});
