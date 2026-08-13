import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { NavItem } from '..';

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            {ui}
        </MemoryRouter>
    );
};

describe('[SNAPSHOT] NavItem', () => {
    it('should render basic nav item', () => {
        const { container } = renderWithRouter(<NavItem to="/test" label="Dashboard" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with prefix icon', () => {
        const { container } = renderWithRouter(
            <NavItem to="/test" label="Dashboard" prefix={<span>icon</span>} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with subitems chevron', () => {
        const { container } = renderWithRouter(
            <NavItem
                to="/test"
                label="Settings"
                subItems={[{ to: '/test/profile', label: 'Profile' }]}
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render forced active state', () => {
        const { container } = renderWithRouter(<NavItem to="/test" label="Dashboard" active />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render disabled state', () => {
        const { container } = renderWithRouter(<NavItem to="/test" label="Dashboard" disabled />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with tags', () => {
        const { container } = renderWithRouter(
            <NavItem
                to="/test"
                label="Dashboard"
                tags={[{ text: 'New', color: 'green', size: 'sm' }]}
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with a badge', () => {
        const { container } = renderWithRouter(
            <NavItem to="/test" label="Inbox" badge={{ value: 3 }} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = renderWithRouter(
            <NavItem to="/test" label="Dashboard" className="custom-nav-item" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render as a button when onClick is used instead of "to"', () => {
        const { container } = renderWithRouter(<NavItem onClick={() => {}} label="Log out" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render as an external link for an absolute http(s) "to"', () => {
        const { container } = renderWithRouter(<NavItem to="https://example.com" label="Docs" />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
