import type { HTMLProps, MouseEventHandler } from 'react';

type TPropsCommon = {
    className?: string;
    onLoad?: VoidFunction;
    onError?: VoidFunction;
    disabled?: boolean;
} & Omit<HTMLProps<HTMLImageElement>, 'onClick' | 'href' | 'disabled'>;

type TPropsDependent =
    | { onClick: MouseEventHandler<HTMLButtonElement>; to?: never; href?: never }
    | { onClick?: never; to: string; href?: never }
    | { onClick?: never; to?: never; href: string }
    | { onClick?: never; to?: never; href?: never };

export type TProps = TPropsCommon & TPropsDependent;
