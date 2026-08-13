import React from 'react';

import { afterEach, beforeEach, describe, expect, it, rstest } from '@rstest/core';
import { act, fireEvent, render } from '@testing-library/react';

import { Dropdown } from '..';

const getTrigger = (container: HTMLElement) =>
    container.querySelector('[class*="Dropdown__trigger"] > *') as Element;

const getPanel = () => document.body.querySelector('[class*="Dropdown__panel"]');

const flushEnterAnimation = () => {
    act(() => {
        rstest.advanceTimersByTime(16);
    });
};

describe('[UNIT] Dropdown', () => {
    beforeEach(() => {
        rstest.useFakeTimers();
    });

    afterEach(() => {
        rstest.useRealTimers();
    });

    it('Renders trigger children', () => {
        const { getByText } = render(
            <Dropdown content={<span>Content</span>}>
                <button type="button">Trigger</button>
            </Dropdown>
        );

        expect(getByText('Trigger')).toBeDefined();
    });

    it('Does not render panel before trigger is clicked', () => {
        render(
            <Dropdown content={<span>Content</span>}>
                <button type="button">Trigger</button>
            </Dropdown>
        );

        expect(getPanel()).toBeNull();
    });

    it('Renders content in a portal after trigger click', () => {
        const { getByText } = render(
            <Dropdown content={<span>Panel content</span>}>
                <button type="button">Trigger</button>
            </Dropdown>
        );

        fireEvent.click(getByText('Trigger'));

        expect(getPanel()).not.toBeNull();
        expect(getByText('Panel content')).toBeDefined();
    });

    it('Marks the panel visible after the enter animation frame', () => {
        const { getByText } = render(
            <Dropdown content={<span>Content</span>}>
                <button type="button">Trigger</button>
            </Dropdown>
        );

        fireEvent.click(getByText('Trigger'));
        flushEnterAnimation();

        expect(getPanel()?.className).toContain('Dropdown__panel_visible');
    });

    it('Keeps the panel mounted until the exit transition ends, then removes it', () => {
        const { getByText } = render(
            <Dropdown content={<span>Content</span>}>
                <button type="button">Trigger</button>
            </Dropdown>
        );

        fireEvent.click(getByText('Trigger'));
        fireEvent.click(getByText('Trigger'));

        const panel = getPanel();
        expect(panel).not.toBeNull();
        expect(panel?.className).not.toContain('Dropdown__panel_visible');

        fireEvent.transitionEnd(panel as Element);

        expect(getPanel()).toBeNull();
    });

    it('Closes panel on outside click', () => {
        const { getByText } = render(
            <Dropdown content={<span>Content</span>}>
                <button type="button">Trigger</button>
            </Dropdown>
        );

        fireEvent.click(getByText('Trigger'));
        fireEvent.mouseDown(document.body);

        const panel = getPanel();
        expect(panel?.className).not.toContain('Dropdown__panel_visible');

        fireEvent.transitionEnd(panel as Element);

        expect(getPanel()).toBeNull();
    });

    it('Closes panel on Escape key', () => {
        const { getByText } = render(
            <Dropdown content={<span>Content</span>}>
                <button type="button">Trigger</button>
            </Dropdown>
        );

        fireEvent.click(getByText('Trigger'));
        fireEvent.keyDown(document, { key: 'Escape' });

        const panel = getPanel();
        fireEvent.transitionEnd(panel as Element);

        expect(getPanel()).toBeNull();
    });

    it('Calls onOpenChange with next open state', () => {
        let lastOpen: boolean | null = null;

        const { getByText } = render(
            <Dropdown content={<span>Content</span>} onOpenChange={(isOpen) => (lastOpen = isOpen)}>
                <button type="button">Trigger</button>
            </Dropdown>
        );

        fireEvent.click(getByText('Trigger'));

        expect(lastOpen).toBe(true);
    });

    it('Respects controlled isOpen prop', () => {
        render(
            <Dropdown content={<span>Content</span>} isOpen>
                <button type="button">Trigger</button>
            </Dropdown>
        );

        expect(getPanel()).not.toBeNull();
    });

    describe('click-only trigger mode (default)', () => {
        it('Does not open on hover', () => {
            const { container } = render(
                <Dropdown content={<span>Content</span>}>
                    <button type="button">Trigger</button>
                </Dropdown>
            );

            fireEvent.mouseEnter(getTrigger(container));

            expect(getPanel()).toBeNull();
        });
    });

    describe('hover trigger mode', () => {
        it('Opens on mouse enter', () => {
            const { container } = render(
                <Dropdown content={<span>Content</span>} triggerMode={['hover']}>
                    <button type="button">Trigger</button>
                </Dropdown>
            );

            fireEvent.mouseEnter(getTrigger(container));

            expect(getPanel()).not.toBeNull();
        });

        it('Does not open on click', () => {
            const { getByText } = render(
                <Dropdown content={<span>Content</span>} triggerMode={['hover']}>
                    <button type="button">Trigger</button>
                </Dropdown>
            );

            fireEvent.click(getByText('Trigger'));

            expect(getPanel()).toBeNull();
        });

        it('Closes after a delay once the mouse leaves the trigger', () => {
            const { container } = render(
                <Dropdown content={<span>Content</span>} triggerMode={['hover']}>
                    <button type="button">Trigger</button>
                </Dropdown>
            );
            const trigger = getTrigger(container);

            fireEvent.mouseEnter(trigger);
            flushEnterAnimation();
            expect(getPanel()?.className).toContain('Dropdown__panel_visible');

            fireEvent.mouseLeave(trigger);
            expect(getPanel()?.className).toContain('Dropdown__panel_visible');

            act(() => {
                rstest.advanceTimersByTime(150);
            });

            expect(getPanel()?.className).not.toContain('Dropdown__panel_visible');
        });

        it('Cancels the close when re-entering the trigger before the delay elapses', () => {
            const { container } = render(
                <Dropdown content={<span>Content</span>} triggerMode={['hover']}>
                    <button type="button">Trigger</button>
                </Dropdown>
            );
            const trigger = getTrigger(container);

            fireEvent.mouseEnter(trigger);
            flushEnterAnimation();

            fireEvent.mouseLeave(trigger);
            act(() => {
                rstest.advanceTimersByTime(100);
            });

            fireEvent.mouseEnter(trigger);
            act(() => {
                rstest.advanceTimersByTime(100);
            });

            expect(getPanel()?.className).toContain('Dropdown__panel_visible');
        });

        it('Stays open when the mouse moves from the trigger to the panel', () => {
            const { container } = render(
                <Dropdown content={<span>Panel content</span>} triggerMode={['hover']}>
                    <button type="button">Trigger</button>
                </Dropdown>
            );
            const trigger = getTrigger(container);

            fireEvent.mouseEnter(trigger);
            flushEnterAnimation();
            fireEvent.mouseLeave(trigger);

            fireEvent.mouseEnter(getPanel() as Element);

            act(() => {
                rstest.advanceTimersByTime(150);
            });

            expect(getPanel()?.className).toContain('Dropdown__panel_visible');
        });
    });

    describe('hover and click trigger mode', () => {
        it('Opens on hover', () => {
            const { container } = render(
                <Dropdown content={<span>Content</span>} triggerMode={['hover', 'click']}>
                    <button type="button">Trigger</button>
                </Dropdown>
            );

            fireEvent.mouseEnter(getTrigger(container));

            expect(getPanel()).not.toBeNull();
        });

        it('Also toggles on click', () => {
            const { getByText } = render(
                <Dropdown content={<span>Content</span>} triggerMode={['hover', 'click']}>
                    <button type="button">Trigger</button>
                </Dropdown>
            );

            fireEvent.click(getByText('Trigger'));

            expect(getPanel()).not.toBeNull();
        });
    });
});
