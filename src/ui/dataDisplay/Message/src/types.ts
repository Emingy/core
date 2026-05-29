import type { MouseEventHandler, PropsWithChildren } from 'react';

import type { TButtonProps } from '@emingy/core/ui/controls/Button';

import type { EType } from './constants';

export type TProps = PropsWithChildren<{
    type: `${EType}`;
    title?: string;
    className?: string;
    onCloseClick?: TButtonProps['onClick'];
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}>;
