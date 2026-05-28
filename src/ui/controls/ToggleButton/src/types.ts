import type { HTMLProps, ReactNode } from 'react';

import type { EType } from './constants';

type TPropsCommon = {
    type?: `${EType}`;
    prefix?: ReactNode;
    postfix?: ReactNode;
    isLoading?: boolean;
    isFullWidth?: boolean;
    className?: string;
};

export type TProps = TPropsCommon & Omit<HTMLProps<HTMLInputElement>, 'type'>;
