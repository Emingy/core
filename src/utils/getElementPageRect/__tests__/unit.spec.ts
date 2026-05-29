import { describe, expect, it } from '@rstest/core';

import { getElementPageRect } from '..';

describe('[UNIT] getElementPageRect', () => {
    it('Returns correct left and top from getBoundingClientRect', () => {
        const el = document.createElement('div');

        el.getBoundingClientRect = () =>
            ({
                left: 100,
                top: 50,
                right: 300,
                bottom: 150,
                width: 200,
                height: 100,
                x: 100,
                y: 50,
                toJSON: () => {},
            }) as DOMRect;

        const rect = getElementPageRect(el);

        expect(rect.left).toBe(100);
        expect(rect.top).toBe(50);
    });

    it('Returns correct width and height', () => {
        const el = document.createElement('div');

        el.getBoundingClientRect = () =>
            ({
                left: 0,
                top: 0,
                right: 120,
                bottom: 80,
                width: 120,
                height: 80,
                x: 0,
                y: 0,
                toJSON: () => {},
            }) as DOMRect;

        const rect = getElementPageRect(el);

        expect(rect.width).toBe(120);
        expect(rect.height).toBe(80);
    });

    it('Computes right as left + width', () => {
        const el = document.createElement('div');

        el.getBoundingClientRect = () =>
            ({
                left: 40,
                top: 0,
                right: 140,
                bottom: 60,
                width: 100,
                height: 60,
                x: 40,
                y: 0,
                toJSON: () => {},
            }) as DOMRect;

        const rect = getElementPageRect(el);

        expect(rect.right).toBe(rect.left + rect.width);
    });

    it('Computes bottom as top + height', () => {
        const el = document.createElement('div');

        el.getBoundingClientRect = () =>
            ({
                left: 0,
                top: 20,
                right: 50,
                bottom: 70,
                width: 50,
                height: 50,
                x: 0,
                y: 20,
                toJSON: () => {},
            }) as DOMRect;

        const rect = getElementPageRect(el);

        expect(rect.bottom).toBe(rect.top + rect.height);
    });

    it('Returns all zeros for element without explicit dimensions', () => {
        const el = document.createElement('div');

        const rect = getElementPageRect(el);

        expect(rect.left).toBe(0);
        expect(rect.top).toBe(0);
        expect(rect.width).toBe(0);
        expect(rect.height).toBe(0);
    });

    it('Returns zero-size rect for element with only position', () => {
        const el = document.createElement('div');

        el.getBoundingClientRect = () =>
            ({
                left: 200,
                top: 300,
                right: 200,
                bottom: 300,
                width: 0,
                height: 0,
                x: 200,
                y: 300,
                toJSON: () => {},
            }) as DOMRect;

        const rect = getElementPageRect(el);

        expect(rect.left).toBe(200);
        expect(rect.top).toBe(300);
        expect(rect.width).toBe(0);
        expect(rect.height).toBe(0);
        expect(rect.right).toBe(200);
        expect(rect.bottom).toBe(300);
    });

    it('Returns correct rect for element at negative offset', () => {
        const el = document.createElement('div');

        el.getBoundingClientRect = () =>
            ({
                left: -50,
                top: -20,
                right: 50,
                bottom: 80,
                width: 100,
                height: 100,
                x: -50,
                y: -20,
                toJSON: () => {},
            }) as DOMRect;

        const rect = getElementPageRect(el);

        expect(rect.left).toBe(-50);
        expect(rect.top).toBe(-20);
        expect(rect.right).toBe(-50 + 100);
        expect(rect.bottom).toBe(-20 + 100);
    });
});
