import {
    TOOLTIP_OFFSET,
    VIEWPORT_EDGE_PADDING,
} from '@emingy/core/providers/TooltipProvider/src/constants';
import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import { calcStyle } from '..';

const rect = { left: 500, top: 200, right: 550, bottom: 220, width: 50, height: 20 };

describe('[UNIT] calcStyle', () => {
    let originalInnerWidth: number;

    beforeEach(() => {
        originalInnerWidth = window.innerWidth;
    });

    afterEach(() => {
        Object.defineProperty(window, 'innerWidth', {
            value: originalInnerWidth,
            configurable: true,
        });
    });

    it('Centers the tooltip on the trigger for position top', () => {
        const style = calcStyle(rect, 'top');
        const cx = rect.left + rect.width / 2;

        expect(style.left).toBe(`${cx}px`);
        expect(style.top).toBe(`${rect.top - TOOLTIP_OFFSET}px`);
    });

    it('Centers the tooltip on the trigger for position bottom', () => {
        const style = calcStyle(rect, 'bottom');
        const cx = rect.left + rect.width / 2;

        expect(style.left).toBe(`${cx}px`);
        expect(style.top).toBe(`${rect.bottom + TOOLTIP_OFFSET}px`);
    });

    it('Does not clamp when the tooltip fits within the viewport', () => {
        const style = calcStyle(rect, 'top', 40);
        const cx = rect.left + rect.width / 2;

        expect(style.left).toBe(`${cx}px`);
    });

    it('Clamps left when the centered tooltip would overflow the left edge', () => {
        const leftRect = { ...rect, left: 10, right: 60, width: 50 };
        const tooltipWidth = 300;

        const style = calcStyle(leftRect, 'top', tooltipWidth);

        expect(style.left).toBe(`${tooltipWidth / 2 + VIEWPORT_EDGE_PADDING}px`);
    });

    it('Clamps left when the centered tooltip would overflow the right edge', () => {
        Object.defineProperty(window, 'innerWidth', { value: 600, configurable: true });

        const rightRect = { ...rect, left: 580, right: 630, width: 50 };
        const tooltipWidth = 300;

        const style = calcStyle(rightRect, 'top', tooltipWidth);

        expect(style.left).toBe(`${600 - tooltipWidth / 2 - VIEWPORT_EDGE_PADDING}px`);
    });

    it('Ignores tooltipWidth for position left', () => {
        const style = calcStyle(rect, 'left', 300);

        expect(style.left).toBe(`${rect.left - TOOLTIP_OFFSET}px`);
    });

    it('Ignores tooltipWidth for position right', () => {
        const style = calcStyle(rect, 'right', 300);

        expect(style.left).toBe(`${rect.right + TOOLTIP_OFFSET}px`);
    });
});
