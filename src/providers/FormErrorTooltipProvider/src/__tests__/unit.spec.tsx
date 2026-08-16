import React, { useRef } from 'react';

import { TooltipContext } from '@emingy/core/providers/TooltipProvider';
import type { TTooltipParams } from '@emingy/core/providers/TooltipProvider/src/types';
import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { FormErrorTooltipProvider, useRegisterFieldError } from '..';

const TestField = ({ id, message }: { id: string; message: string | undefined }) => {
    const ref = useRef<HTMLInputElement>(null);
    useRegisterFieldError(id, message, ref);

    return <input ref={ref} data-testid={id} />;
};

const renderWithTooltipContext = (
    ui: React.ReactElement,
    showTooltip: (params: TTooltipParams) => void = () => {},
    hideTooltip: (id: string) => void = () => {}
) => {
    return render(
        <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
            <FormErrorTooltipProvider>{ui}</FormErrorTooltipProvider>
        </TooltipContext.Provider>
    );
};

describe('[UNIT] FormErrorTooltipProvider', () => {
    it('Renders children', () => {
        const { getByTestId } = renderWithTooltipContext(<div data-testid="child">Hello</div>);

        expect(getByTestId('child')).toBeDefined();
    });

    it('Calls showTooltip with the message of the only errored field', () => {
        const calls: TTooltipParams[] = [];

        renderWithTooltipContext(<TestField id="a" message="Required" />, (params) =>
            calls.push(params)
        );

        expect(calls.at(-1)?.text).toBe('Required');
    });

    it('Shows the tooltip over the first field in DOM order', () => {
        const calls: TTooltipParams[] = [];

        renderWithTooltipContext(
            <>
                <TestField id="a" message="Error A" />
                <TestField id="b" message="Error B" />
            </>,
            (params) => calls.push(params)
        );

        expect(calls.at(-1)?.text).toBe('Error A');
    });

    it('Ignores fields without an error', () => {
        const calls: TTooltipParams[] = [];

        renderWithTooltipContext(
            <>
                <TestField id="a" message={undefined} />
                <TestField id="b" message="Error B" />
            </>,
            (params) => calls.push(params)
        );

        expect(calls.at(-1)?.text).toBe('Error B');
    });

    it('Moves the tooltip to the new first field once the earlier one clears', () => {
        const calls: TTooltipParams[] = [];
        const showTooltip = (params: TTooltipParams) => calls.push(params);

        const { rerender } = render(
            <TooltipContext.Provider value={{ showTooltip, hideTooltip: () => {} }}>
                <FormErrorTooltipProvider>
                    <TestField id="a" message="Error A" />
                    <TestField id="b" message="Error B" />
                </FormErrorTooltipProvider>
            </TooltipContext.Provider>
        );

        rerender(
            <TooltipContext.Provider value={{ showTooltip, hideTooltip: () => {} }}>
                <FormErrorTooltipProvider>
                    <TestField id="a" message={undefined} />
                    <TestField id="b" message="Error B" />
                </FormErrorTooltipProvider>
            </TooltipContext.Provider>
        );

        expect(calls.at(-1)?.text).toBe('Error B');
    });

    it('Calls hideTooltip once there are no more errors', () => {
        const hidden: string[] = [];
        const hideTooltip = (id: string) => hidden.push(id);

        const { rerender } = render(
            <TooltipContext.Provider value={{ showTooltip: () => {}, hideTooltip }}>
                <FormErrorTooltipProvider>
                    <TestField id="a" message="Error A" />
                </FormErrorTooltipProvider>
            </TooltipContext.Provider>
        );

        rerender(
            <TooltipContext.Provider value={{ showTooltip: () => {}, hideTooltip }}>
                <FormErrorTooltipProvider>
                    <TestField id="a" message={undefined} />
                </FormErrorTooltipProvider>
            </TooltipContext.Provider>
        );

        expect(hidden.length).toBeGreaterThan(0);
    });

    it('Always shows the tooltip above the field (position "top")', () => {
        const calls: TTooltipParams[] = [];

        renderWithTooltipContext(<TestField id="a" message="Error A" />, (params) =>
            calls.push(params)
        );

        expect(calls.at(-1)?.position).toBe('top');
    });

    it('Always shows the tooltip with the "error" type', () => {
        const calls: TTooltipParams[] = [];

        renderWithTooltipContext(<TestField id="a" message="Error A" />, (params) =>
            calls.push(params)
        );

        expect(calls.at(-1)?.type).toBe('error');
    });

    it('Throws when used outside a TooltipProvider', () => {
        const originalError = console.error;
        console.error = () => {};

        expect(() =>
            render(<FormErrorTooltipProvider>content</FormErrorTooltipProvider>)
        ).toThrow();

        console.error = originalError;
    });
});
