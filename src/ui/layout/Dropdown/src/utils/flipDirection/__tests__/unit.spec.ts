import { afterEach, describe, expect, it } from '@rstest/core';

import { flipDirection } from '..';

const originalInnerWidth = window.innerWidth;
const originalInnerHeight = window.innerHeight;

const setViewport = (width: number, height: number) => {
    Object.defineProperty(window, 'innerWidth', { value: width, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: height, configurable: true });
};

describe('[UNIT] flipDirection', () => {
    afterEach(() => {
        setViewport(originalInnerWidth, originalInnerHeight);
    });

    it('Keeps the requested direction when it fits', () => {
        setViewport(1024, 768);
        const rect = { top: 300, left: 300, right: 400, bottom: 320, width: 100, height: 20 };

        expect(flipDirection('bottom', rect, 200, 200)).toBe('bottom');
    });

    it('Flips to the opposite direction on the same axis when it fits', () => {
        setViewport(1024, 768);
        const rect = { top: 10, left: 300, right: 400, bottom: 30, width: 100, height: 20 };

        expect(flipDirection('top', rect, 200, 200)).toBe('bottom');
    });

    it('Falls back to bottom when only bottom has room and the requested direction is right', () => {
        setViewport(400, 800);
        const rect = { top: 300, left: 350, right: 390, bottom: 320, width: 40, height: 20 };

        expect(flipDirection('right', rect, 350, 200)).toBe('bottom');
    });

    it('Falls back to right when only right has room and the requested direction is top', () => {
        setViewport(800, 250);
        const rect = { top: 20, left: 20, right: 60, bottom: 40, width: 40, height: 20 };

        expect(flipDirection('top', rect, 200, 300)).toBe('right');
    });

    it('Returns the requested direction when nothing fits', () => {
        setViewport(100, 100);
        const rect = { top: 40, left: 40, right: 60, bottom: 60, width: 20, height: 20 };

        expect(flipDirection('right', rect, 200, 200)).toBe('right');
    });

    describe('with a container rect', () => {
        it('Flips based on the container edge even when the trigger edge alone would fit', () => {
            setViewport(400, 800);
            const rect = { top: 100, left: 90, right: 100, bottom: 120, width: 10, height: 20 };
            const containerRect = {
                top: 50,
                left: 50,
                right: 250,
                bottom: 300,
                width: 200,
                height: 250,
            };

            expect(flipDirection('right', rect, 200, 100)).toBe('right');
            expect(flipDirection('right', rect, 200, 100, containerRect)).toBe('bottom');
        });

        it('Keeps the direction based on the container edge even when the trigger edge alone would overflow', () => {
            setViewport(400, 800);
            const rect = { top: 100, left: 390, right: 398, bottom: 120, width: 8, height: 20 };
            const containerRect = {
                top: 50,
                left: 50,
                right: 150,
                bottom: 300,
                width: 100,
                height: 250,
            };

            expect(flipDirection('right', rect, 200, 100)).toBe('left');
            expect(flipDirection('right', rect, 200, 100, containerRect)).toBe('right');
        });
    });
});
