import cls from 'classnames/bind';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Message } from '@emingy/core/ui/Message';

import { DEFAULT_DURATION } from '../../constants';

import styles from './index.module.scss';

import { EAnimationState } from './constants';
import type { TProps } from './types';

const BLOCK_NAME = 'MessageItem';
const cn = cls.bind(styles);

export const MessageItem = ({ item, position, onRemove }: TProps) => {
    const [animationState, setAnimationState] = useState<EAnimationState>(EAnimationState.Entering);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startTimeRef = useRef<number>(0);
    const remainingRef = useRef<number>(item.duration ?? DEFAULT_DURATION);

    const isTop = position.startsWith('top');

    const clearTimer = useCallback(() => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const startExit = useCallback(() => {
        setAnimationState(EAnimationState.Exiting);
    }, []);

    const startTimer = useCallback(() => {
        const duration = remainingRef.current;

        if (duration <= 0) return;

        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(startExit, duration);
    }, [startExit]);

    useEffect(() => {
        const frameId = requestAnimationFrame(() => {
            setAnimationState(EAnimationState.Visible);
        });

        return () => cancelAnimationFrame(frameId);
    }, []);

    useEffect(() => {
        if (animationState === EAnimationState.Visible) {
            startTimer();
        }

        return clearTimer;
    }, [animationState, startTimer, clearTimer]);

    const handleMouseEnter = useCallback(() => {
        clearTimer();
        const elapsed = Date.now() - startTimeRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
    }, [clearTimer]);

    const handleMouseLeave = useCallback(() => {
        startTimer();
    }, [startTimer]);

    const handleCloseClick = useCallback(() => {
        clearTimer();
        startExit();
    }, [clearTimer, startExit]);

    const handleTransitionEnd = useCallback(
        (e: React.TransitionEvent) => {
            if (e.target !== e.currentTarget) return;

            if (animationState === EAnimationState.Exiting) {
                onRemove(item.id);
            }
        },
        [animationState, item.id, onRemove]
    );

    return (
        <div
            className={cn(BLOCK_NAME, {
                [`${BLOCK_NAME}__entering`]: animationState === EAnimationState.Entering,
                [`${BLOCK_NAME}__visible`]: animationState === EAnimationState.Visible,
                [`${BLOCK_NAME}__exiting`]: animationState === EAnimationState.Exiting,
                [`${BLOCK_NAME}__from-top`]: isTop,
                [`${BLOCK_NAME}__from-bottom`]: !isTop,
            })}
            onTransitionEnd={handleTransitionEnd}
        >
            <Message
                type={item.type}
                title={item.title}
                onCloseClick={handleCloseClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {item.content}
            </Message>
        </div>
    );
};

export type TMessageItemProps = TProps;
