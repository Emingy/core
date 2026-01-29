import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { EType } from '@emingy/core/ui/Message/src/constants';
import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { EMessagePosition } from '../../../constants';
import type { TMessageItem } from '../../../types';
import { MessageItem } from '..';

const noop = () => {};

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            {ui}
        </MemoryRouter>
    );
};

const createItem = (overrides: Partial<TMessageItem> = {}): TMessageItem => ({
    id: 'msg-1',
    type: EType.Success,
    content: 'Snapshot content',
    ...overrides,
});

describe('[SNAPSHOT] MessageItem', () => {
    it('should render success message', () => {
        const { container } = renderWithRouter(
            <MessageItem
                item={createItem()}
                position={EMessagePosition.BottomRight}
                onRemove={noop}
            />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render warning message', () => {
        const { container } = renderWithRouter(
            <MessageItem
                item={createItem({ type: EType.Warning })}
                position={EMessagePosition.BottomRight}
                onRemove={noop}
            />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render error message', () => {
        const { container } = renderWithRouter(
            <MessageItem
                item={createItem({ type: EType.Error })}
                position={EMessagePosition.BottomRight}
                onRemove={noop}
            />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with title', () => {
        const { container } = renderWithRouter(
            <MessageItem
                item={createItem({ title: 'Alert Title' })}
                position={EMessagePosition.BottomRight}
                onRemove={noop}
            />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render without title', () => {
        const { container } = renderWithRouter(
            <MessageItem
                item={createItem({ title: undefined })}
                position={EMessagePosition.BottomRight}
                onRemove={noop}
            />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with top-left position', () => {
        const { container } = renderWithRouter(
            <MessageItem item={createItem()} position={EMessagePosition.TopLeft} onRemove={noop} />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with top-center position', () => {
        const { container } = renderWithRouter(
            <MessageItem
                item={createItem()}
                position={EMessagePosition.TopCenter}
                onRemove={noop}
            />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with top-right position', () => {
        const { container } = renderWithRouter(
            <MessageItem item={createItem()} position={EMessagePosition.TopRight} onRemove={noop} />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with bottom-left position', () => {
        const { container } = renderWithRouter(
            <MessageItem
                item={createItem()}
                position={EMessagePosition.BottomLeft}
                onRemove={noop}
            />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with bottom-center position', () => {
        const { container } = renderWithRouter(
            <MessageItem
                item={createItem()}
                position={EMessagePosition.BottomCenter}
                onRemove={noop}
            />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with bottom-right position', () => {
        const { container } = renderWithRouter(
            <MessageItem
                item={createItem()}
                position={EMessagePosition.BottomRight}
                onRemove={noop}
            />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with ReactNode content', () => {
        const { container } = renderWithRouter(
            <MessageItem
                item={createItem({ content: <span data-testid="custom">Custom JSX</span> })}
                position={EMessagePosition.BottomRight}
                onRemove={noop}
            />
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
