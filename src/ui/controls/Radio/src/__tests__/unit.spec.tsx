import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';

import { Radio } from '..';

describe('[UNIT] Radio', () => {
    it('Render', () => {
        const { container } = render(<Radio label="Test radio" />);

        expect(container.firstChild).toBeDefined();
    });

    it('Renders with label', () => {
        render(<Radio label="Option A" />);

        expect(screen.getByText('Option A')).toBeDefined();
    });

    it('Renders input with type radio', () => {
        render(<Radio label="Test" />);
        const input = screen.getByRole('radio');

        expect(input.getAttribute('type')).toBe('radio');
    });

    it('Renders with description', () => {
        render(<Radio label="Test" description="This is a description" />);

        expect(screen.getByText('This is a description')).toBeDefined();
    });

    it('Renders with error', () => {
        render(<Radio label="Test" error="This field is required" />);

        expect(screen.getByText('This field is required')).toBeDefined();
    });

    it('Error has priority over description', () => {
        render(<Radio label="Test" description="This is description" error="This is error" />);

        expect(screen.getByText('This is error')).toBeDefined();
        expect(screen.queryByText('This is description')).toBeNull();
    });

    it('Applies custom className', () => {
        const { container } = render(<Radio label="Test" className="custom-radio" />);
        const label = container.firstChild as HTMLElement;

        expect(label?.className).toContain('custom-radio');
    });

    it('Renders with disabled state', () => {
        render(<Radio label="Test" disabled />);
        const input = screen.getByRole('radio') as HTMLInputElement;

        expect(input.disabled).toBe(true);
    });

    it('Renders with checked state', () => {
        render(<Radio label="Test" checked readOnly />);
        const input = screen.getByRole('radio') as HTMLInputElement;

        expect(input.checked).toBe(true);
    });

    it('Renders with custom id', () => {
        render(<Radio label="Test" id="custom-id" />);
        const input = screen.getByRole('radio');

        expect(input.id).toBe('custom-id');
    });

    it('Generates unique id when not provided', () => {
        const { container: container1 } = render(<Radio label="Test 1" />);
        const { container: container2 } = render(<Radio label="Test 2" />);

        const input1 = container1.querySelector('input');
        const input2 = container2.querySelector('input');

        expect(input1?.id).toBeDefined();
        expect(input2?.id).toBeDefined();
        expect(input1?.id).not.toBe(input2?.id);
    });

    it('Label htmlFor matches input id', () => {
        const { container } = render(<Radio label="Test" id="test-id" />);
        const label = container.querySelector('label') as HTMLLabelElement;
        const input = screen.getByRole('radio');

        expect(label?.htmlFor).toBe('test-id');
        expect(input.id).toBe('test-id');
    });

    it('Handles onChange event', () => {
        let changed = false;
        const handleChange = () => {
            changed = true;
        };

        render(<Radio label="Test" onChange={handleChange} />);
        const input = screen.getByRole('radio');

        fireEvent.click(input);

        expect(changed).toBe(true);
    });

    it('Passes rest props to input', () => {
        render(<Radio label="Test" data-testid="radio-input" name="test-name" />);
        const input = screen.getByTestId('radio-input');

        expect(input.getAttribute('name')).toBe('test-name');
    });

    it('Renders label as span element', () => {
        const { container } = render(<Radio label="Test Label" />);
        const labelSpan = container.querySelector('span');

        expect(labelSpan?.textContent).toBe('Test Label');
    });

    it('Description has correct CSS class', () => {
        render(<Radio label="Test" description="Description text" />);
        const description = screen.getByText('Description text').closest('span');

        expect(description?.className).toContain('Radio__description');
    });

    it('Error has correct CSS class', () => {
        render(<Radio label="Test" error="Error text" />);
        const error = screen.getByText('Error text').closest('span');

        expect(error?.className).toContain('Radio__error');
    });

    it('Input has correct CSS class', () => {
        render(<Radio label="Test" />);
        const input = screen.getByRole('radio');

        expect(input.className).toContain('Radio__input');
    });

    it('Renders with value attribute', () => {
        render(<Radio label="Test" value="option1" />);
        const input = screen.getByRole('radio') as HTMLInputElement;

        expect(input.value).toBe('option1');
    });

    it('Works in radio group with same name', () => {
        render(
            <>
                <Radio label="Option 1" name="group1" value="1" />
                <Radio label="Option 2" name="group1" value="2" />
                <Radio label="Option 3" name="group1" value="3" />
            </>
        );

        const radios = screen.getAllByRole('radio') as HTMLInputElement[];

        expect(radios.length).toBe(3);
        expect(radios[0].name).toBe('group1');
        expect(radios[1].name).toBe('group1');
        expect(radios[2].name).toBe('group1');
    });
});
