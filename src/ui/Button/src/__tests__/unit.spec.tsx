import React from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import { describe, expect, it } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';

import { ESize, EType } from '../constants';
import { Button } from '..';

const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
};

const renderWithRouter = (ui: React.ReactElement, initialRoute = '/') => {
    return render(
        <MemoryRouter initialEntries={[initialRoute]}>
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

describe('[UNIT] Button', () => {
    it('Render', () => {
        renderWithRouter(<Button data-testid="button">Click me</Button>);

        expect(screen.getByTestId('button')).toBeDefined();
    });

    it('Renders children', () => {
        renderWithRouter(<Button>Click me</Button>);

        expect(screen.getByText('Click me')).toBeDefined();
    });

    it('Applies primary type by default', () => {
        const { container } = renderWithRouter(<Button>Button</Button>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Button__primary');
    });

    it('Applies secondary type', () => {
        const { container } = renderWithRouter(<Button type={EType.Secondary}>Button</Button>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Button__secondary');
    });

    it('Applies ghosted type', () => {
        const { container } = renderWithRouter(<Button type={EType.Ghosted}>Button</Button>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Button__ghosted');
    });

    it('Applies outlined type', () => {
        const { container } = renderWithRouter(<Button type={EType.Outlined}>Button</Button>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Button__outlined');
    });

    it('Applies alert type', () => {
        const { container } = renderWithRouter(<Button type={EType.Alert}>Button</Button>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Button__alert');
    });

    it('Applies medium size by default', () => {
        const { container } = renderWithRouter(<Button>Button</Button>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Button__middle-size');
    });

    it('Applies small size', () => {
        const { container } = renderWithRouter(<Button size={ESize.Sm}>Button</Button>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Button__small-size');
    });

    it('Applies large size', () => {
        const { container } = renderWithRouter(<Button size={ESize.Lg}>Button</Button>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Button__large-size');
    });

    it('Applies disabled state', () => {
        renderWithRouter(
            <Button disabled data-testid="button">
                Button
            </Button>
        );
        const button = screen.getByTestId('button') as HTMLButtonElement;

        expect(button.disabled).toBe(true);
    });

    it('Applies disabled class', () => {
        const { container } = renderWithRouter(<Button disabled>Button</Button>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Button__disabled');
    });

    it('Handles onClick event', () => {
        let clicked = false;
        const handleClick = () => {
            clicked = true;
        };
        renderWithRouter(
            <Button onClick={handleClick} data-testid="button">
                Button
            </Button>
        );
        const button = screen.getByTestId('button');

        fireEvent.click(button);

        expect(clicked).toBe(true);
    });

    it('Renders with prefix', () => {
        renderWithRouter(<Button prefix="$">Button</Button>);

        expect(screen.getByText('$')).toBeDefined();
    });

    it('Renders with postfix', () => {
        renderWithRouter(<Button postfix="→">Button</Button>);

        expect(screen.getByText('→')).toBeDefined();
    });

    it('Renders with prefix and postfix', () => {
        const { container } = renderWithRouter(
            <Button prefix="$" postfix="USD">
                Button
            </Button>
        );
        const label = container.querySelector('label');

        expect(label?.textContent).toContain('$');
        expect(label?.textContent).toContain('USD');
        expect(label?.textContent).toContain('Button');
    });

    it('Renders splitted button', () => {
        const { container } = renderWithRouter(<Button splitted>Button</Button>);
        const buttons = container.querySelectorAll('button');

        expect(buttons.length).toBe(2);
        expect(buttons[1].textContent).toBe('-');
    });

    it('Applies splitted class to main button', () => {
        const { container } = renderWithRouter(<Button splitted>Button</Button>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('Button__splitted');
    });

    it('Applies splitted-right class to second button', () => {
        const { container } = renderWithRouter(<Button splitted>Button</Button>);
        const buttons = container.querySelectorAll('button');

        expect(buttons[1].className).toContain('Button__splitted-right');
    });

    it('Applies custom className', () => {
        const { container } = renderWithRouter(<Button className="custom-button">Button</Button>);
        const label = container.querySelector('label');

        expect(label?.className).toContain('custom-button');
    });

    it('Passes htmlType to button element', () => {
        renderWithRouter(
            <Button htmlType="submit" data-testid="button">
                Submit
            </Button>
        );
        const button = screen.getByTestId('button') as HTMLButtonElement;

        expect(button.type).toBe('submit');
    });

    it('Passes rest props to button element', () => {
        renderWithRouter(
            <Button data-testid="button" aria-label="test-label" id="custom-id">
                Button
            </Button>
        );
        const button = screen.getByTestId('button');

        expect(button.getAttribute('aria-label')).toBe('test-label');
        expect(button.getAttribute('id')).toBe('custom-id');
    });

    it('Navigates when href is provided', () => {
        renderWithRouter(
            <Button href="/test-path" data-testid="button">
                Navigate
            </Button>,
            '/'
        );
        const button = screen.getByTestId('button');
        const location = screen.getByTestId('location');

        expect(location.textContent).toBe('/');

        fireEvent.click(button);

        expect(location.textContent).toBe('/test-path');
    });

    it('Calls onClick when href is provided', () => {
        let clicked = false;
        const handleClick = () => {
            clicked = true;
        };

        renderWithRouter(
            <Button onClick={handleClick} href="/test" data-testid="button">
                Click
            </Button>,
            '/'
        );
        const button = screen.getByTestId('button');

        fireEvent.click(button);

        expect(clicked).toBe(true);
    });

    it('Renders spinner when isLoading is true', () => {
        const { container } = renderWithRouter(<Button isLoading>Loading</Button>);
        const spinner = container.querySelector('svg');

        expect(spinner).toBeDefined();
    });

    it('Hides label when isLoading is true', () => {
        const { container } = renderWithRouter(<Button isLoading>Loading</Button>);
        const label = container.querySelector('.Button__label');

        expect(label?.className).toContain('Button__label-hidden');
    });

    it('Disables button when isLoading is true', () => {
        renderWithRouter(
            <Button isLoading data-testid="button">
                Loading
            </Button>
        );
        const button = screen.getByTestId('button') as HTMLButtonElement;

        expect(button.disabled).toBe(true);
    });

    it('Does not navigate when isLoading and href is provided', () => {
        renderWithRouter(
            <Button isLoading href="/test-path" data-testid="button">
                Loading
            </Button>,
            '/'
        );
        const button = screen.getByTestId('button');
        const location = screen.getByTestId('location');

        expect(location.textContent).toBe('/');

        fireEvent.click(button);

        expect(location.textContent).toBe('/');
    });

    it('Shows label when isLoading is false', () => {
        const { container } = renderWithRouter(<Button isLoading={false}>Click me</Button>);
        const label = container.querySelector('.Button__label');

        expect(label?.className).not.toContain('Button__label-hidden');
    });

    it('Does not render spinner when isLoading is false', () => {
        const { container } = renderWithRouter(<Button isLoading={false}>Click me</Button>);
        const spinner = container.querySelector('svg');

        expect(spinner).toBeNull();
    });

    it('Applies full width class when isFullWidth is true', () => {
        const { container } = renderWithRouter(<Button isFullWidth>Full Width</Button>);
        const wrapper = container.firstChild as HTMLElement;

        expect(wrapper?.className).toContain('Button__wrapper_full-width');
    });

    it('Does not apply full width class when isFullWidth is false', () => {
        const { container } = renderWithRouter(<Button isFullWidth={false}>Normal</Button>);
        const wrapper = container.firstChild as HTMLElement;

        expect(wrapper?.className).not.toContain('Button__wrapper_full-width');
    });
});
