import type { PropsWithChildren, ReactNode } from 'react';

import type { EType } from './constants';

export type TProps = PropsWithChildren<{
    id?: string;
    type?: `${EType}`;
    isSelected?: boolean;
    onSelect?: VoidFunction;
    isDisabled?: boolean;
    className?: string;
    prefix?: ReactNode;
    description?: string;
}>;
