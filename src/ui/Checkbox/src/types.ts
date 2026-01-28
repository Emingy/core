import type { HTMLProps } from 'react';

export type TCheckboxProps = {
    label: string;
    description?: string;
    error?: string;
    className?: string;
};

export type TProps = TCheckboxProps & Omit<HTMLProps<HTMLInputElement>, 'type'>;
