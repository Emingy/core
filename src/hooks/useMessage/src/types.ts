import type { TMessageConfig } from '@emingy/core/providers/MessageProvider/src/types';

export type TUseMessageReturn = {
    success: (config: TMessageConfig) => string;
    warning: (config: TMessageConfig) => string;
    error: (config: TMessageConfig) => string;
    close: (id: string) => void;
    closeAll: () => void;
};
