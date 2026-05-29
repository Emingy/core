import type { PropsWithChildren } from 'react';

import type { TTooltipParams } from '@emingy/core/providers/TooltipProvider/src/types';

export type TProps = PropsWithChildren<
    Omit<TTooltipParams, 'trigger' | 'id'> & {
        disabled?: boolean;
    }
>;
