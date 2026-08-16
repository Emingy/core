import type { PropsWithChildren, ReactNode } from 'react';

import type { EActionType, EPosition, ESize, EType } from './constants';

export type TTooltipContext = {
    showTooltip: (props: TTooltipParams) => void;
    hideTooltip: (id: TTooltipParams['id']) => void;
};

export type TProps = PropsWithChildren;

export type TTooltipParams = {
    id: string;
    text: ReactNode;
    trigger: HTMLElement;
    position?: `${EPosition}`;
    size?: `${ESize}`;
    type?: `${EType}`;
};

export type TTooltipItem = {
    id: string;
    text: ReactNode;
    position: `${EPosition}`;
    trigger: HTMLElement;
    size: `${ESize}`;
    type: `${EType}`;
};

export type TAction =
    | { type: `${EActionType.Add}`; payload: TTooltipItem }
    | { type: `${EActionType.Remove}`; payload: string };
