import { useContext, useMemo } from 'react';

import { MessageContext } from '@emingy/core/providers/MessageProvider/src/context';
import { EType } from '@emingy/core/ui/Message/src/constants';

import type { TUseMessageReturn } from './types.ts';

export const useMessage = (): TUseMessageReturn => {
    const context = useContext(MessageContext);

    if (!context) {
        throw new Error(
            'useMessage must be used within a MessageProvider. Wrap your app with <AppProvider> or <MessageProvider>.'
        );
    }

    return useMemo<TUseMessageReturn>(
        () => ({
            success: (config) => context.addMessage(EType.Success, config),
            warning: (config) => context.addMessage(EType.Warning, config),
            error: (config) => context.addMessage(EType.Error, config),
            close: (id) => context.removeMessage(id),
            closeAll: () => context.clearAll(),
        }),
        [context]
    );
};
