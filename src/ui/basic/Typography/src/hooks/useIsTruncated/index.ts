import { type ReactNode, type RefObject, useEffect, useState } from 'react';

import type { TProps } from '../../types';

export const useIsTruncated = ({
    ref,
    isTruncated,
    maxLines,
    children,
}: {
    ref: RefObject<HTMLElement | null>;
    isTruncated: TProps['isTruncated'];
    maxLines: TProps['maxLines'];
    children: ReactNode;
}) => {
    const [isTruncatedActive, setIsTruncatedActive] = useState(false);

    useEffect(() => {
        if (!isTruncated && !maxLines) {
            setIsTruncatedActive(false);
            return;
        }

        const el = ref.current;
        if (!el) return;

        const check = () => {
            const node = ref.current;
            if (!node) return;
            setIsTruncatedActive(
                maxLines
                    ? node.scrollHeight > node.offsetHeight
                    : node.scrollWidth > node.offsetWidth
            );
        };

        check();
        const ro = new ResizeObserver(check);
        ro.observe(el);
        return () => ro.disconnect();
    }, [isTruncated, maxLines, children]);

    return isTruncatedActive;
};
