import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    CSSProperties,
    MouseEventHandler,
    ReactNode,
    RefObject,
} from 'react';

import type { TBadgeProps } from '@emingy/core/ui/dataDisplay/Badge';
import type { TTagProps } from '@emingy/core/ui/dataDisplay/Tag';

type TPropsCommon = {
    prefix?: ReactNode;
    label: string;
    tags?: TTagProps[];
    badge?: TBadgeProps;
    subItems?: TProps[];
    active?: boolean;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    containerRef?: RefObject<HTMLElement | null>;
};

type TAnchorRestProps = Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'className' | 'style' | 'children' | 'target' | 'rel' | 'prefix'
>;

type TButtonRestProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onClick' | 'className' | 'style' | 'type' | 'disabled' | 'children' | 'prefix'
>;

type TPropsDependent =
    | ({ to: string; onClick?: never } & TAnchorRestProps)
    | ({ to?: never; onClick: MouseEventHandler<HTMLButtonElement> } & TButtonRestProps);

export type TProps = TPropsCommon & TPropsDependent;

export type TNavItemAsButtonProps = TPropsCommon & {
    onClick: MouseEventHandler<HTMLButtonElement>;
} & TButtonRestProps;

export type TNavItemAsLinkProps = TPropsCommon & { to: string } & TAnchorRestProps;
