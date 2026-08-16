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

    describe('controlled via the visible prop', () => {
        it('calls showTooltip on mount when visible is true', () => {
            let showCallCount = 0;
            const handleShow = () => {
                showCallCount++;
            };

            renderWithContext(
                <Tooltip text="Hint" position="top" visible>
                    <span>Content</span>
                </Tooltip>,
                handleShow
            );

            expect(showCallCount).toBe(1);
        });

        it('does not call showTooltip on mount when visible is false', () => {
            let showCallCount = 0;
            const handleShow = () => {
                showCallCount++;
            };

            renderWithContext(
                <Tooltip text="Hint" position="top" visible={false}>
                    <span>Content</span>
                </Tooltip>,
                handleShow
            );

            expect(showCallCount).toBe(0);
        });

        it('calls hideTooltip when visible changes from true to false', () => {
            let hideCallCount = 0;
            const handleHide = () => {
                hideCallCount++;
            };

            const { rerender } = renderWithContext(
                <Tooltip text="Hint" position="top" visible>
                    <span>Content</span>
                </Tooltip>,
                undefined,
                handleHide
            );

            rerender(
                <TooltipContext.Provider value={{ showTooltip: () => {}, hideTooltip: handleHide }}>
                    <Tooltip text="Hint" position="top" visible={false}>
                        <span>Content</span>
                    </Tooltip>
                </TooltipContext.Provider>
            );

            expect(hideCallCount).toBeGreaterThan(0);
        });

        it('calls hideTooltip on unmount', () => {
            let hideCallCount = 0;
            const handleHide = () => {
                hideCallCount++;
            };

            const { unmount } = renderWithContext(
                <Tooltip text="Hint" position="top" visible>
                    <span>Content</span>
                </Tooltip>,
                undefined,
                handleHide
            );

            unmount();

            expect(hideCallCount).toBeGreaterThan(0);
        });

        it('ignores mouseenter and stays controlled by the visible prop', () => {
            let showCallCount = 0;
            const handleShow = () => {
                showCallCount++;
            };

            const { container } = renderWithContext(
                <Tooltip text="Hint" position="top" visible={false}>
                    <span>Content</span>
                </Tooltip>,
                handleShow
            );

            const trigger = container.querySelector('div');

            if (trigger) {
                fireEvent.mouseEnter(trigger);
            }

            expect(showCallCount).toBe(0);
        });

        it('ignores mouseleave and stays controlled by the visible prop', () => {
            let hideCallCount = 0;
            const handleHide = () => {
                hideCallCount++;
            };

            const { container } = renderWithContext(
                <Tooltip text="Hint" position="top" visible>
                    <span>Content</span>
                </Tooltip>,
                undefined,
                handleHide
            );
            hideCallCount = 0;

            const trigger = container.querySelector('div');

            if (trigger) {
                fireEvent.mouseLeave(trigger);
            }

            expect(hideCallCount).toBe(0);
        });

        it('does not show when disabled even if visible is true', () => {
            let showCallCount = 0;
            const handleShow = () => {
                showCallCount++;
            };

            renderWithContext(
                <Tooltip text="Hint" position="top" visible disabled>
                    <span>Content</span>
                </Tooltip>,
                handleShow
            );

            expect(showCallCount).toBe(0);
        });
    });
});
