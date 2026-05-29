import type { PropsWithChildren, ReactNode } from 'react';

import type { EMessageType } from '@emingy/core/ui/dataDisplay/Message';

import type { EActionType, EMessagePosition } from './constants';

export type TMessageConfig = {
    title?: string;
    content: ReactNode;
    duration?: number;
};

export type TMessageItem = TMessageConfig & {
    id: string;
    type: `${EMessageType}`;
};

export type TMessageContext = {
    addMessage: (type: `${EMessageType}`, config: TMessageConfig) => string;
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
