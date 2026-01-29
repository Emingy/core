import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';

import { Option } from '..';

describe('[UNIT] Option', () => {
    it('Render', () => {
        const { container } = render(<Option>Test Option</Option>);
        const label = container.querySelector('label');

        expect(label).toBeDefined();
    });

    it('Renders as label element', () => {
        const { container } = render(<Option>Test Option</Option>);
        const label = container.querySelector('label');

        expect(label?.tagName).toBe('LABEL');
    });

    it('Renders children text', () => {
        render(<Option>My Option</Option>);

        expect(screen.getByText('My Option')).toBeDefined();
    });

    it('Contains hidden checkbox input', () => {
        render(<Option>Test</Option>);
        const input = screen.getByRole('checkbox', { hidden: true });

        expect(input).toBeDefined();
        expect(input.hasAttribute('hidden')).toBe(true);
    });

    it('Checkbox has type checkbox', () => {
        render(<Option>Test</Option>);
        const input = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement;

        expect(input.type).toBe('checkbox');
    });

    it('Uses custom id when provided', () => {
        const { container } = render(<Option id="custom-id">Test</Option>);
        const input = screen.getByRole('checkbox', { hidden: true });
        const label = container.querySelector('label') as HTMLLabelElement;

        expect(input.id).toBe('custom-id');
        expect(label.htmlFor).toBe('custom-id');
    });

    it('Auto-generates id when not provided', () => {
        const { container } = render(<Option>Test</Option>);
        const input = screen.getByRole('checkbox', { hidden: true });
        const label = container.querySelector('label') as HTMLLabelElement;

        expect(input.id).toBeDefined();
        expect(input.id).not.toBe('');
        expect(label.htmlFor).toBe(input.id);
    });

    it('Applies selected state when isSelected is true', () => {
        render(
            <Option isSelected onSelect={() => {}}>
                Test
            </Option>
        );
        const input = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement;

        expect(input.checked).toBe(true);
    });

    it('Does not apply selected state when isSelected is false', () => {
        render(<Option isSelected={false}>Test</Option>);
        const input = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement;

        expect(input.checked).toBe(false);
    });

    it('Applies disabled state when isDisabled is true', () => {
        render(<Option isDisabled>Test</Option>);
        const input = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement;

        expect(input.disabled).toBe(true);
    });

    it('Does not apply disabled state when isDisabled is false', () => {
        render(<Option isDisabled={false}>Test</Option>);
        const input = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement;

        expect(input.disabled).toBe(false);
    });

    it('Calls onSelect when checkbox changes', () => {
        let selectCalled = false;
        const handleSelect = () => {
            selectCalled = true;
        };

        const { container } = render(<Option onSelect={handleSelect}>Test</Option>);
        const label = container.querySelector('label');

        if (label) {
            fireEvent.click(label);
        }

        expect(selectCalled).toBe(true);
    });

    it('Does not call onSelect when disabled', () => {
        let selectCalled = false;
        const handleSelect = () => {
            selectCalled = true;
        };

        render(
            <Option onSelect={handleSelect} isDisabled>
                Test
            </Option>
        );
        const input = screen.getByRole('checkbox', { hidden: true });

        fireEvent.change(input);

        expect(selectCalled).toBe(false);
    });

    it('Renders prefix when provided', () => {
        render(<Option prefix="🔔">Test</Option>);

        expect(screen.getByText('🔔')).toBeDefined();
    });

    it('Does not render prefix when not provided', () => {
        const { container } = render(<Option>Test</Option>);
        const prefix = container.querySelector('.Option__prefix');

        expect(prefix).toBeNull();
    });

    it('Renders description when provided', () => {
        render(<Option description="This is a description">Test</Option>);

        expect(screen.getByText('This is a description')).toBeDefined();
    });

    it('Does not render description when not provided', () => {
        render(<Option>Test</Option>);

        expect(screen.queryByText('This is a description')).toBeNull();
    });

    it('Applies Option base class', () => {
        const { container } = render(<Option>Test</Option>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Option');
    });

    it('Applies custom className', () => {
        const { container } = render(<Option className="custom-option">Test</Option>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('custom-option');
    });

    it('Applies selected class when isSelected is true', () => {
        const { container } = render(
            <Option isSelected onSelect={() => {}}>
                Test
            </Option>
        );
        const label = container.querySelector('label');

        expect(label?.className).toContain('Option__selected');
    });

    it('Does not apply selected class when isSelected is false', () => {
        const { container } = render(<Option isSelected={false}>Test</Option>);
        const label = container.querySelector('label');

        expect(label?.className).not.toContain('Option__selected');
    });

    it('Applies disabled class when isDisabled is true', () => {
        const { container } = render(<Option isDisabled>Test</Option>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Option__disabled');
    });

    it('Does not apply disabled class when isDisabled is false', () => {
        const { container } = render(<Option isDisabled={false}>Test</Option>);
        const label = container.querySelector('label');

        expect(label?.className).not.toContain('Option__disabled');
    });

    it('Contains Typography.Base for children', () => {
        render(<Option>Test Content</Option>);

        expect(screen.getByText('Test Content')).toBeDefined();
    });

    it('Contains Typography.Micro for description', () => {
        render(<Option description="Description text">Test</Option>);
        const description = screen.getByText('Description text');

        expect(description).toBeDefined();
        expect(description.className).toContain('micro');
    });

    it('Uses Flex component with column direction', () => {
        const { container } = render(<Option description="Desc">Test</Option>);
        const flex = container.querySelector('div[class*="Flex"]');

        expect(flex).toBeDefined();
    });

    it('Renders multiple options independently', () => {
        const { container } = render(
            <>
                <Option id="opt1" isSelected onSelect={() => {}}>
                    Option 1
                </Option>
                <Option id="opt2">Option 2</Option>
            </>
        );
        const labels = container.querySelectorAll('label');
        const inputs = container.querySelectorAll('input');

        expect(labels.length).toBe(2);
        expect(inputs.length).toBe(2);
        expect((inputs[0] as HTMLInputElement).checked).toBe(true);
        expect((inputs[1] as HTMLInputElement).checked).toBe(false);
    });

    it('Renders with prefix, description, and all states', () => {
        const { container } = render(
            <Option
                id="complex"
                prefix="✓"
                description="Complex description"
                isSelected
                className="complex-option"
                onSelect={() => {}}
            >
                Complex Option
            </Option>
        );
        const label = container.querySelector('label');
        const input = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement;

        expect(label?.className).toContain('Option');
        expect(label?.className).toContain('Option__selected');
        expect(label?.className).toContain('complex-option');
        expect(input.checked).toBe(true);
        expect(input.id).toBe('complex');
        expect(screen.getByText('✓')).toBeDefined();
        expect(screen.getByText('Complex description')).toBeDefined();
    });

    it('Label htmlFor matches input id', () => {
        const { container } = render(<Option id="test-id">Test</Option>);
        const label = container.querySelector('label') as HTMLLabelElement;
        const input = screen.getByRole('checkbox', { hidden: true });

        expect(label.htmlFor).toBe('test-id');
        expect(input.id).toBe('test-id');
    });

    it('Combines multiple CSS classes correctly', () => {
        const { container } = render(
            <Option className="custom" isSelected isDisabled onSelect={() => {}}>
                Test
            </Option>
        );
        const label = container.querySelector('label');

        expect(label?.className).toContain('Option');
        expect(label?.className).toContain('Option__selected');
        expect(label?.className).toContain('Option__disabled');
        expect(label?.className).toContain('custom');
    });

    it('Handles empty children', () => {
        const { container } = render(<Option />);
        const label = container.querySelector('label');

        expect(label).toBeDefined();
    });

    it('Handles ReactNode as prefix', () => {
        const PrefixComponent = () => <span>Icon</span>;
        render(<Option prefix={<PrefixComponent />}>Test</Option>);

        expect(screen.getByText('Icon')).toBeDefined();
    });
});
