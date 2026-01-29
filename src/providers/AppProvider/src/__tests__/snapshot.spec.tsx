import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { AppProvider } from '..';

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            {ui}
        </MemoryRouter>
    );
};

describe('[SNAPSHOT] AppProvider', () => {
    it('should render with children', () => {
        const { container } = renderWithRouter(
            <AppProvider>
                <div>App content</div>
            </AppProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with multiple children', () => {
        const { container } = renderWithRouter(
            <AppProvider>
                <header>Header</header>
                <main>Main</main>
                <footer>Footer</footer>
            </AppProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with nested elements', () => {
        const { container } = renderWithRouter(
            <AppProvider>
                <div>
                    <h1>Title</h1>
                    <p>Paragraph</p>
                </div>
            </AppProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
