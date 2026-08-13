import type { ElementType, HTMLAttributes, PropsWithChildren } from 'react';

import { EFlexAlign, EFlexDirection, EFlexGap, EFlexJustify } from './constants';

export type TProps = PropsWithChildren<{
    className?: string;
    direction?: `${EFlexDirection}`;
    justify?: `${EFlexJustify}`;
    align?: `${EFlexAlign}`;
    gap?: `${EFlexGap}`;
    inline?: boolean;
    wrap?: boolean;
    elementType?: ElementType;
}> &
    HTMLAttributes<HTMLDivElement>;
