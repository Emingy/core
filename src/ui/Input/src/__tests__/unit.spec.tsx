import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';

import { Input } from '..';

describe('[UNIT] Input', () => {
    it('Render', () => {
        render(<Input data-testid="input" />);

        expect(screen.getByTestId('input')).toBeDefined();
    });

    it('Renders with title', () => {
        render(<Input title="Email" data-testid="input" />);

        expect(screen.getByText('Email')).toBeDefined();
    });

    it('Renders with placeholder', () => {
        render(<Input placeholder="Enter email" data-testid="input" />);
        const input = screen.getByTestId('input') as HTMLInputElement;

        expect(input.placeholder).toBe('Enter email');
    });

    it('Renders with prefix', () => {
        render(<Input prefix="$" data-testid="input" />);

        expect(screen.getByText('$')).toBeDefined();
    });

    it('Renders with postfix', () => {
        render(<Input postfix="USD" data-testid="input" />);

        expect(screen.getByText('USD')).toBeDefined();
    });

    it('Handles controlled value', () => {
        render(<Input value="test value" data-testid="input" />);
        const input = screen.getByTestId('input') as HTMLInputElement;

        expect(input.value).toBe('test value');
    });

    it('Handles onChange event', () => {
        let value = '';
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            value = e.target.value;
        };

        render(<Input onChange={handleChange} data-testid="input" />);
        const input = screen.getByTestId('input') as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'new value' } });

        expect(value).toBe('new value');
    });

    it('Applies disabled state', () => {
        render(<Input disabled data-testid="input" />);
        const input = screen.getByTestId('input') as HTMLInputElement;

        expect(input.disabled).toBe(true);
    });

    it('Applies error class when error prop is true', () => {
        const { container } = render(<Input error data-testid="input" />);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Input--error');
    });

    it('Applies has-value class when value is present', () => {
        const { container } = render(<Input value="test" data-testid="input" />);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Input--has-value');
    });

    it('Validates input using validate function', () => {
        const validate = (value: string) => value.length >= 3;
        const { container } = render(<Input validate={validate} value="ab" data-testid="input" />);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Input--error');
    });

    it('Does not show error when validate function returns true', () => {
        const validate = (value: string) => value.length >= 3;
        const { container } = render(<Input validate={validate} value="abc" data-testid="input" />);
        const label = container.querySelector('label');

        expect(label?.className).not.toContain('Input--error');
    });

    it('Handles mask with onChange providing unmaskedValue', () => {
        let maskedValue = '';
        let unmaskedValue = '';

        const handleChange = (
            e: React.ChangeEvent<HTMLInputElement> & { target: { unmaskedValue: string } }
        ) => {
            maskedValue = e.target.value;
            unmaskedValue = e.target.unmaskedValue;
        };

        render(<Input mask="+7 (d{3}) d{3}" onChange={handleChange} data-testid="input" />);
        const input = screen.getByTestId('input') as HTMLInputElement;

        fireEvent.change(input, { target: { value: '1234567' } });

        expect(maskedValue).toBe('+7 (123) 456');
        expect(unmaskedValue).toBe('123456');
    });

    it('Shows mask placeholder when mask is set and no title/placeholder', () => {
        render(<Input mask="d{3}-d{3}" />);
        const maskElement = screen.getByTestId('input-mask');

        expect(maskElement?.textContent).toBe('111-111');
    });

    it('Does not show mask placeholder when title is present and not focused', () => {
        render(<Input mask="d{3}-d{3}" title="Phone" />);
        const maskElement = screen.queryByTestId('input-mask');

        expect(maskElement).toBeNull();
    });

    it('Does not show mask placeholder when value is entered', () => {
        render(<Input mask="d{3}-d{3}" value="123" />);
        const maskElement = screen.queryByTestId('input-mask');

        expect(maskElement).toBeNull();
    });

    it('Shows mask placeholder when focused and title is present', () => {
        render(<Input mask="d{3}-d{3}" title="Phone" data-testid="input" />);
        const input = screen.getByTestId('input') as HTMLInputElement;

        fireEvent.focus(input);

        const maskElement = screen.getByTestId('input-mask');
        expect(maskElement?.textContent).toBe('111-111');

        fireEvent.blur(input);

        expect(screen.queryByTestId('input-mask')).toBeNull();
    });

    it('Passes rest props to input element', () => {
        const restProps = {
            id: 'test-input',
            'data-testid': 'input',
            'aria-label': 'test-label',
            type: 'email',
        };

        render(<Input {...restProps} />);
        const input = screen.getByTestId('input') as HTMLInputElement;

        expect(input.getAttribute('id')).toBe('test-input');
        expect(input.getAttribute('aria-label')).toBe('test-label');
        expect(input.type).toBe('email');
    });

    it('Applies custom className', () => {
        const { container } = render(<Input className="custom-class" data-testid="input" />);
        const label = container.querySelector('label');

        expect(label?.className).toContain('custom-class');
    });
});
