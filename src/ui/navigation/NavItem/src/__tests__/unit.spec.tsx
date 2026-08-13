import React from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import { describe, expect, it } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';

import { NavItem } from '..';

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

describe('[UNIT] NavItem', () => {
    it('renders the label', () => {
        renderWithRouter(<NavItem to="/test" label="Dashboard" />);

        expect(screen.getByText('Dashboard')).toBeDefined();
    });

    it('renders as anchor element', () => {
        renderWithRouter(<NavItem to="/test" label="Dashboard" data-testid="nav-item" />);

        expect(screen.getByTestId('nav-item').tagName).toBe('A');
    });

    it('navigates when clicked', () => {
        renderWithRouter(<NavItem to="/about" label="About" data-testid="nav-item" />);
        const location = screen.getByTestId('location');

        expect(location.textContent).toBe('/');

        fireEvent.click(screen.getByTestId('nav-item'));

        expect(location.textContent).toBe('/about');
    });

    it('renders prefix slot when provided', () => {
        renderWithRouter(
            <NavItem to="/test" label="Dashboard" prefix={<span data-testid="prefix-icon" />} />
        );

        expect(screen.getByTestId('prefix-icon')).toBeDefined();
    });

    it('does not render prefix slot when not provided', () => {
        const { container } = renderWithRouter(<NavItem to="/test" label="Dashboard" />);

        expect(container.querySelector('a')?.className).not.toContain('NavItem__prefix');
    });

    it('renders chevron icon when subItems is provided', () => {
        const { container } = renderWithRouter(
            <NavItem to="/test" label="Dashboard" subItems={[{ to: '/test/one', label: 'One' }]} />
        );

        expect(container.querySelector('svg')).not.toBeNull();
    });

    it('does not render chevron icon by default', () => {
        const { container } = renderWithRouter(<NavItem to="/test" label="Dashboard" />);

        expect(container.querySelector('svg')).toBeNull();
    });

    it('does not render chevron icon when subItems is empty', () => {
        const { container } = renderWithRouter(
            <NavItem to="/test" label="Dashboard" subItems={[]} />
        );

        expect(container.querySelector('svg')).toBeNull();
    });

    describe('with subItems', () => {
        it('does not show the submenu before the trigger is hovered', () => {
            renderWithRouter(
                <NavItem
                    to="/test"
                    label="Dashboard"
                    subItems={[{ to: '/test/one', label: 'One' }]}
                />
            );

            expect(screen.queryByText('One')).toBeNull();
        });

        it('shows nested NavItems as the submenu after hovering the trigger', () => {
            const { container } = renderWithRouter(
                <NavItem
                    to="/test"
                    label="Dashboard"
                    subItems={[
                        { to: '/test/one', label: 'One' },
                        { to: '/test/two', label: 'Two' },
                    ]}
                    data-testid="nav-item"
                />
            );

            fireEvent.mouseEnter(
                container.querySelector('[class*="Dropdown__trigger"] > *') as Element
            );

            expect(screen.getByText('One')).toBeDefined();
            expect(screen.getByText('Two')).toBeDefined();
        });
    });

    it('marks the item active when the route matches', () => {
        const { container } = renderWithRouter(<NavItem to="/test" label="Dashboard" />, '/test');

        expect(container.querySelector('a')?.className).toContain('NavItem__active');
    });

    it('does not mark the item active when the route does not match', () => {
        const { container } = renderWithRouter(<NavItem to="/other" label="Dashboard" />, '/test');

        expect(container.querySelector('a')?.className).not.toContain('NavItem__active');
    });

    it('forces active class via the active prop regardless of route', () => {
        const { container } = renderWithRouter(
            <NavItem to="/other" label="Dashboard" active />,
            '/test'
        );

        expect(container.querySelector('a')?.className).toContain('NavItem__active');
    });

    it('applies disabled class when disabled is true', () => {
        const { container } = renderWithRouter(<NavItem to="/test" label="Dashboard" disabled />);

        expect(container.querySelector('a')?.className).toContain('NavItem__disabled');
    });

    it('applies custom className', () => {
        const { container } = renderWithRouter(
            <NavItem to="/test" label="Dashboard" className="custom-nav-item" />
        );

        expect(container.querySelector('a')?.className).toContain('custom-nav-item');
    });

    it('renders tags when provided', () => {
        const { container } = renderWithRouter(
            <NavItem to="/test" label="Dashboard" tags={[{ text: 'New' }]} />
        );

        expect(container.querySelector('[class*="Tag"]')).not.toBeNull();
    });

    it('renders a badge when provided', () => {
        renderWithRouter(<NavItem to="/test" label="Dashboard" badge={{ value: 3 }} />);

        expect(screen.getByText('3')).toBeDefined();
    });

    describe('as a button (onClick, no "to")', () => {
        it('renders as a button element', () => {
            renderWithRouter(<NavItem onClick={() => {}} label="Log out" data-testid="nav-item" />);

            expect(screen.getByTestId('nav-item').tagName).toBe('BUTTON');
        });

        it('fires onClick when clicked', () => {
            const handleClick = () => {
                calls += 1;
            };
            let calls = 0;

            renderWithRouter(
                <NavItem onClick={handleClick} label="Log out" data-testid="nav-item" />
            );

            fireEvent.click(screen.getByTestId('nav-item'));

            expect(calls).toBe(1);
        });

        it('is natively disabled when disabled is true', () => {
            renderWithRouter(
                <NavItem onClick={() => {}} label="Log out" disabled data-testid="nav-item" />
            );

            expect(screen.getByTestId('nav-item')).toHaveProperty('disabled', true);
        });

        it('renders prefix, tags and badge like the link variant', () => {
            renderWithRouter(
                <NavItem
                    onClick={() => {}}
                    label="Log out"
                    prefix={<span data-testid="prefix-icon" />}
                    tags={[{ text: 'New' }]}
                    badge={{ value: 3 }}
                />
            );

            expect(screen.getByTestId('prefix-icon')).toBeDefined();
            expect(screen.getByText('3')).toBeDefined();
        });
    });

    describe('as an external link (absolute http(s) "to")', () => {
        it('redirects to the external URL via a real anchor href', () => {
            renderWithRouter(
                <NavItem to="https://example.com" label="Docs" data-testid="nav-item" />
            );
            const link = screen.getByTestId('nav-item') as HTMLAnchorElement;

            expect(link.tagName).toBe('A');
            expect(link.getAttribute('href')).toBe('https://example.com');
        });

        it('opens the external link in a new tab safely', () => {
            renderWithRouter(
                <NavItem to="https://example.com" label="Docs" data-testid="nav-item" />
            );
            const link = screen.getByTestId('nav-item');

            expect(link.getAttribute('target')).toBe('_blank');
            expect(link.getAttribute('rel')).toBe('noopener noreferrer');
        });

        it('does not navigate the in-app router when clicked', () => {
            renderWithRouter(
                <NavItem to="https://example.com" label="Docs" data-testid="nav-item" />
            );
            const location = screen.getByTestId('location');

            expect(location.textContent).toBe('/');

            fireEvent.click(screen.getByTestId('nav-item'));

            expect(location.textContent).toBe('/');
        });
    });
});
