import type { HTMLProps } from 'react';

export type TProps = {
    className?: string;
    onLoad?: VoidFunction;
    onError?: VoidFunction;
    onClick?: VoidFunction;
} & HTMLProps<HTMLImageElement>;
