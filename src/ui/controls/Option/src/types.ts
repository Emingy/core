import type { PropsWithChildren, ReactNode } from 'react';

export type TProps = PropsWithChildren<{
    id?: string;
    isSelected?: boolean;
    onSelect?: VoidFunction;
    isDisabled?: boolean;
    className?: string;
    prefix?: ReactNode;
    description?: string;
}>;
