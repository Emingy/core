import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';
import { renderHook } from '@testing-library/react';

import type { TTooltipItem } from '../../../../types';
import { useTooltipPosition } from '..';

const createTrigger = (rect: Partial<DOMRect>) => {
    const trigger = document.createElement('div');
    Object.defineProperty(trigger, 'getBoundingClientRect', {
        value: () => ({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, ...rect }),
        configurable: true,
    });
    return trigger;
};

const createBubbleRef = (width: number, height = 20) => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'offsetWidth', { value: width, configurable: true });
    Object.defineProperty(el, 'offsetHeight', { value: height, configurable: true });
    return { current: el };
};

describe('[UNIT] useTooltipPosition', () => {
    let originalInnerWidth: number;

    beforeEach(() => {
        originalInnerWidth = window.innerWidth;
        Object.defineProperty(window, 'innerWidth', { value: 600, configurable: true });
    });

    afterEach(() => {
        Object.defineProperty(window, 'innerWidth', {
            value: originalInnerWidth,
            configurable: true,
        });
    });

    it('Recalculates the clamped position when the tooltip content changes for the same instance', () => {
        const trigger = createTrigger({ left: 40, top: 300, right: 60, bottom: 320, width: 20 });
        const ref = createBubbleRef(40);

        const baseItem: TTooltipItem = {
            id: 'tip-1',
            text: 'Short',
            position: 'top',
            trigger,
            size: 'md',
            type: 'default',
        };

        const { result, rerender } = renderHook(({ item }) => useTooltipPosition(item, ref), {
            initialProps: { item: baseItem },
        });

        expect(result.current.style.left).toBe('50px');

        Object.defineProperty(ref.current, 'offsetWidth', { value: 200, configurable: true });

        rerender({ item: { ...baseItem, text: 'A much longer error message than before' } });

        expect(result.current.style.left).toBe('108px');
    });

    it('Does not recalculate when rerendered with the same item', () => {
        const trigger = createTrigger({ left: 40, top: 300, right: 60, bottom: 320, width: 20 });
        const ref = createBubbleRef(40);

        const item: TTooltipItem = {
            id: 'tip-1',
            text: 'Short',
            position: 'top',
            trigger,
            size: 'md',
            type: 'default',
        };

        const { result, rerender } = renderHook(({ item }) => useTooltipPosition(item, ref), {
            initialProps: { item },
        });

        const firstStyle = result.current.style;

        Object.defineProperty(ref.current, 'offsetWidth', { value: 200, configurable: true });
        rerender({ item });

        expect(result.current.style).toBe(firstStyle);
    });
});
