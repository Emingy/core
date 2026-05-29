import React from 'react';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';
import { act, render } from '@testing-library/react';

import { TooltipProvider, useTooltipContext } from '..';

const TestConsumer = ({
    onMount,
}: {
    onMount?: (ctx: ReturnType<typeof useTooltipContext>) => void;
}) => {
    const ctx = useTooltipContext();

    React.useEffect(() => {
        onMount?.(ctx);
    }, []);

    return null;
};

describe('[UNIT] TooltipProvider', () => {
    let trigger: HTMLDivElement;

    beforeEach(() => {
        trigger = document.createElement('div') as HTMLDivElement;
        document.body.appendChild(trigger);
    });

    afterEach(() => {
        if (trigger.parentNode) {
            trigger.parentNode.removeChild(trigger);
        }
    });

    it('Renders children', () => {
        const { getByTestId } = render(
            <TooltipProvider>
                <div data-testid="child">Hello</div>
            </TooltipProvider>
        );

        expect(getByTestId('child')).toBeDefined();
    });

    it('Renders portal container in document.body with class TooltipContainer', () => {
        render(
            <TooltipProvider>
                <div>Content</div>
            </TooltipProvider>
        );

        const container = document.body.querySelector('[class*="TooltipContainer"]');

        expect(container).toBeDefined();
        expect(container).not.toBeNull();
    });

    it('showTooltip adds tooltip text to DOM', () => {
        let ctx: ReturnType<typeof useTooltipContext>;

        render(
            <TooltipProvider>
                <TestConsumer
                    onMount={(c) => {
                        ctx = c;
                    }}
                />
            </TooltipProvider>
        );

        act(() => {
            ctx!.showTooltip({ id: 'tip-1', text: 'Hello tooltip', trigger });
        });

        const tooltipContainer = document.body.querySelector('[class*="TooltipContainer"]');

        expect(tooltipContainer?.textContent).toContain('Hello tooltip');
    });

    it('hideTooltip keeps tooltip in DOM (waits for transition)', () => {
        let ctx: ReturnType<typeof useTooltipContext>;

        render(
            <TooltipProvider>
                <TestConsumer
                    onMount={(c) => {
                        ctx = c;
                    }}
                />
            </TooltipProvider>
        );

        act(() => {
            ctx!.showTooltip({ id: 'tip-2', text: 'Still here', trigger });
        });

        act(() => {
            ctx!.hideTooltip('tip-2');
        });

        const tooltipContainer = document.body.querySelector('[class*="TooltipContainer"]');

        expect(tooltipContainer?.textContent).toContain('Still here');
    });

    it('showTooltip cancels exit for same id', () => {
        let ctx: ReturnType<typeof useTooltipContext>;

        const { container } = render(
            <TooltipProvider>
                <TestConsumer
                    onMount={(c) => {
                        ctx = c;
                    }}
                />
            </TooltipProvider>
        );

        act(() => {
            ctx!.showTooltip({ id: 'tip-3', text: 'Reappearing tooltip', trigger });
        });

        act(() => {
            ctx!.hideTooltip('tip-3');
        });

        act(() => {
            ctx!.showTooltip({ id: 'tip-3', text: 'Reappearing tooltip', trigger });
        });

        const tooltipContainer = document.body.querySelector('[class*="TooltipContainer"]');

        expect(tooltipContainer?.textContent).toContain('Reappearing tooltip');

        // Suppress unused warning
        void container;
    });

    it('useTooltipContext throws when used outside provider', () => {
        const originalError = console.error;
        console.error = () => {};

        const ThrowingComponent = () => {
            useTooltipContext();
            return null;
        };

        expect(() => render(<ThrowingComponent />)).toThrow();

        console.error = originalError;
    });
});
