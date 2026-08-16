import cls from 'classnames/bind';
import React, { useContext, useReducer, useState } from 'react';
import { createPortal } from 'react-dom';

import { TooltipItem } from './components/TooltipItem';

import styles from './index.module.scss';

import {
    DEFAULT_POSITION,
    DEFAULT_SIZE,
    DEFAULT_TYPE,
    EActionType,
    type EPosition,
    type ESize,
    type EType,
} from './constants';
import { TooltipContext } from './context';
import type { TAction, TProps, TTooltipContext, TTooltipItem, TTooltipParams } from './types';

const BLOCK_NAME = 'TooltipContainer';
const cn = cls.bind(styles);

const tooltipReducer = (
    state: Map<TTooltipItem['id'], TTooltipItem>,
    action: TAction
): Map<TTooltipItem['id'], TTooltipItem> => {
    switch (action.type) {
        case EActionType.Add: {
            const next = new Map(state);

            next.set(action.payload.id, action.payload);

            return next;
        }

        case EActionType.Remove: {
            const next = new Map(state);

            next.delete(action.payload);

            return next;
        }

        default:
            return state;
    }
};

export const TooltipProvider = ({ children }: TProps) => {
    const [tooltips, dispatch] = useReducer(tooltipReducer, new Map());
    const [exitingIds, setExitingIds] = useState<Set<string>>(new Set());

    const showTooltip = (props: TTooltipParams) => {
        setExitingIds((prev) => {
            if (!prev.has(props.id)) return prev;
            const next = new Set(prev);
            next.delete(props.id);
            return next;
        });
        dispatch({
            type: EActionType.Add,
            payload: {
                ...props,
                size: props.size ?? DEFAULT_SIZE,
                position: props.position ?? DEFAULT_POSITION,
                type: props.type ?? DEFAULT_TYPE,
            },
        });
    };

    const hideTooltip = (id: TTooltipParams['id']) => {
        setExitingIds((prev) => new Set(prev).add(id));
    };

    const handleRemove = (id: string) => {
        dispatch({ type: EActionType.Remove, payload: id });
        setExitingIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    };

    return (
        <TooltipContext.Provider
            value={{
                showTooltip,
                hideTooltip,
            }}
        >
            {children}
            {typeof document !== 'undefined' &&
                createPortal(
                    <div className={cn(BLOCK_NAME)}>
                        {[...tooltips.values()].map((item) => (
                            <TooltipItem
                                key={item.id}
                                item={item}
                                isExiting={exitingIds.has(item.id)}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>,
                    document.body
                )}
        </TooltipContext.Provider>
    );
};

export const useTooltipContext = () => {
    const context = useContext(TooltipContext);

    if (!context) {
        throw new Error(
            'useTooltipContext must be used within a TooltipProvider. Wrap your app with <AppProvider> or <TooltipProvider>.'
        );
    }

    return context;
};

export { TooltipContext };
export type {
    EPosition as ETooltipPosition,
    ESize as ETooltipSize,
    EType as ETooltipType,
    TTooltipContext,
    TProps as TTooltipProviderProps,
};
