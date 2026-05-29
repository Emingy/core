import { createContext } from 'react';

import type { TMessageContext } from './types';

export const MessageContext = createContext<TMessageContext | null>(null);
