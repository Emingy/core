import type { HTMLProps } from 'react';

type TPropsCommon = {
    label: string;
    description?: string;
    error?: string;
    className?: string;
};

export type TProps = TPropsCommon & Omit<HTMLProps<HTMLInputElement>, 'type'>;
