import type { PropsWithChildren } from 'react';
import React from 'react';

import { MessageProvider } from '@emingy/core/providers/MessageProvider';

import './index.module.scss';

import type { TProps } from './types';

export const AppProvider = ({ children, messageContextConfig }: PropsWithChildren<TProps>) => {
    return <MessageProvider {...messageContextConfig}>{children}</MessageProvider>;
};

export type TAppProviderProps = TProps;
