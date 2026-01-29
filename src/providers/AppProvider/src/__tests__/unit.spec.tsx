import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { useMessage } from '@emingy/core/hooks/useMessage';
import { describe, expect, it } from '@rstest/core';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { AppProvider } from '..';

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            {ui}
        </MemoryRouter>
    );
};

const TestConsumer = () => {
    const message = useMessage();

    return (
        <button
            data-testid="trigger"
            onClick={() => message.success({ content: 'Toast from AppProvider' })}
        >
            Trigger
        </button>
    );
};

describe('[UNIT] AppProvider', () => {
    it('Renders children', () => {
        renderWithRouter(
            <AppProvider>
                <div data-testid="child">Hello</div>
            </AppProvider>
        );

        expect(screen.getByTestId('child')).toBeDefined();
        expect(screen.getByText('Hello')).toBeDefined();
    });

    it('Renders multiple children', () => {
        renderWithRouter(
            <AppProvider>
                <div data-testid="first">First</div>
                <div data-testid="second">Second</div>
            </AppProvider>
        );

        expect(screen.getByTestId('first')).toBeDefined();
        expect(screen.getByTestId('second')).toBeDefined();
    });

    it('Provides MessageProvider context to children', () => {
        renderWithRouter(
            <AppProvider>
                <TestConsumer />
            </AppProvider>
        );

        act(() => {
            fireEvent.click(screen.getByTestId('trigger'));
        });

        expect(screen.getByText('Toast from AppProvider')).toBeDefined();
    });

    it('Renders portal container in document.body', () => {
        renderWithRouter(
            <AppProvider>
                <div>Content</div>
            </AppProvider>
        );

        const container = document.body.querySelector('[class*="MessageContainer"]');

        expect(container).toBeDefined();
        expect(container).not.toBeNull();
    });

    it('Applies default bottom-right position for MessageProvider', () => {
        renderWithRouter(
            <AppProvider>
                <div>Content</div>
            </AppProvider>
        );

        const container = document.body.querySelector('[class*="MessageContainer"]');

        expect(container?.className).toContain('bottom-right');
    });
});
