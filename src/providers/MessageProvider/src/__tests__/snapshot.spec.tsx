import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { EMessagePosition } from '../constants';
import { MessageProvider } from '..';

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            {ui}
        </MemoryRouter>
    );
};

describe('[SNAPSHOT] MessageProvider', () => {
    it('should render with children', () => {
        const { container } = renderWithRouter(
            <MessageProvider>
                <div>Child content</div>
            </MessageProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with default position', () => {
        const { container } = renderWithRouter(
            <MessageProvider>
                <span>App</span>
            </MessageProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with top-left position', () => {
        const { container } = renderWithRouter(
            <MessageProvider position={EMessagePosition.TopLeft}>
                <div>Content</div>
            </MessageProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with top-center position', () => {
        const { container } = renderWithRouter(
            <MessageProvider position={EMessagePosition.TopCenter}>
                <div>Content</div>
            </MessageProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with top-right position', () => {
        const { container } = renderWithRouter(
            <MessageProvider position={EMessagePosition.TopRight}>
                <div>Content</div>
            </MessageProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with bottom-left position', () => {
        const { container } = renderWithRouter(
            <MessageProvider position={EMessagePosition.BottomLeft}>
                <div>Content</div>
            </MessageProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with bottom-center position', () => {
        const { container } = renderWithRouter(
            <MessageProvider position={EMessagePosition.BottomCenter}>
                <div>Content</div>
            </MessageProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with bottom-right position', () => {
        const { container } = renderWithRouter(
            <MessageProvider position={EMessagePosition.BottomRight}>
                <div>Content</div>
            </MessageProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with maxCount prop', () => {
        const { container } = renderWithRouter(
            <MessageProvider maxCount={3}>
                <div>Content</div>
            </MessageProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with all props', () => {
        const { container } = renderWithRouter(
            <MessageProvider position={EMessagePosition.TopCenter} maxCount={5}>
                <div>Content</div>
            </MessageProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
