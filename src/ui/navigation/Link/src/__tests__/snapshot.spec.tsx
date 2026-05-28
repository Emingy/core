import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { Link } from '..';

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            {ui}
        </MemoryRouter>
    );
};

describe('[SNAPSHOT] Link', () => {
    it('should render basic link', () => {
        const { container } = renderWithRouter(<Link to="/test">Click me</Link>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = renderWithRouter(
            <Link to="/test" className="custom-link">
                Custom Link
            </Link>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render disabled link', () => {
        const { container } = renderWithRouter(
            <Link to="/test" disabled>
                Disabled Link
            </Link>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render link with different paths', () => {
        const { container } = renderWithRouter(<Link to="/about">About</Link>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render link with state', () => {
        const { container } = renderWithRouter(
            <Link to="/test" state={{ from: 'home' }}>
                With State
            </Link>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render link with replace', () => {
        const { container } = renderWithRouter(
            <Link to="/test" replace>
                Replace Link
            </Link>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render link with aria attributes', () => {
        const { container } = renderWithRouter(
            <Link to="/test" aria-label="test-label" aria-current="page">
                Accessible Link
            </Link>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render link with title', () => {
        const { container } = renderWithRouter(
            <Link to="/test" title="Go to test page">
                Link with Title
            </Link>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render complex link', () => {
        const { container } = renderWithRouter(
            <Link to="/dashboard" className="nav-link" disabled title="Dashboard">
                Dashboard
            </Link>
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
