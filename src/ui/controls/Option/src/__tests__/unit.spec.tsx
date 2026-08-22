import React from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import { describe, expect, it } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';

import { EType } from '../constants';
import { Option } from '..';

const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
};

const renderWithRouter = (ui: React.ReactElement, initialRoute = '/') => {
    return render(
        <MemoryRouter
            initialEntries={[initialRoute]}
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
            <Routes>
                <Route
                    path="*"
                    element={
                        <>
                            {ui}
                            <LocationDisplay />
                        </>
                    }
                />
            </Routes>
        </MemoryRouter>
    );
};

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
        render(
            <Option isSelected={false} onSelect={() => {}}>
                Test
            </Option>
        );
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
        const { container } = render(
            <Option isSelected={false} onSelect={() => {}}>
                Test
            </Option>
        );
        const label = container.querySelector('label');

        expect(label?.className).not.toContain('Option__selected');
    });

    it('Does not apply alert class by default', () => {
        const { container } = render(<Option>Test</Option>);
        const label = container.querySelector('label');

        expect(label?.className).not.toContain('Option__alert');
    });

    it('Applies alert class when type is alert', () => {
        const { container } = render(<Option type={EType.Alert}>Test</Option>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Option__alert');
    });

    it('Does not apply alert class when type is default', () => {
        const { container } = render(<Option type={EType.Default}>Test</Option>);
        const label = container.querySelector('label');

        expect(label?.className).not.toContain('Option__alert');
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

    it('Renders label and description as siblings in document order', () => {
        const { container } = render(<Option description="Desc">Test</Option>);
        const label = container.querySelector('[class*="Option__label"]');
        const description = container.querySelector('[class*="Option__description"]');

        expect(label?.compareDocumentPosition(description!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
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

    it('Renders as label with checkbox by default', () => {
        const { container } = render(<Option>Test</Option>);
        const label = container.querySelector('label');
        const button = container.querySelector('button');

        expect(label).not.toBeNull();
        expect(button).toBeNull();
    });

    it('Renders as button when element is "button"', () => {
        const { container } = render(<Option element="button">Test</Option>);
        const button = container.querySelector('button');
        const label = container.querySelector('label');

        expect(button).not.toBeNull();
        expect(label).toBeNull();
    });

    it('Does not render a hidden checkbox when element is "button"', () => {
        const { container } = render(<Option element="button">Test</Option>);
        const input = container.querySelector('input');

        expect(input).toBeNull();
    });

    it('Button has type="button" attribute', () => {
        const { container } = render(<Option element="button">Test</Option>);
        const button = container.querySelector('button') as HTMLButtonElement;

        expect(button.type).toBe('button');
    });

    it('Calls onClick when button is clicked', () => {
        let clicked = false;
        const handleClick = () => {
            clicked = true;
        };

        const { container } = render(
            <Option element="button" onClick={handleClick}>
                Test
            </Option>
        );
        const button = container.querySelector('button') as HTMLButtonElement;

        fireEvent.click(button);

        expect(clicked).toBe(true);
    });

    it('Does not call onClick when disabled button is clicked', () => {
        let clicked = false;
        const handleClick = () => {
            clicked = true;
        };

        const { container } = render(
            <Option element="button" onClick={handleClick} isDisabled>
                Test
            </Option>
        );
        const button = container.querySelector('button') as HTMLButtonElement;

        fireEvent.click(button);

        expect(clicked).toBe(false);
    });

    it('Applies disabled attribute on button when isDisabled is true', () => {
        const { container } = render(
            <Option element="button" isDisabled>
                Test
            </Option>
        );
        const button = container.querySelector('button') as HTMLButtonElement;

        expect(button.disabled).toBe(true);
    });

    it('Applies custom id on button element', () => {
        const { container } = render(
            <Option element="button" id="button-option">
                Test
            </Option>
        );
        const button = container.querySelector('button') as HTMLButtonElement;

        expect(button.id).toBe('button-option');
    });

    it('Renders prefix and description in button mode', () => {
        render(
            <Option element="button" prefix="🔔" description="Some description">
                Button Option
            </Option>
        );

        expect(screen.getByText('🔔')).toBeDefined();
        expect(screen.getByText('Button Option')).toBeDefined();
        expect(screen.getByText('Some description')).toBeDefined();
    });

    it('Applies alert class on button element', () => {
        const { container } = render(
            <Option element="button" type={EType.Alert}>
                Test
            </Option>
        );
        const button = container.querySelector('button');

        expect(button?.className).toContain('Option__alert');
    });

    it('Renders as anchor when element is "link"', () => {
        const { container } = renderWithRouter(
            <Option element="link" to="/test">
                Test
            </Option>
        );
        const link = container.querySelector('a');
        const label = container.querySelector('label');
        const button = container.querySelector('button');

        expect(link).not.toBeNull();
        expect(label).toBeNull();
        expect(button).toBeNull();
    });

    it('Does not render a hidden checkbox when element is "link"', () => {
        const { container } = renderWithRouter(
            <Option element="link" to="/test">
                Test
            </Option>
        );
        const input = container.querySelector('input');

        expect(input).toBeNull();
    });

    it('Link renders with the given href', () => {
        const { container } = renderWithRouter(
            <Option element="link" to="/about">
                Test
            </Option>
        );
        const link = container.querySelector('a') as HTMLAnchorElement;

        expect(link.getAttribute('href')).toBe('/about');
    });

    it('Navigates when the link is clicked', () => {
        const { container } = renderWithRouter(
            <Option element="link" to="/about">
                Test
            </Option>,
            '/'
        );
        const link = container.querySelector('a') as HTMLAnchorElement;
        const location = screen.getByTestId('location');

        expect(location.textContent).toBe('/');

        fireEvent.click(link);

        expect(location.textContent).toBe('/about');
    });

    it('Calls onClick when the link is clicked', () => {
        let clicked = false;
        const handleClick = () => {
            clicked = true;
        };

        const { container } = renderWithRouter(
            <Option element="link" to="/about" onClick={handleClick}>
                Test
            </Option>
        );
        const link = container.querySelector('a') as HTMLAnchorElement;

        fireEvent.click(link);

        expect(clicked).toBe(true);
    });

    it('Does not navigate or call onClick when disabled link is clicked', () => {
        let clicked = false;
        const handleClick = () => {
            clicked = true;
        };

        const { container } = renderWithRouter(
            <Option element="link" to="/about" onClick={handleClick} isDisabled>
                Test
            </Option>,
            '/'
        );
        const link = container.querySelector('a') as HTMLAnchorElement;
        const location = screen.getByTestId('location');

        fireEvent.click(link);

        expect(clicked).toBe(false);
        expect(location.textContent).toBe('/');
    });

    it('Applies aria-disabled and removes link from tab order when isDisabled', () => {
        const { container } = renderWithRouter(
            <Option element="link" to="/about" isDisabled>
                Test
            </Option>
        );
        const link = container.querySelector('a') as HTMLAnchorElement;

        expect(link.getAttribute('aria-disabled')).toBe('true');
        expect(link.getAttribute('tabindex')).toBe('-1');
    });

    it('Applies custom id on link element', () => {
        const { container } = renderWithRouter(
            <Option element="link" to="/about" id="link-option">
                Test
            </Option>
        );
        const link = container.querySelector('a') as HTMLAnchorElement;

        expect(link.id).toBe('link-option');
    });

    it('Renders prefix and description in link mode', () => {
        renderWithRouter(
            <Option element="link" to="/about" prefix="🔔" description="Some description">
                Link Option
            </Option>
        );

        expect(screen.getByText('🔔')).toBeDefined();
        expect(screen.getByText('Link Option')).toBeDefined();
        expect(screen.getByText('Some description')).toBeDefined();
    });

    it('Applies alert class on link element', () => {
        const { container } = renderWithRouter(
            <Option element="link" to="/about" type={EType.Alert}>
                Test
            </Option>
        );
        const link = container.querySelector('a');

        expect(link?.className).toContain('Option__alert');
    });
});
