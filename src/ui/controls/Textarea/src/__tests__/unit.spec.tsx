import React from 'react';

import { FormErrorTooltipContext } from '@emingy/core/providers/FormErrorTooltipProvider';
import type { TFieldError } from '@emingy/core/providers/FormErrorTooltipProvider/src/types';
import { describe, expect, it, rstest } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';

import { Textarea } from '..';

describe('[UNIT] Textarea', () => {
    it('Render', () => {
        render(<Textarea data-testid="textarea" />);

        expect(screen.getByTestId('textarea')).toBeDefined();
    });

    it('Renders a textarea element', () => {
        render(<Textarea data-testid="textarea" />);
        const textarea = screen.getByTestId('textarea');

        expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('Renders with title', () => {
        render(<Textarea title="Description" data-testid="textarea" />);

        expect(screen.getByText('Description')).toBeDefined();
    });

    it('Renders with placeholder', () => {
        render(<Textarea placeholder="Tell us more" data-testid="textarea" />);
        const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

        expect(textarea.placeholder).toBe('Tell us more');
    });

    it('Renders with prefix', () => {
        render(<Textarea prefix="$" data-testid="textarea" />);

        expect(screen.getByText('$')).toBeDefined();
    });

    it('Renders with postfix', () => {
        render(<Textarea postfix="USD" data-testid="textarea" />);

        expect(screen.getByText('USD')).toBeDefined();
    });

    it('Handles controlled value', () => {
        render(<Textarea value="test value" data-testid="textarea" />);
        const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

        expect(textarea.value).toBe('test value');
    });

    it('Handles onChange event', () => {
        let value = '';
        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            value = e.target.value;
        };

        render(<Textarea onChange={handleChange} data-testid="textarea" />);
        const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

        fireEvent.change(textarea, { target: { value: 'new value' } });

        expect(value).toBe('new value');
    });

    it('Handles multiline value', () => {
        render(<Textarea value={'line 1\nline 2'} data-testid="textarea" />);
        const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

        expect(textarea.value).toBe('line 1\nline 2');
    });

    it('Applies disabled state', () => {
        render(<Textarea disabled data-testid="textarea" />);
        const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

        expect(textarea.disabled).toBe(true);
    });

    it('Applies error class when error prop is set', () => {
        const { container } = render(
            <Textarea error="This field is required" data-testid="textarea" />
        );
        const label = container.querySelector('label');

        expect(label?.className).toContain('Textarea__error');
    });

    it('Applies has-value class when value is present', () => {
        const { container } = render(<Textarea value="test" data-testid="textarea" />);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Textarea__has-value');
    });

    it('Validates input using validate function', () => {
        const validate = (value: string) => value.length >= 3;
        const { container } = render(
            <Textarea validate={validate} value="ab" data-testid="textarea" />
        );
        const label = container.querySelector('label');

        expect(label?.className).toContain('Textarea__error');
    });

    it('Does not show error when validate function returns true', () => {
        const validate = (value: string) => value.length >= 3;
        const { container } = render(
            <Textarea validate={validate} value="abc" data-testid="textarea" />
        );
        const label = container.querySelector('label');

        expect(label?.className).not.toContain('Textarea__error');
    });

    it('Defaults resize to none', () => {
        const { container } = render(<Textarea data-testid="textarea" />);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Textarea__resize-none');
    });

    it('Applies resize modifier class from prop', () => {
        const { container } = render(<Textarea resize="vertical" data-testid="textarea" />);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Textarea__resize-vertical');
    });

    it('Passes rest props to textarea element', () => {
        const restProps = {
            id: 'test-textarea',
            'data-testid': 'textarea',
            'aria-label': 'test-label',
            rows: 5,
        };

        render(<Textarea {...restProps} />);
        const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

        expect(textarea.getAttribute('id')).toBe('test-textarea');
        expect(textarea.getAttribute('aria-label')).toBe('test-label');
        expect(textarea.rows).toBe(5);
    });

    it('Applies custom className', () => {
        const { container } = render(<Textarea className="custom-class" data-testid="textarea" />);
        const label = container.querySelector('label');

        expect(label?.className).toContain('custom-class');
    });

    it('Forwards ref to the textarea element', () => {
        const ref = React.createRef<HTMLTextAreaElement>();

        render(<Textarea ref={ref} data-testid="textarea" />);

        expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
        expect(ref.current).toBe(screen.getByTestId('textarea'));
    });

    it('Calls onFocus and onBlur handlers passed as props', () => {
        const handleFocus = rstest.fn();
        const handleBlur = rstest.fn();

        render(<Textarea onFocus={handleFocus} onBlur={handleBlur} data-testid="textarea" />);
        const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

        fireEvent.focus(textarea);
        expect(handleFocus).toHaveBeenCalledTimes(1);

        fireEvent.blur(textarea);
        expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('Defaults size bounds to minWidth 100%, maxWidth 100%, minHeight 100px, maxHeight 400px', () => {
        const { container } = render(<Textarea data-testid="textarea" />);
        const label = container.querySelector('label') as HTMLLabelElement;

        expect(label.style.minWidth).toBe('100%');
        expect(label.style.maxWidth).toBe('100%');
        expect(label.style.minHeight).toBe('100px');
        expect(label.style.maxHeight).toBe('400px');
    });

    it('Applies numeric size props as pixel values', () => {
        const { container } = render(
            <Textarea minWidth={200} minHeight={150} maxHeight={500} data-testid="textarea" />
        );
        const label = container.querySelector('label') as HTMLLabelElement;

        expect(label.style.minWidth).toBe('200px');
        expect(label.style.minHeight).toBe('150px');
        expect(label.style.maxHeight).toBe('500px');
    });

    it('Applies string size props as-is', () => {
        const { container } = render(
            <Textarea minWidth="50%" maxWidth="600px" data-testid="textarea" />
        );
        const label = container.querySelector('label') as HTMLLabelElement;

        expect(label.style.minWidth).toBe('50%');
        expect(label.style.maxWidth).toBe('600px');
    });

    it('Does not render a counter when maxLength is not set', () => {
        render(<Textarea data-testid="textarea" />);

        expect(screen.queryByText(/\/\d+/)).toBeNull();
    });

    it('Renders a current/max counter when maxLength is set', () => {
        render(<Textarea value="Hello" maxLength={200} data-testid="textarea" />);

        expect(screen.getByText('5/200')).toBeDefined();
    });

    it('Updates the counter as the value changes', () => {
        render(<Textarea maxLength={10} data-testid="textarea" />);
        const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

        expect(screen.getByText('0/10')).toBeDefined();

        fireEvent.change(textarea, { target: { value: 'abc' } });

        expect(screen.getByText('3/10')).toBeDefined();
    });

    it('Enforces maxLength natively on the textarea element', () => {
        render(<Textarea maxLength={10} data-testid="textarea" />);
        const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

        expect(textarea.maxLength).toBe(10);
    });

    it('Registers the label (not the textarea) as the field error tooltip trigger', () => {
        const registered: TFieldError[] = [];

        render(
            <FormErrorTooltipContext.Provider
                value={{
                    registerFieldError: (_id, error) => registered.push(error),
                    unregisterFieldError: () => {},
                }}
            >
                <Textarea error="Required" data-testid="textarea" />
            </FormErrorTooltipContext.Provider>
        );

        expect(registered).toHaveLength(1);
        expect(registered[0].element.tagName).toBe('LABEL');
    });
});
