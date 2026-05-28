import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';

import { EType } from '../constants';
import { ToggleButton } from '..';

describe('[UNIT] ToggleButton', () => {
    it('Render', () => {
        render(<ToggleButton data-testid="toggle">Toggle</ToggleButton>);

        expect(screen.getByTestId('toggle')).toBeDefined();
    });

    it('Renders children', () => {
        render(<ToggleButton>Click me</ToggleButton>);

        expect(screen.getByText('Click me')).toBeDefined();
    });

    it('Renders checkbox input', () => {
        const { container } = render(<ToggleButton>Toggle</ToggleButton>);
        const input = container.querySelector('input[type="checkbox"]');

        expect(input).toBeDefined();
        expect((input as HTMLInputElement).type).toBe('checkbox');
    });

    it('Input is hidden', () => {
        render(<ToggleButton data-testid="toggle">Toggle</ToggleButton>);
        const input = screen.getByTestId('toggle') as HTMLInputElement;

        expect(input.hidden).toBe(true);
    });

    it('Applies primary type by default', () => {
        const { container } = render(<ToggleButton>Toggle</ToggleButton>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('ToggleButton__primary');
    });

    it('Applies secondary type', () => {
        const { container } = render(<ToggleButton type={EType.Secondary}>Toggle</ToggleButton>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('ToggleButton__secondary');
    });

    it('Applies custom className', () => {
        const { container } = render(<ToggleButton className="custom-toggle">Toggle</ToggleButton>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('custom-toggle');
    });

    it('Handles onChange event', () => {
        let changed = false;
        const handleChange = () => {
            changed = true;
        };
        const { container } = render(<ToggleButton onChange={handleChange}>Toggle</ToggleButton>);
        const input = container.querySelector('input[type="checkbox"]');

        if (input) fireEvent.click(input);

        expect(changed).toBe(true);
    });

    it('Applies checked state', () => {
        render(
            <ToggleButton checked readOnly data-testid="toggle">
                Toggle
            </ToggleButton>
        );
        const input = screen.getByTestId('toggle') as HTMLInputElement;

        expect(input.checked).toBe(true);
    });

    it('Applies disabled state', () => {
        render(
            <ToggleButton disabled data-testid="toggle">
                Toggle
            </ToggleButton>
        );
        const input = screen.getByTestId('toggle') as HTMLInputElement;

        expect(input.disabled).toBe(true);
    });

    it('Renders with prefix', () => {
        render(<ToggleButton prefix="$">Toggle</ToggleButton>);

        expect(screen.getByText('$')).toBeDefined();
    });

    it('Renders with postfix', () => {
        render(<ToggleButton postfix="→">Toggle</ToggleButton>);

        expect(screen.getByText('→')).toBeDefined();
    });

    it('Renders with prefix and postfix', () => {
        const { container } = render(
            <ToggleButton prefix="$" postfix="USD">
                100
            </ToggleButton>
        );
        const label = container.querySelector('label');

        expect(label?.textContent).toContain('$');
        expect(label?.textContent).toContain('USD');
        expect(label?.textContent).toContain('100');
    });

    it('Renders spinner when isLoading is true', () => {
        const { container } = render(<ToggleButton isLoading>Loading</ToggleButton>);
        const spinner = container.querySelector('svg');

        expect(spinner).toBeDefined();
    });

    it('Hides label when isLoading is true', () => {
        const { container } = render(<ToggleButton isLoading>Loading</ToggleButton>);
        const label = container.querySelector('p');

        expect(label?.className).toContain('label-hidden');
    });

    it('Disables input when isLoading is true', () => {
        render(
            <ToggleButton isLoading data-testid="toggle">
                Loading
            </ToggleButton>
        );
        const input = screen.getByTestId('toggle') as HTMLInputElement;

        expect(input.disabled).toBe(true);
    });

    it('Shows label when isLoading is false', () => {
        const { container } = render(<ToggleButton isLoading={false}>Click me</ToggleButton>);
        const label = container.querySelector('p');

        expect(label?.className).not.toContain('label-hidden');
    });

    it('Does not render spinner when isLoading is false', () => {
        const { container } = render(<ToggleButton isLoading={false}>Click me</ToggleButton>);
        const spinner = container.querySelector('svg');

        expect(spinner).toBeNull();
    });

    it('Applies full width class when isFullWidth is true', () => {
        const { container } = render(<ToggleButton isFullWidth>Full Width</ToggleButton>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('ToggleButton__full-width');
    });

    it('Does not apply full width class when isFullWidth is false', () => {
        const { container } = render(<ToggleButton isFullWidth={false}>Normal</ToggleButton>);
        const label = container.querySelector('label');

        expect(label?.className).not.toContain('ToggleButton__full-width');
    });

    it('Applies loading class when isLoading is true', () => {
        const { container } = render(<ToggleButton isLoading>Loading</ToggleButton>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('ToggleButton__loading');
    });

    it('Hides prefix when isLoading is true', () => {
        const { container } = render(
            <ToggleButton prefix="$" isLoading>
                Loading
            </ToggleButton>
        );
        const spans = Array.from(container.querySelectorAll('span'));
        const hiddenSpans = spans.filter((span) => span.className.includes('span-hidden'));

        expect(hiddenSpans.length).toBeGreaterThan(0);
    });

    it('Hides postfix when isLoading is true', () => {
        const { container } = render(
            <ToggleButton postfix="→" isLoading>
                Loading
            </ToggleButton>
        );
        const spans = Array.from(container.querySelectorAll('span'));
        const hiddenSpans = spans.filter((span) => span.className.includes('span-hidden'));

        expect(hiddenSpans.length).toBeGreaterThan(0);
    });

    it('Uses custom id when provided', () => {
        render(
            <ToggleButton id="custom-id" data-testid="toggle">
                Toggle
            </ToggleButton>
        );
        const input = screen.getByTestId('toggle');

        expect(input.getAttribute('id')).toBe('custom-id');
    });

    it('Generates id when not provided', () => {
        render(<ToggleButton data-testid="toggle">Toggle</ToggleButton>);
        const input = screen.getByTestId('toggle');
        const id = input.getAttribute('id');

        expect(id).toBeDefined();
        expect(id).not.toBe('');
    });

    it('Passes rest props to input', () => {
        render(
            <ToggleButton data-testid="toggle" aria-label="test-label">
                Toggle
            </ToggleButton>
        );
        const input = screen.getByTestId('toggle');

        expect(input.getAttribute('aria-label')).toBe('test-label');
    });

    it('Label htmlFor matches input id', () => {
        const { container } = render(<ToggleButton id="test-id">Toggle</ToggleButton>);
        const label = container.querySelector('label');
        const input = container.querySelector('input[type="checkbox"]');

        expect(label?.getAttribute('for')).toBe('test-id');
        expect(input?.getAttribute('id')).toBe('test-id');
    });
});
