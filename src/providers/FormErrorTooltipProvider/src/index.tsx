import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';

import { useTooltipContext } from '@emingy/core/providers/TooltipProvider';

import { findFirstFieldError } from './utils/findFirstFieldError';

import { FormErrorTooltipContext } from './context';
import type { TFieldError, TProps } from './types';

export const FormErrorTooltipProvider = ({ children }: TProps) => {
    const { showTooltip, hideTooltip } = useTooltipContext();
    const id = useId();
    const [fields, setFields] = useState<Map<string, TFieldError>>(new Map());

    const registerFieldError = useCallback((fieldId: string, error: TFieldError) => {
        setFields((prev) => {
            const next = new Map(prev);
            next.set(fieldId, error);
            return next;
        });
    }, []);

    const unregisterFieldError = useCallback((fieldId: string) => {
        setFields((prev) => {
            if (!prev.has(fieldId)) return prev;
            const next = new Map(prev);
            next.delete(fieldId);
            return next;
        });
    }, []);

    const contextValue = useMemo(
        () => ({ registerFieldError, unregisterFieldError }),
        [registerFieldError, unregisterFieldError]
    );

    useEffect(() => {
        const first = findFirstFieldError(fields);

        if (!first) {
            hideTooltip(id);
            return;
        }

        const [, { message, element }] = first;

        showTooltip({ id, text: message, trigger: element, position: 'top', type: 'error' });

        return () => hideTooltip(id);
    }, [fields]);

    return (
        <FormErrorTooltipContext.Provider value={contextValue}>
            {children}
        </FormErrorTooltipContext.Provider>
    );
};

export type TFormErrorTooltipProviderProps = TProps;
export { FormErrorTooltipContext };
export { useRegisterFieldError } from './hooks/useRegisterFieldError';
export type { TFieldError, TFormErrorTooltipContext } from './types';
