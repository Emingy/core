import type { PropsWithChildren } from 'react';
import React from 'react';

import { MessageProvider } from '@emingy/core/providers/MessageProvider';
import { TooltipProvider } from '@emingy/core/providers/TooltipProvider';

import './index.module.scss';

import type { TProps } from './types';

export const AppProvider = ({ children, messageContextConfig }: PropsWithChildren<TProps>) => {
    return (
        <TooltipProvider>
            <MessageProvider {...messageContextConfig}>{children}</MessageProvider>
        </TooltipProvider>
    );
};

export type TAppProviderProps = TProps;
