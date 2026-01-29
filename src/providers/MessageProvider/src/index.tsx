import cls from 'classnames/bind';
import React, { useCallback, useMemo, useReducer } from 'react';
import { createPortal } from 'react-dom';

import type { EType } from '@emingy/core/ui/Message/src/constants';

import { MessageItem } from './components/MessageItem';

import styles from './index.module.scss';

import { DEFAULT_POSITION, EActionType } from './constants';
import { MessageContext } from './context';
import type { TAction, TMessageConfig, TMessageItem, TProps } from './types';

const BLOCK_NAME = 'MessageContainer';
const cn = cls.bind(styles);

let messageCounter = 0;
const generateId = () => `msg-${++messageCounter}-${Date.now()}`;

const messagesReducer = (state: TMessageItem[], action: TAction): TMessageItem[] => {
    switch (action.type) {
        case EActionType.Add:
            return [...state, action.payload];
        case EActionType.Remove:
            return state.filter((msg) => msg.id !== action.payload);
        case EActionType.Clear:
            return [];
        default:
            return state;
    }
};

export const MessageProvider = ({ children, position = DEFAULT_POSITION, maxCount }: TProps) => {
    const [messages, dispatch] = useReducer(messagesReducer, []);

    const addMessage = useCallback((type: `${EType}`, config: TMessageConfig): string => {
        const id = generateId();

        dispatch({ type: EActionType.Add, payload: { ...config, id, type } });

        return id;
    }, []);

    const removeMessage = useCallback((id: string) => {
        dispatch({ type: EActionType.Remove, payload: id });
    }, []);

    const clearAll = useCallback(() => {
        dispatch({ type: EActionType.Clear });
    }, []);

    const contextValue = useMemo(
        () => ({ addMessage, removeMessage, clearAll }),
        [addMessage, removeMessage, clearAll]
    );

    const visibleMessages = maxCount ? messages.slice(-maxCount) : messages;

    return (
        <MessageContext.Provider value={contextValue}>
            {children}
            {typeof document !== 'undefined' &&
                createPortal(
                    <div className={cn(BLOCK_NAME, `${BLOCK_NAME}__${position}`)}>
                        {visibleMessages.map((item) => (
                            <MessageItem
                                key={item.id}
                                item={item}
                                position={position}
                                onRemove={removeMessage}
                            />
                        ))}
                    </div>,
                    document.body
                )}
        </MessageContext.Provider>
    );
};

export type TMessageProviderProps = TProps;
