import { createContext } from 'react';

import type { TTooltipContext } from './types';

export const TooltipContext = createContext<TTooltipContext | null>(null);
