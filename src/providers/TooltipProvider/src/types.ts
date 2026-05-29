import type { PropsWithChildren } from 'react';

import type { EActionType, EPosition, ESize } from './constants';

export type TTooltipContext = {
    showTooltip: (props: TTooltipParams) => void;
    hideTooltip: (id: TTooltipParams['id']) => void;
};

export type TProps = PropsWithChildren;

export type TTooltipParams = {
    id: string;
    text: string;
    trigger: HTMLDivElement;
    position?: `${EPosition}`;
    size?: `${ESize}`;
};

export type TTooltipItem = {
    id: string;
    text: string;
    position: `${EPosition}`;
    trigger: HTMLDivElement;
    size: `${ESize}`;
};

export type TAction =
    | { type: `${EActionType.Add}`; payload: TTooltipItem }
    | { type: `${EActionType.Remove}`; payload: string };
