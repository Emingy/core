import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render, screen } from '@testing-library/react';

import { EType } from '../constants';
import { Divider } from '..';

describe('[UNIT] Divider', () => {
    it('Render', () => {
        const { container } = render(<Divider />);

        expect(container.firstChild).toBeDefined();
    });

    it('Applies horizontal type by default', () => {
        const { container } = render(<Divider />);
        const divider = container.firstChild as HTMLElement;

        expect(divider?.className).toContain('Divider__horizontal');
    });

    it('Applies horizontal type', () => {
        const { container } = render(<Divider type={EType.Horizontal} />);
        const divider = container.firstChild as HTMLElement;

        expect(divider?.className).toContain('Divider__horizontal');
    });

    it('Applies vertical type', () => {
        const { container } = render(<Divider type={EType.Vertical} />);
        const divider = container.firstChild as HTMLElement;

        expect(divider?.className).toContain('Divider__vertical');
    });

    it('Renders without label', () => {
        const { container } = render(<Divider />);
        const label = container.querySelector('label');

        expect(label).toBeNull();
    });

    it('Renders with label', () => {
        render(<Divider label="OR" />);

        expect(screen.getByText('OR')).toBeDefined();
    });

    it('Renders label inside label element', () => {
        const { container } = render(<Divider label="Section" />);
        const label = container.querySelector('p');

        expect(label?.textContent).toBe('Section');
    });

    it('Applies custom className', () => {
        const { container } = render(<Divider className="custom-divider" />);
        const divider = container.firstChild as HTMLElement;

        expect(divider?.className).toContain('custom-divider');
    });

    it('Renders two span elements', () => {
        const { container } = render(<Divider />);
        const spans = container.querySelectorAll('span');

        expect(spans.length).toBe(2);
    });

    it('Renders two span elements with label', () => {
        const { container } = render(<Divider label="Text" />);
        const spans = container.querySelectorAll('span');

        expect(spans.length).toBe(2);
    });

    it('Combines type and custom className', () => {
        const { container } = render(<Divider type={EType.Vertical} className="my-class" />);
        const divider = container.firstChild as HTMLElement;

        expect(divider?.className).toContain('Divider__vertical');
        expect(divider?.className).toContain('my-class');
    });
});
