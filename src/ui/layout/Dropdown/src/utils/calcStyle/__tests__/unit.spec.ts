import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';

import { calcStyle } from '..';

const RECT = { top: 10, left: 20, right: 120, bottom: 30, width: 100, height: 20 };

describe('[UNIT] calcStyle', () => {
    it('Positions below the trigger for bottom direction', () => {
        expect(calcStyle(RECT, 'bottom')).toEqual({ top: '38px', left: '20px', width: '100px' });
    });

    it('Positions above the trigger for top direction', () => {
        expect(calcStyle(RECT, 'top')).toEqual({
            top: '2px',
            left: '20px',
            width: '100px',
            transform: 'translateY(-100%)',
        });
    });

    it('Positions left of the trigger for left direction', () => {
        expect(calcStyle(RECT, 'left')).toEqual({
            top: '10px',
            left: '12px',
            width: '100px',
            transform: 'translateX(-100%)',
        });
    });

    it('Positions right of the trigger for right direction', () => {
        expect(calcStyle(RECT, 'right')).toEqual({ top: '10px', left: '128px', width: '100px' });
    });

    describe('with a container rect', () => {
        const CONTAINER_RECT = {
            top: 0,
            left: 0,
            right: 200,
            bottom: 300,
            width: 200,
            height: 300,
        };

        it('Uses the container edge instead of the trigger edge on the direction axis', () => {
            expect(calcStyle(RECT, 'right', CONTAINER_RECT)).toEqual({
                top: '10px',
                left: '208px',
                width: '100px',
            });
        });

        it('Still aligns the cross axis to the trigger, not the container', () => {
            expect(calcStyle(RECT, 'left', CONTAINER_RECT)).toEqual({
                top: '10px',
                left: '-8px',
                width: '100px',
                transform: 'translateX(-100%)',
            });
        });

        it('Uses the container edge for bottom direction', () => {
            expect(calcStyle(RECT, 'bottom', CONTAINER_RECT)).toEqual({
                top: '308px',
                left: '20px',
                width: '100px',
            });
        });

        it('Uses the container edge for top direction', () => {
            expect(calcStyle(RECT, 'top', CONTAINER_RECT)).toEqual({
                top: '-8px',
                left: '20px',
                width: '100px',
                transform: 'translateY(-100%)',
            });
        });
    });

    describe('with page scroll', () => {
        const originalScrollX = window.scrollX;
        const originalScrollY = window.scrollY;

        beforeEach(() => {
            Object.defineProperty(window, 'scrollX', { value: 50, configurable: true });
            Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
        });

        afterEach(() => {
            Object.defineProperty(window, 'scrollX', {
                value: originalScrollX,
                configurable: true,
            });
            Object.defineProperty(window, 'scrollY', {
                value: originalScrollY,
                configurable: true,
            });
        });

        it('Adds the scroll offset to the computed position', () => {
            expect(calcStyle(RECT, 'bottom')).toEqual({
                top: '138px',
                left: '70px',
                width: '100px',
            });
        });
    });
});
