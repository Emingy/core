import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { useMessage } from '@emingy/core/hooks/useMessage';
import { describe, expect, it } from '@rstest/core';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { EMessagePosition } from '../constants';
import { MessageProvider } from '..';

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
};

const TestConsumer = ({
    onMount,
}: {
    onMount?: (message: ReturnType<typeof useMessage>) => void;
}) => {
    const message = useMessage();

    React.useEffect(() => {
        onMount?.(message);
    }, []);

    return (
        <button
            data-testid="trigger"
            onClick={() => message.success({ title: 'Test', content: 'Test content' })}
        >
            Trigger
        </button>
    );
};

describe('[UNIT] MessageProvider', () => {
    it('Renders children', () => {
        renderWithRouter(
            <MessageProvider>
                <div data-testid="child">Hello</div>
            </MessageProvider>
        );

        expect(screen.getByTestId('child')).toBeDefined();
        expect(screen.getByText('Hello')).toBeDefined();
    });

    it('Renders portal container in document.body', () => {
        renderWithRouter(
            <MessageProvider>
                <div>Content</div>
            </MessageProvider>
        );

        const container = document.body.querySelector('[class*="MessageContainer"]');

        expect(container).toBeDefined();
        expect(container).not.toBeNull();
    });

    it('Applies default bottom-right position class', () => {
        renderWithRouter(
            <MessageProvider>
                <div>Content</div>
            </MessageProvider>
        );

        const container = document.body.querySelector('[class*="MessageContainer"]');

        expect(container?.className).toContain('bottom-right');
    });

    it('Applies custom position class', () => {
        renderWithRouter(
            <MessageProvider position={EMessagePosition.TopCenter}>
                <div>Content</div>
            </MessageProvider>
        );

        const container = document.body.querySelector('[class*="MessageContainer"]');

        expect(container?.className).toContain('top-center');
    });

    it('Shows message when triggered via context', () => {
        renderWithRouter(
            <MessageProvider>
                <TestConsumer />
            </MessageProvider>
        );

        act(() => {
            fireEvent.click(screen.getByTestId('trigger'));
        });

        expect(screen.getByText('Test')).toBeDefined();
        expect(screen.getByText('Test content')).toBeDefined();
    });

    it('Shows multiple messages', () => {
        let messageApi: ReturnType<typeof useMessage>;

        renderWithRouter(
            <MessageProvider>
                <TestConsumer
                    onMount={(m) => {
                        messageApi = m;
                    }}
                />
            </MessageProvider>
        );

        act(() => {
            messageApi.success({ content: 'First' });
            messageApi.warning({ content: 'Second' });
            messageApi.error({ content: 'Third' });
        });

        expect(screen.getByText('First')).toBeDefined();
        expect(screen.getByText('Second')).toBeDefined();
        expect(screen.getByText('Third')).toBeDefined();
    });

    it('Removes message via close', () => {
        let messageApi: ReturnType<typeof useMessage>;

        renderWithRouter(
            <MessageProvider>
                <TestConsumer
                    onMount={(m) => {
                        messageApi = m;
                    }}
                />
            </MessageProvider>
        );

        let id: string;

        act(() => {
            id = messageApi.success({ content: 'To remove', duration: 0 });
        });

        expect(screen.getByText('To remove')).toBeDefined();

        act(() => {
            messageApi.close(id);
        });

        expect(screen.queryByText('To remove')).toBeNull();
    });

    it('Removes all messages via closeAll', () => {
        let messageApi: ReturnType<typeof useMessage>;

        renderWithRouter(
            <MessageProvider>
                <TestConsumer
                    onMount={(m) => {
                        messageApi = m;
                    }}
                />
            </MessageProvider>
        );

        act(() => {
            messageApi.success({ content: 'Msg 1', duration: 0 });
            messageApi.warning({ content: 'Msg 2', duration: 0 });
        });

        expect(screen.getByText('Msg 1')).toBeDefined();
        expect(screen.getByText('Msg 2')).toBeDefined();

        act(() => {
            messageApi.closeAll();
        });

        expect(screen.queryByText('Msg 1')).toBeNull();
        expect(screen.queryByText('Msg 2')).toBeNull();
    });

    it('Returns unique message ID', () => {
        let messageApi: ReturnType<typeof useMessage>;

        renderWithRouter(
            <MessageProvider>
                <TestConsumer
                    onMount={(m) => {
                        messageApi = m;
                    }}
                />
            </MessageProvider>
        );

        let id1: string;
        let id2: string;

        act(() => {
            id1 = messageApi.success({ content: 'A' });
            id2 = messageApi.success({ content: 'B' });
        });

        expect(id1!).toBeDefined();
        expect(id2!).toBeDefined();
        expect(id1!).not.toBe(id2!);
    });

    it('Respects maxCount prop', () => {
        let messageApi: ReturnType<typeof useMessage>;

        renderWithRouter(
            <MessageProvider maxCount={2}>
                <TestConsumer
                    onMount={(m) => {
                        messageApi = m;
                    }}
                />
            </MessageProvider>
        );

        act(() => {
            messageApi.success({ content: 'Oldest', duration: 0 });
            messageApi.success({ content: 'Middle', duration: 0 });
            messageApi.success({ content: 'Newest', duration: 0 });
        });

        expect(screen.queryByText('Oldest')).toBeNull();
        expect(screen.getByText('Middle')).toBeDefined();
        expect(screen.getByText('Newest')).toBeDefined();
    });

    it('Renders message with title', () => {
        let messageApi: ReturnType<typeof useMessage>;

        renderWithRouter(
            <MessageProvider>
                <TestConsumer
                    onMount={(m) => {
                        messageApi = m;
                    }}
                />
            </MessageProvider>
        );

        act(() => {
            messageApi.success({ title: 'My Title', content: 'My Content' });
        });

        expect(screen.getByText('My Title')).toBeDefined();
        expect(screen.getByText('My Content')).toBeDefined();
    });

    it('Renders message without title', () => {
        let messageApi: ReturnType<typeof useMessage>;

        renderWithRouter(
            <MessageProvider>
                <TestConsumer
                    onMount={(m) => {
                        messageApi = m;
                    }}
                />
            </MessageProvider>
        );

        act(() => {
            messageApi.error({ content: 'No title message' });
        });

        expect(screen.getByText('No title message')).toBeDefined();
    });
});
