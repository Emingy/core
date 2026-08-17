import type { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren, ReactNode } from 'react';
import type { NavigateOptions } from 'react-router-dom';

import type { TIcon } from '@emingy/core/ui/basic/Icon';

import type { ESize, EType, EVariant } from './constants';

type TButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type TPropsCommon = {
    size?: `${ESize}`;
    type?: `${EType}`;
    variant?: `${EVariant}`;
    disabled?: boolean;
    htmlType?: TButtonProps['type'];
    prefix?: ReactNode;
    postfix?: ReactNode;
    isLoading?: boolean;
    href?: string;
    navigateOptions?: NavigateOptions;
    isFullWidth?: boolean;
    className?: string;
    icon?: TIcon;
};

type TPropsDependent =
    | { splitted?: false; dropdownContent?: never }
    | { splitted: true; dropdownContent: ReactNode };

export type TProps = PropsWithChildren<TPropsCommon & TPropsDependent> &
    Omit<TButtonProps, 'type' | 'disabled' | 'children'>;
