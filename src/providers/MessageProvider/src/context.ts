import { createContext } from 'react';

import type { TMessageContext } from './types.js';

export const MessageContext = createContext<TMessageContext | null>(null);
