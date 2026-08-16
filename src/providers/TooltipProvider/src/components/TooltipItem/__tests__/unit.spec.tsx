import React from 'react';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';
import { fireEvent, render } from '@testing-library/react';

import type { TTooltipItem } from '../../../types';
import { TooltipItem } from '..';

describe('[UNIT] TooltipItem', () => {
    let trigger: HTMLDivElement;
    let mockItem: TTooltipItem;

    beforeEach(() => {
        trigger = document.createElement('div') as HTMLDivElement;
        document.body.appendChild(trigger);
        mockItem = {
            id: 'test-1',
            text: 'Test tooltip',
            position: 'top',
            trigger,
            size: 'md',
            type: 'default',
        };
    });

    afterEach(() => {
        if (trigger.parentNode) {
            trigger.parentNode.removeChild(trigger);
        }
    });

    it('Renders text content', () => {
        const { getByText } = render(
            <TooltipItem item={mockItem} isExiting={false} onRemove={() => {}} />
        );

        expect(getByText('Test tooltip')).toBeDefined();
    });

    it('Applies base TooltipItem class', () => {
        const { container } = render(
            <TooltipItem item={mockItem} isExiting={false} onRemove={() => {}} />
        );

        const el = container.firstChild as HTMLElement;

        expect(el.className).toContain('TooltipItem');
    });

    it('Applies size class TooltipItem__md', () => {
        const { container } = render(
            <TooltipItem item={mockItem} isExiting={false} onRemove={() => {}} />
        );

        const el = container.firstChild as HTMLElement;

        expect(el.className).toContain('TooltipItem__md');
    });

    it('Applies a position class', () => {
        const { container } = render(
            <TooltipItem item={mockItem} isExiting={false} onRemove={() => {}} />
        );

        const el = container.firstChild as HTMLElement;

        expect(el.className).toMatch(/TooltipItem__(top|bottom|left|right)/);
    });

    it('Applies type class TooltipItem__default by default', () => {
        const { container } = render(
            <TooltipItem item={mockItem} isExiting={false} onRemove={() => {}} />
        );

        const el = container.firstChild as HTMLElement;

        expect(el.className).toContain('TooltipItem__default');
    });

    it('Applies type class TooltipItem__error for error type', () => {
        const { container } = render(
            <TooltipItem
                item={{ ...mockItem, type: 'error' }}
                isExiting={false}
                onRemove={() => {}}
            />
        );

        const el = container.firstChild as HTMLElement;

        expect(el.className).toContain('TooltipItem__error');
    });

    it('Does not apply __visible class before requestAnimationFrame', () => {
        const { container } = render(
            <TooltipItem item={mockItem} isExiting={false} onRemove={() => {}} />
        );

        const el = container.firstChild as HTMLElement;

        expect(el.className).not.toContain('TooltipItem__visible');
    });

    it('Does not apply __visible class when isExiting is true', () => {
        const { container } = render(
            <TooltipItem item={mockItem} isExiting={true} onRemove={() => {}} />
        );

        const el = container.firstChild as HTMLElement;

        expect(el.className).not.toContain('TooltipItem__visible');
    });

    it('Calls onRemove with item id when isExiting is true and transitionEnd fires on self', () => {
        let removedId = '';
        const handleRemove = (id: string) => {
            removedId = id;
        };

        const { container } = render(
            <TooltipItem item={mockItem} isExiting={true} onRemove={handleRemove} />
        );

        const el = container.firstChild as HTMLElement;

        fireEvent.transitionEnd(el, { target: el, currentTarget: el });

        expect(removedId).toBe('test-1');
    });

    it('Does not call onRemove when isExiting is false', () => {
        let called = false;
        const handleRemove = () => {
            called = true;
        };

        const { container } = render(
            <TooltipItem item={mockItem} isExiting={false} onRemove={handleRemove} />
        );

        const el = container.firstChild as HTMLElement;

        fireEvent.transitionEnd(el, { target: el, currentTarget: el });

        expect(called).toBe(false);
    });

    it('Does not call onRemove when transitionEnd target is a child element', () => {
        let called = false;
        const handleRemove = () => {
            called = true;
        };

        const { container } = render(
            <TooltipItem item={mockItem} isExiting={true} onRemove={handleRemove} />
        );

        const el = container.firstChild as HTMLElement;
        const child = el.firstChild as HTMLElement;

        fireEvent.transitionEnd(el, { target: child, currentTarget: el });

        expect(called).toBe(false);
    });
});
