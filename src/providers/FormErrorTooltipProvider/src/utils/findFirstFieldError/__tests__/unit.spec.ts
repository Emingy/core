import { describe, expect, it } from '@rstest/core';

import { findFirstFieldError } from '..';

const createElement = (): HTMLElement => document.createElement('input');

const appendInOrder = (...elements: HTMLElement[]) => {
    elements.forEach((element) => document.body.appendChild(element));
};

describe('[UNIT] findFirstFieldError', () => {
    it('Returns undefined for an empty map', () => {
        expect(findFirstFieldError(new Map())).toBeUndefined();
    });

    it('Returns the only entry for a single-item map', () => {
        const element = createElement();
        appendInOrder(element);
        const fields = new Map([['a', { message: 'Error A', element }]]);

        const result = findFirstFieldError(fields);

        expect(result?.[0]).toBe('a');
    });

    it('Returns the entry whose element is first in DOM order', () => {
        const first = createElement();
        const second = createElement();
        appendInOrder(first, second);

        const fields = new Map([
            ['second', { message: 'Error B', element: second }],
            ['first', { message: 'Error A', element: first }],
        ]);

        const result = findFirstFieldError(fields);

        expect(result?.[0]).toBe('first');
    });

    it('Is unaffected by Map insertion order, only DOM order matters', () => {
        const first = createElement();
        const second = createElement();
        const third = createElement();
        appendInOrder(first, second, third);

        const fields = new Map([
            ['third', { message: 'Error C', element: third }],
            ['first', { message: 'Error A', element: first }],
            ['second', { message: 'Error B', element: second }],
        ]);

        const result = findFirstFieldError(fields);

        expect(result?.[0]).toBe('first');
    });
});
