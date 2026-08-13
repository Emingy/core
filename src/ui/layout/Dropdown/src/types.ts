import type { CSSProperties, HTMLAttributes, PropsWithChildren, ReactNode, RefObject } from 'react';

import type { EDirection, ETriggerMode } from './constants';

type TPropsCommon = {
    className?: string;
    direction?: `${EDirection}`;
    triggerMode?: `${ETriggerMode}`[];
    containerRef?: RefObject<HTMLElement | null>;
    maxHeight?: CSSProperties['maxHeight'];
    content: ReactNode | ((panelRef: RefObject<HTMLElement | null>) => ReactNode);
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
};

export type TProps = PropsWithChildren<TPropsCommon> &
    Omit<HTMLAttributes<HTMLDivElement>, 'content'>;
