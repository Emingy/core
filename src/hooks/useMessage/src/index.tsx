import { useContext, useMemo } from 'react';

import { MessageContext } from '@emingy/core/providers/MessageProvider/src/context';
import { EMessageType } from '@emingy/core/ui/dataDisplay/Message';

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
            success: (config) => context.addMessage(EMessageType.Success, config),
            warning: (config) => context.addMessage(EMessageType.Warning, config),
            error: (config) => context.addMessage(EMessageType.Error, config),
            close: (id) => context.removeMessage(id),
            closeAll: () => context.clearAll(),
        }),
        [context]
    );
};
