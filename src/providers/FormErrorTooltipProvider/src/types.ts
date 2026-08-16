import type { PropsWithChildren } from 'react';

export type TFieldError = {
    message: string;
    element: HTMLElement;
};

export type TFormErrorTooltipContext = {
    registerFieldError: (id: string, error: TFieldError) => void;
    unregisterFieldError: (id: string) => void;
};

export type TProps = PropsWithChildren;
