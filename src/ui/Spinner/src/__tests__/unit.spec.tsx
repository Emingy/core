import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { Spinner } from '..';

describe('[UNIT] Spinner', () => {
    it('Render', () => {
        const { container } = render(<Spinner />);

        expect(container.firstChild).toBeDefined();
    });

    it('Renders SVG element', () => {
        const { container } = render(<Spinner />);
        const svg = container.querySelector('svg');

        expect(svg).toBeDefined();
    });

    it('Renders circle element', () => {
        const { container } = render(<Spinner />);
        const circle = container.querySelector('circle');

        expect(circle).toBeDefined();
    });

    it('Applies custom className', () => {
        const { container } = render(<Spinner className="custom-spinner" />);
        const svg = container.querySelector('svg');
        const classAttr = svg?.getAttribute('class') || '';

        expect(classAttr.includes('custom-spinner')).toBe(true);
    });

    it('SVG has correct viewBox', () => {
        const { container } = render(<Spinner />);
        const svg = container.querySelector('svg');

        expect(svg?.getAttribute('viewBox')).toBe('0 0 50 50');
    });

    it('Circle has correct attributes', () => {
        const { container } = render(<Spinner />);
        const circle = container.querySelector('circle');

        expect(circle?.getAttribute('cx')).toBe('25');
        expect(circle?.getAttribute('cy')).toBe('25');
        expect(circle?.getAttribute('r')).toBe('20');
        expect(circle?.getAttribute('fill')).toBe('none');
    });

    it('Circle has correct CSS class', () => {
        const { container } = render(<Spinner />);
        const circle = container.querySelector('circle');
        const classAttr = circle?.getAttribute('class') || '';

        expect(classAttr.includes('Spinner__circle')).toBe(true);
    });

    it('SVG has correct CSS class', () => {
        const { container } = render(<Spinner />);
        const svg = container.querySelector('svg');
        const classAttr = svg?.getAttribute('class') || '';

        expect(classAttr.includes('Spinner')).toBe(true);
    });
});
