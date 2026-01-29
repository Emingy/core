import React from 'react';

import { MessageContext } from '@emingy/core/providers/MessageProvider/src/context';
import type { TMessageContext } from '@emingy/core/providers/MessageProvider/src/types';
import { EType } from '@emingy/core/ui/Message/src/constants';
import { describe, expect, it, rstest } from '@rstest/core';
import { renderHook } from '@testing-library/react';

import { useMessage } from '..';

const createMockContext = (): TMessageContext => ({
    addMessage: rstest.fn(() => 'msg-id'),
    removeMessage: rstest.fn(),
    clearAll: rstest.fn(),
});

const createWrapper = (context: TMessageContext) => {
    return ({ children }: { children: React.ReactNode }) => (
        <MessageContext.Provider value={context}>{children}</MessageContext.Provider>
    );
};

describe('[UNIT] useMessage', () => {
    it('Throws error when used outside MessageProvider', () => {
        expect(() => renderHook(() => useMessage())).toThrow(
            'useMessage must be used within a MessageProvider'
        );
    });

    it('Returns all API methods', () => {
        const context = createMockContext();
        const { result } = renderHook(() => useMessage(), { wrapper: createWrapper(context) });

        expect(result.current.success).toBeDefined();
        expect(result.current.warning).toBeDefined();
        expect(result.current.error).toBeDefined();
        expect(result.current.close).toBeDefined();
        expect(result.current.closeAll).toBeDefined();
    });

    it('success calls addMessage with Success type', () => {
        const context = createMockContext();
        const { result } = renderHook(() => useMessage(), { wrapper: createWrapper(context) });

        const config = { content: 'Done!' };

        result.current.success(config);

        expect(context.addMessage).toHaveBeenCalledWith(EType.Success, config);
    });

    it('warning calls addMessage with Warning type', () => {
        const context = createMockContext();
        const { result } = renderHook(() => useMessage(), { wrapper: createWrapper(context) });

        const config = { content: 'Be careful' };

        result.current.warning(config);

        expect(context.addMessage).toHaveBeenCalledWith(EType.Warning, config);
    });

    it('error calls addMessage with Error type', () => {
        const context = createMockContext();
        const { result } = renderHook(() => useMessage(), { wrapper: createWrapper(context) });

        const config = { content: 'Something failed' };

        result.current.error(config);

        expect(context.addMessage).toHaveBeenCalledWith(EType.Error, config);
    });

    it('success returns message ID', () => {
        const context = createMockContext();
        const { result } = renderHook(() => useMessage(), { wrapper: createWrapper(context) });

        const id = result.current.success({ content: 'Test' });

        expect(id).toBe('msg-id');
    });

    it('warning returns message ID', () => {
        const context = createMockContext();
        const { result } = renderHook(() => useMessage(), { wrapper: createWrapper(context) });

        const id = result.current.warning({ content: 'Test' });

        expect(id).toBe('msg-id');
    });

    it('error returns message ID', () => {
        const context = createMockContext();
        const { result } = renderHook(() => useMessage(), { wrapper: createWrapper(context) });

        const id = result.current.error({ content: 'Test' });

        expect(id).toBe('msg-id');
    });

    it('close calls removeMessage with id', () => {
        const context = createMockContext();
        const { result } = renderHook(() => useMessage(), { wrapper: createWrapper(context) });

        result.current.close('msg-42');

        expect(context.removeMessage).toHaveBeenCalledWith('msg-42');
    });

    it('closeAll calls clearAll', () => {
        const context = createMockContext();
        const { result } = renderHook(() => useMessage(), { wrapper: createWrapper(context) });

        result.current.closeAll();

        expect(context.clearAll).toHaveBeenCalled();
    });

    it('Passes config with title and duration', () => {
        const context = createMockContext();
        const { result } = renderHook(() => useMessage(), { wrapper: createWrapper(context) });

        const config = { title: 'Alert', content: 'Details here', duration: 8000 };

        result.current.success(config);

        expect(context.addMessage).toHaveBeenCalledWith(EType.Success, config);
    });

    it('Returns stable reference when context does not change', () => {
        const context = createMockContext();
        const { result, rerender } = renderHook(() => useMessage(), {
            wrapper: createWrapper(context),
        });

        const first = result.current;

        rerender();

        expect(result.current).toBe(first);
    });
});
