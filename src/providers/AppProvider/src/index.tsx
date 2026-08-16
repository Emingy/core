import type { PropsWithChildren } from 'react';
import React from 'react';

import { FormErrorTooltipProvider } from '@emingy/core/providers/FormErrorTooltipProvider';
import { MessageProvider } from '@emingy/core/providers/MessageProvider';
import { TooltipProvider } from '@emingy/core/providers/TooltipProvider';

import './index.module.scss';

import type { TProps } from './types';

export const AppProvider = ({ children, messageContextConfig }: PropsWithChildren<TProps>) => {
    return (
        <TooltipProvider>
            <FormErrorTooltipProvider>
                <MessageProvider {...messageContextConfig}>{children}</MessageProvider>
            </FormErrorTooltipProvider>
        </TooltipProvider>
    );
};

export type TAppProviderProps = TProps;
