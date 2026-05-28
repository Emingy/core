import React from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import { describe, expect, it } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';

import { Link } from '..';

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

describe('[UNIT] Link', () => {
    it('Render', () => {
        renderWithRouter(
            <Link to="/test" data-testid="link">
                Link
            </Link>
        );

        expect(screen.getByTestId('link')).toBeDefined();
    });

    it('Renders children', () => {
        renderWithRouter(<Link to="/test">Click me</Link>);

        expect(screen.getByText('Click me')).toBeDefined();
    });

    it('Renders as anchor element', () => {
        renderWithRouter(
            <Link to="/test" data-testid="link">
                Link
            </Link>
        );
        const link = screen.getByTestId('link');

        expect(link.tagName).toBe('A');
    });

    it('Applies custom className', () => {
        const { container } = renderWithRouter(
            <Link to="/test" className="custom-link">
                Link
            </Link>
        );
        const link = container.querySelector('a');

        expect(link?.className).toContain('custom-link');
    });

    it('Applies Link base class', () => {
        const { container } = renderWithRouter(<Link to="/test">Link</Link>);
        const link = container.querySelector('a');

        expect(link?.className).toContain('Link');
    });

    it('Applies disabled class when disabled is true', () => {
        const { container } = renderWithRouter(
            <Link to="/test" disabled>
                Disabled Link
            </Link>
        );
        const link = container.querySelector('a');

        expect(link?.className).toContain('Link__disabled');
    });

    it('Does not apply disabled class when disabled is false', () => {
        const { container } = renderWithRouter(
            <Link to="/test" disabled={false}>
                Link
            </Link>
        );
        const link = container.querySelector('a');

        expect(link?.className).not.toContain('Link__disabled');
    });

    it('Passes to prop correctly', () => {
        renderWithRouter(
            <Link to="/about" data-testid="link">
                About
            </Link>
        );
        const link = screen.getByTestId('link') as HTMLAnchorElement;

        expect(link.getAttribute('href')).toBe('/about');
    });

    it('Navigates when clicked', () => {
        renderWithRouter(
            <Link to="/about" data-testid="link">
                About
            </Link>,
            '/'
        );
        const link = screen.getByTestId('link');
        const location = screen.getByTestId('location');

        expect(location.textContent).toBe('/');

        fireEvent.click(link);

        expect(location.textContent).toBe('/about');
    });

    it('Passes rest props to link element', () => {
        renderWithRouter(
            <Link to="/test" data-testid="link" aria-label="test-label" title="Test Title">
                Link
            </Link>
        );
        const link = screen.getByTestId('link');

        expect(link.getAttribute('aria-label')).toBe('test-label');
        expect(link.getAttribute('title')).toBe('Test Title');
    });

    it('Supports relative prop', () => {
        renderWithRouter(
            <Link to="relative-path" relative="path" data-testid="link">
                Relative
            </Link>
        );
        const link = screen.getByTestId('link');

        expect(link).toBeDefined();
    });

    it('Supports replace prop', () => {
        renderWithRouter(
            <Link to="/test" replace data-testid="link">
                Replace
            </Link>
        );
        const link = screen.getByTestId('link');

        expect(link).toBeDefined();
    });

    it('Supports state prop', () => {
        renderWithRouter(
            <Link to="/test" state={{ from: 'home' }} data-testid="link">
                With State
            </Link>
        );
        const link = screen.getByTestId('link');

        expect(link).toBeDefined();
    });

    it('Renders multiple links', () => {
        renderWithRouter(
            <>
                <Link to="/home" data-testid="link1">
                    Home
                </Link>
                <Link to="/about" data-testid="link2">
                    About
                </Link>
            </>
        );

        expect(screen.getByTestId('link1')).toBeDefined();
        expect(screen.getByTestId('link2')).toBeDefined();
    });
});
