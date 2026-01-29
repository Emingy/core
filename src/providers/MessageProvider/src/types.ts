import type { PropsWithChildren, ReactNode } from 'react';

import type { EType } from '@emingy/core/ui/Message/src/constants';

import type { EActionType, EMessagePosition } from './constants';

export type TMessageConfig = {
    title?: string;
    content: ReactNode;
    duration?: number;
};

export type TMessageItem = TMessageConfig & {
    id: string;
    type: `${EType}`;
};

export type TMessageContext = {
    addMessage: (type: `${EType}`, config: TMessageConfig) => string;
    removeMessage: (id: string) => void;
    clearAll: () => void;
};

export type TProps = PropsWithChildren<{
    position?: `${EMessagePosition}`;
    maxCount?: number;
}>;

export type TAction =
    | { type: `${EActionType.Add}`; payload: TMessageItem }
    | { type: `${EActionType.Remove}`; payload: string }
    | { type: `${EActionType.Clear}` };
