import { type RefObject, useContext, useEffect } from 'react';

import { FormErrorTooltipContext } from '../../context';

export const useRegisterFieldError = (
    id: string,
    message: string | undefined,
    elementRef: RefObject<HTMLElement | null>
) => {
    const context = useContext(FormErrorTooltipContext);

    useEffect(() => {
        if (!context) return;

        if (message && elementRef.current) {
            context.registerFieldError(id, { message, element: elementRef.current });
        } else {
            context.unregisterFieldError(id);
        }

        return () => context.unregisterFieldError(id);
    }, [context, id, message]);
};
