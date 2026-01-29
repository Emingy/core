import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { EType } from '@emingy/core/ui/Message/src/constants';
import { afterEach, beforeEach, describe, expect, it, rstest } from '@rstest/core';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { DEFAULT_DURATION, EMessagePosition } from '../../../constants';
import type { TMessageItem } from '../../../types';
import { EAnimationState } from '../constants';
import { MessageItem } from '..';

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
    content: 'Test message',
    ...overrides,
});

describe('[UNIT] MessageItem', () => {
    beforeEach(() => {
        rstest.useFakeTimers();
    });

    afterEach(() => {
        rstest.useRealTimers();
    });

    it('Renders message content', () => {
        const item = createItem({ content: 'Hello world' });
        const onRemove = rstest.fn();

        renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        expect(screen.getByText('Hello world')).toBeDefined();
    });

    it('Renders message with title', () => {
        const item = createItem({ title: 'My Title', content: 'Body text' });
        const onRemove = rstest.fn();

        renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        expect(screen.getByText('My Title')).toBeDefined();
        expect(screen.getByText('Body text')).toBeDefined();
    });

    it('Starts with entering animation state', () => {
        const item = createItem();
        const onRemove = rstest.fn();

        const { container } = renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        const wrapper = container.querySelector('[class*="MessageItem"]');

        expect(wrapper?.className).toContain(EAnimationState.Entering);
    });

    it('Transitions to visible state via requestAnimationFrame', () => {
        const item = createItem({ duration: 0 });
        const onRemove = rstest.fn();

        const { container } = renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        act(() => {
            rstest.runAllTimers();
        });

        const wrapper = container.querySelector('[class*="MessageItem"]');

        expect(wrapper?.className).toContain(EAnimationState.Visible);
    });

    it('Applies from-bottom class for bottom positions', () => {
        const item = createItem();
        const onRemove = rstest.fn();

        const { container } = renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        const wrapper = container.querySelector('[class*="MessageItem"]');

        expect(wrapper?.className).toContain('from-bottom');
    });

    it('Applies from-top class for top positions', () => {
        const item = createItem();
        const onRemove = rstest.fn();

        const { container } = renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.TopLeft} onRemove={onRemove} />
        );

        const wrapper = container.querySelector('[class*="MessageItem"]');

        expect(wrapper?.className).toContain('from-top');
    });

    it('Auto-dismisses after default duration', () => {
        const item = createItem();
        const onRemove = rstest.fn();

        const { container } = renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        // Transition to visible
        act(() => {
            rstest.advanceTimersByTime(16);
        });

        // Advance past default duration
        act(() => {
            rstest.advanceTimersByTime(DEFAULT_DURATION);
        });

        const wrapper = container.querySelector('[class*="MessageItem"]');

        expect(wrapper?.className).toContain(EAnimationState.Exiting);
    });

    it('Auto-dismisses after custom duration', () => {
        const item = createItem({ duration: 2000 });
        const onRemove = rstest.fn();

        const { container } = renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        // Transition to visible
        act(() => {
            rstest.advanceTimersByTime(16);
        });

        // Advance past custom duration
        act(() => {
            rstest.advanceTimersByTime(2000);
        });

        const wrapper = container.querySelector('[class*="MessageItem"]');

        expect(wrapper?.className).toContain(EAnimationState.Exiting);
    });

    it('Does not auto-dismiss when duration is 0', () => {
        const item = createItem({ duration: 0 });
        const onRemove = rstest.fn();

        const { container } = renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        // Transition to visible
        act(() => {
            rstest.advanceTimersByTime(16);
        });

        // Advance well past any duration
        act(() => {
            rstest.advanceTimersByTime(60000);
        });

        const wrapper = container.querySelector('[class*="MessageItem"]');

        expect(wrapper?.className).toContain(EAnimationState.Visible);
        expect(wrapper?.className).not.toContain(EAnimationState.Exiting);
    });

    it('Calls onRemove after exit transition ends', () => {
        const item = createItem({ duration: 0 });
        const onRemove = rstest.fn();

        const { container } = renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        // Transition to visible
        act(() => {
            rstest.advanceTimersByTime(16);
        });

        const wrapper = container.querySelector('[class*="MessageItem"]')!;

        // Trigger close via the close button
        const closeButton = screen.getByRole('button');

        act(() => {
            fireEvent.click(closeButton);
        });

        // Simulate transition end
        act(() => {
            fireEvent.transitionEnd(wrapper, { target: wrapper });
        });

        expect(onRemove).toHaveBeenCalledWith('msg-1');
    });

    it('Does not call onRemove if transitionEnd fires from child element', () => {
        const item = createItem({ duration: 0 });
        const onRemove = rstest.fn();

        const { container } = renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        // Transition to visible
        act(() => {
            rstest.advanceTimersByTime(16);
        });

        const wrapper = container.querySelector('[class*="MessageItem"]')!;

        // Trigger close
        const closeButton = screen.getByRole('button');

        act(() => {
            fireEvent.click(closeButton);
        });

        // Fire transitionEnd from a child, not the wrapper
        const childElement = wrapper.querySelector('[class*="Message"]')!;

        act(() => {
            fireEvent.transitionEnd(wrapper, { target: childElement });
        });

        expect(onRemove).not.toHaveBeenCalled();
    });

    it('Pauses auto-dismiss timer on mouse enter', () => {
        const item = createItem({ duration: 3000 });
        const onRemove = rstest.fn();

        const { container } = renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        // Transition to visible
        act(() => {
            rstest.advanceTimersByTime(16);
        });

        // Let 1 second pass
        act(() => {
            rstest.advanceTimersByTime(1000);
        });

        // Hover to pause
        const messageEl = screen.getByText('Test message');

        act(() => {
            fireEvent.mouseEnter(messageEl);
        });

        // Advance past remaining duration — should NOT exit since hovered
        act(() => {
            rstest.advanceTimersByTime(5000);
        });

        const wrapper = container.querySelector('[class*="MessageItem"]');

        expect(wrapper?.className).toContain(EAnimationState.Visible);
        expect(wrapper?.className).not.toContain(EAnimationState.Exiting);
    });

    it('Resumes auto-dismiss timer on mouse leave', () => {
        const item = createItem({ duration: 3000 });
        const onRemove = rstest.fn();

        const { container } = renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        // Transition to visible
        act(() => {
            rstest.advanceTimersByTime(16);
        });

        // Let 1 second pass
        act(() => {
            rstest.advanceTimersByTime(1000);
        });

        // Hover to pause
        const messageEl = screen.getByText('Test message');

        act(() => {
            fireEvent.mouseEnter(messageEl);
        });

        // Leave to resume
        act(() => {
            fireEvent.mouseLeave(messageEl);
        });

        // Advance remaining time (2000ms)
        act(() => {
            rstest.advanceTimersByTime(2000);
        });

        const wrapper = container.querySelector('[class*="MessageItem"]');

        expect(wrapper?.className).toContain(EAnimationState.Exiting);
    });

    it('Transitions to exiting when close button is clicked', () => {
        const item = createItem({ duration: 0 });
        const onRemove = rstest.fn();

        const { container } = renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        // Transition to visible
        act(() => {
            rstest.advanceTimersByTime(16);
        });

        const closeButton = screen.getByRole('button');

        act(() => {
            fireEvent.click(closeButton);
        });

        const wrapper = container.querySelector('[class*="MessageItem"]');

        expect(wrapper?.className).toContain(EAnimationState.Exiting);
    });

    it('Renders success message type', () => {
        const item = createItem({ type: EType.Success, content: 'Success msg' });
        const onRemove = rstest.fn();

        renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        expect(screen.getByText('Success msg')).toBeDefined();
    });

    it('Renders warning message type', () => {
        const item = createItem({ type: EType.Warning, content: 'Warning msg' });
        const onRemove = rstest.fn();

        renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        expect(screen.getByText('Warning msg')).toBeDefined();
    });

    it('Renders error message type', () => {
        const item = createItem({ type: EType.Error, content: 'Error msg' });
        const onRemove = rstest.fn();

        renderWithRouter(
            <MessageItem item={item} position={EMessagePosition.BottomRight} onRemove={onRemove} />
        );

        expect(screen.getByText('Error msg')).toBeDefined();
    });
});
