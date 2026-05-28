import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';

import { Checkbox } from '..';

describe('[UNIT] Checkbox', () => {
    it('Render', () => {
        const { container } = render(<Checkbox label="Test checkbox" />);

        expect(container.firstChild).toBeDefined();
    });

    it('Renders with label', () => {
        render(<Checkbox label="Accept terms" />);

        expect(screen.getByText('Accept terms')).toBeDefined();
    });

    it('Renders input with type checkbox', () => {
        render(<Checkbox label="Test" />);
        const input = screen.getByRole('checkbox');

        expect(input.getAttribute('type')).toBe('checkbox');
    });

    it('Renders with description', () => {
        render(<Checkbox label="Test" description="This is a description" />);

        expect(screen.getByText('This is a description')).toBeDefined();
    });

    it('Renders with error', () => {
        render(<Checkbox label="Test" error="This field is required" />);

        expect(screen.getByText('This field is required')).toBeDefined();
    });

    it('Error has priority over description', () => {
        render(<Checkbox label="Test" description="This is description" error="This is error" />);

        expect(screen.getByText('This is error')).toBeDefined();
        expect(screen.queryByText('This is description')).toBeNull();
    });

    it('Applies custom className', () => {
        const { container } = render(<Checkbox label="Test" className="custom-checkbox" />);
        const label = container.firstChild as HTMLElement;

        expect(label?.className).toContain('custom-checkbox');
    });

    it('Renders with disabled state', () => {
        render(<Checkbox label="Test" disabled />);
        const input = screen.getByRole('checkbox') as HTMLInputElement;

        expect(input.disabled).toBe(true);
    });

    it('Renders with checked state', () => {
        render(<Checkbox label="Test" checked readOnly />);
        const input = screen.getByRole('checkbox') as HTMLInputElement;

        expect(input.checked).toBe(true);
    });

    it('Renders with custom id', () => {
        render(<Checkbox label="Test" id="custom-id" />);
        const input = screen.getByRole('checkbox');

        expect(input.id).toBe('custom-id');
    });

    it('Generates unique id when not provided', () => {
        const { container: container1 } = render(<Checkbox label="Test 1" />);
        const { container: container2 } = render(<Checkbox label="Test 2" />);

        const input1 = container1.querySelector('input');
        const input2 = container2.querySelector('input');

        expect(input1?.id).toBeDefined();
        expect(input2?.id).toBeDefined();
        expect(input1?.id).not.toBe(input2?.id);
    });

    it('Label htmlFor matches input id', () => {
        const { container } = render(<Checkbox label="Test" id="test-id" />);
        const label = container.querySelector('label') as HTMLLabelElement;
        const input = screen.getByRole('checkbox');

        expect(label?.htmlFor).toBe('test-id');
        expect(input.id).toBe('test-id');
    });

    it('Handles onChange event', () => {
        let changed = false;
        const handleChange = () => {
            changed = true;
        };

        render(<Checkbox label="Test" onChange={handleChange} />);
        const input = screen.getByRole('checkbox');

        fireEvent.click(input);

        expect(changed).toBe(true);
    });

    it('Passes rest props to input', () => {
        render(<Checkbox label="Test" data-testid="checkbox-input" name="test-name" />);
        const input = screen.getByTestId('checkbox-input');

        expect(input.getAttribute('name')).toBe('test-name');
    });

    it('Renders label as span element', () => {
        const { container } = render(<Checkbox label="Test Label" />);
        const labelSpan = container.querySelector('span');

        expect(labelSpan?.textContent).toBe('Test Label');
    });

    it('Description has correct CSS class', () => {
        render(<Checkbox label="Test" description="Description text" />);
        const description = screen.getByText('Description text').closest('span');

        expect(description?.className).toContain('Checkbox__description');
    });

    it('Error has correct CSS class', () => {
        render(<Checkbox label="Test" error="Error text" />);
        const error = screen.getByText('Error text').closest('span');

        expect(error?.className).toContain('Checkbox__error');
    });

    it('Input has correct CSS class', () => {
        render(<Checkbox label="Test" />);
        const input = screen.getByRole('checkbox');

        expect(input.className).toContain('Checkbox__input');
    });
});
