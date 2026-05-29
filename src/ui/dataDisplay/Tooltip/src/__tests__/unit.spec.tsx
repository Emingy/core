import React from 'react';

import { TooltipContext } from '@emingy/core/providers/TooltipProvider';
import type { TTooltipParams } from '@emingy/core/providers/TooltipProvider/src/types';
import { describe, expect, it } from '@rstest/core';
import { fireEvent, render } from '@testing-library/react';

import { Tooltip } from '..';

const renderWithContext = (
    ui: React.ReactElement,
    showTooltip: (props: TTooltipParams) => void = () => {},
    hideTooltip: (id: string) => void = () => {}
) => {
    return render(
        <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>{ui}</TooltipContext.Provider>
    );
};

describe('[UNIT] Tooltip', () => {
    it('Renders children', () => {
        const { getByText } = renderWithContext(
            <Tooltip text="Hint" position="top">
                <span>Hover me</span>
            </Tooltip>
        );

        expect(getByText('Hover me')).toBeDefined();
    });

    it('Renders trigger wrapper div', () => {
        const { container } = renderWithContext(
            <Tooltip text="Hint" position="top">
                <span>Content</span>
            </Tooltip>
        );

        const trigger = container.querySelector('div');

        expect(trigger).not.toBeNull();
        expect(trigger?.className).toContain('Tooltip__trigger');
    });

    it('Calls showTooltip with text on mouseenter', () => {
        let capturedText = '';
        const handleShow = (props: TTooltipParams) => {
            capturedText = props.text;
        };

        const { container } = renderWithContext(
            <Tooltip text="My tooltip" position="top">
                <span>Hover</span>
            </Tooltip>,
            handleShow
        );

        const trigger = container.querySelector('div');

        if (trigger) {
            fireEvent.mouseEnter(trigger);
        }

        expect(capturedText).toBe('My tooltip');
    });

    it('Calls showTooltip with correct position on mouseenter', () => {
        let capturedPosition = '';
        const handleShow = (props: TTooltipParams) => {
            capturedPosition = props.position ?? '';
        };

        const { container } = renderWithContext(
            <Tooltip text="Hint" position="bottom">
                <span>Hover</span>
            </Tooltip>,
            handleShow
        );

        const trigger = container.querySelector('div');

        if (trigger) {
            fireEvent.mouseEnter(trigger);
        }

        expect(capturedPosition).toBe('bottom');
    });

    it('Calls showTooltip with trigger element on mouseenter', () => {
        let capturedTrigger: HTMLElement | null = null;
        const handleShow = (props: TTooltipParams) => {
            capturedTrigger = props.trigger;
        };

        const { container } = renderWithContext(
            <Tooltip text="Hint" position="top">
                <span>Hover</span>
            </Tooltip>,
            handleShow
        );

        const trigger = container.querySelector('div');

        if (trigger) {
            fireEvent.mouseEnter(trigger);
        }

        expect(capturedTrigger).toBe(trigger);
    });

    it('Calls showTooltip with stable id on repeated mouseenter', () => {
        const capturedIds: string[] = [];
        const handleShow = (props: TTooltipParams) => {
            capturedIds.push(props.id);
        };

        const { container } = renderWithContext(
            <Tooltip text="Hint" position="top">
                <span>Hover</span>
            </Tooltip>,
            handleShow
        );

        const trigger = container.querySelector('div');

        if (trigger) {
            fireEvent.mouseEnter(trigger);
            fireEvent.mouseEnter(trigger);
        }

        expect(capturedIds[0]).toBe(capturedIds[1]);
    });

    it('Calls hideTooltip with same id on mouseleave', () => {
        let showId = '';
        let hideId = '';

        const handleShow = (props: TTooltipParams) => {
            showId = props.id;
        };
        const handleHide = (id: string) => {
            hideId = id;
        };

        const { container } = renderWithContext(
            <Tooltip text="Hint" position="top">
                <span>Hover</span>
            </Tooltip>,
            handleShow,
            handleHide
        );

        const trigger = container.querySelector('div');

        if (trigger) {
            fireEvent.mouseEnter(trigger);
            fireEvent.mouseLeave(trigger);
        }

        expect(hideId).toBe(showId);
    });

    it('Does not call showTooltip on mouseleave', () => {
        let showCallCount = 0;
        const handleShow = () => {
            showCallCount++;
        };

        const { container } = renderWithContext(
            <Tooltip text="Hint" position="top">
                <span>Hover</span>
            </Tooltip>,
            handleShow
        );

        const trigger = container.querySelector('div');

        if (trigger) {
            fireEvent.mouseLeave(trigger);
        }

        expect(showCallCount).toBe(0);
    });
});
