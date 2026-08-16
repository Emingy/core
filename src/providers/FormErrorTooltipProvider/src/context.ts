import { createContext } from 'react';

import type { TFormErrorTooltipContext } from './types';

export const FormErrorTooltipContext = createContext<TFormErrorTooltipContext | null>(null);
