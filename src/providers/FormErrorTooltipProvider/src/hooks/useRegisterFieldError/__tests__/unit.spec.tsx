import React, { useRef } from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { FormErrorTooltipContext } from '../../../context';
import type { TFieldError } from '../../../types';
import { useRegisterFieldError } from '..';

const TestField = ({ id, message }: { id: string; message: string | undefined }) => {
    const ref = useRef<HTMLInputElement>(null);
    useRegisterFieldError(id, message, ref);

    return <input ref={ref} />;
};

const renderWithContext = (
    ui: React.ReactElement,
    registerFieldError: (id: string, error: TFieldError) => void = () => {},
    unregisterFieldError: (id: string) => void = () => {}
) => {
    return render(
        <FormErrorTooltipContext.Provider value={{ registerFieldError, unregisterFieldError }}>
            {ui}
        </FormErrorTooltipContext.Provider>
    );
};

describe('[UNIT] useRegisterFieldError', () => {
    it('Does nothing when there is no context', () => {
        expect(() => render(<TestField id="a" message="Error" />)).not.toThrow();
    });

    it('Registers the field when a message is provided', () => {
        const registered: Array<[string, TFieldError]> = [];

        renderWithContext(<TestField id="a" message="Required" />, (id, error) => {
            registered.push([id, error]);
        });

        expect(registered).toHaveLength(1);
        expect(registered[0][0]).toBe('a');
        expect(registered[0][1].message).toBe('Required');
        expect(registered[0][1].element).toBeInstanceOf(HTMLInputElement);
    });

    it('Does not register when message is undefined', () => {
        let registerCount = 0;

        renderWithContext(<TestField id="a" message={undefined} />, () => {
            registerCount++;
        });

        expect(registerCount).toBe(0);
    });

    it('Unregisters when message changes to undefined', () => {
        const unregistered: string[] = [];

        const { rerender } = renderWithContext(
            <FormErrorTooltipContext.Provider
                value={{
                    registerFieldError: () => {},
                    unregisterFieldError: (id) => unregistered.push(id),
                }}
            >
                <TestField id="a" message="Required" />
            </FormErrorTooltipContext.Provider>
        );

        rerender(
            <FormErrorTooltipContext.Provider
                value={{
                    registerFieldError: () => {},
                    unregisterFieldError: (id) => unregistered.push(id),
                }}
            >
                <TestField id="a" message={undefined} />
            </FormErrorTooltipContext.Provider>
        );

        expect(unregistered).toContain('a');
    });

    it('Unregisters on unmount', () => {
        const unregistered: string[] = [];

        const { unmount } = renderWithContext(
            <TestField id="a" message="Required" />,
            () => {},
            (id) => unregistered.push(id)
        );

        unmount();

        expect(unregistered).toContain('a');
    });
});
