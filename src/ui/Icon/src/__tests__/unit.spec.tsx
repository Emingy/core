import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { EColor, ESize } from '../constants';
import { Icon } from '..';

const MockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="mock-icon" {...props}>
        <path d="M0 0h24v24H0z" />
    </svg>
);

describe('[UNIT] Icon', () => {
    it('Renders SVG element', () => {
        const { container } = render(<Icon icon={MockIcon} />);
        const svg = container.querySelector('svg');

        expect(svg).toBeDefined();
    });

    it('Passes props to SVG element', () => {
        const { container } = render(<Icon icon={MockIcon} aria-label="test icon" />);
        const svg = container.querySelector('svg');

        expect(svg?.getAttribute('aria-label')).toBe('test icon');
    });

    it('Applies default size md', () => {
        const { container } = render(<Icon icon={MockIcon} />);
        const svg = container.querySelector('svg');

        expect(svg?.getAttribute('class')).toContain('Icon__md');
    });

    it('Applies default color inherit', () => {
        const { container } = render(<Icon icon={MockIcon} />);
        const svg = container.querySelector('svg');

        expect(svg?.getAttribute('class')).toContain('Icon__inherit');
    });

    it('Applies custom size', () => {
        const { container } = render(<Icon icon={MockIcon} size={ESize.Xl} />);
        const svg = container.querySelector('svg');

        expect(svg?.getAttribute('class')).toContain('Icon__xl');
    });

    it('Applies custom color', () => {
        const { container } = render(<Icon icon={MockIcon} color={EColor.Primary} />);
        const svg = container.querySelector('svg');

        expect(svg?.getAttribute('class')).toContain('Icon__primary');
    });

    it('Applies custom className', () => {
        const { container } = render(<Icon icon={MockIcon} className="custom-class" />);
        const svg = container.querySelector('svg');

        expect(svg?.getAttribute('class')).toContain('custom-class');
    });

    it('Applies base Icon class', () => {
        const { container } = render(<Icon icon={MockIcon} />);
        const svg = container.querySelector('svg');

        expect(svg?.getAttribute('class')).toContain('Icon');
    });

    it('Combines size and color classes', () => {
        const { container } = render(<Icon icon={MockIcon} size={ESize.Lg} color={EColor.Alert} />);
        const svg = container.querySelector('svg');

        expect(svg?.getAttribute('class')).toContain('Icon__lg');
        expect(svg?.getAttribute('class')).toContain('Icon__alert');
    });

    it('Applies all size variants', () => {
        for (const size of Object.values(ESize)) {
            const { container } = render(<Icon icon={MockIcon} size={size} />);
            const svg = container.querySelector('svg');

            expect(svg?.getAttribute('class')).toContain(`Icon__${size}`);
        }
    });

    it('Applies all color variants', () => {
        for (const color of Object.values(EColor)) {
            const { container } = render(<Icon icon={MockIcon} color={color} />);
            const svg = container.querySelector('svg');

            expect(svg?.getAttribute('class')).toContain(`Icon__${color}`);
        }
    });
});
